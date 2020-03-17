import puppeteer from 'puppeteer';

import { EnvType } from '../../constants/types/env.types';
import { IPostSource } from '../../resources/Post/post.model';
import { GenericHelper } from '../../utils/GenericHelper';
import { DataExtractorHelper } from '../helpers/DataExtractorHelper';
import { PostScrapperHelper } from '../helpers/PostScrapperHelper';
import { ScrapperHelper } from '../helpers/ScrapperHelper';





export class ScrapperFacebook {

  public static browser: puppeteer.Browser | null = null
  public static page: puppeteer.Page | null = null

  public static clear = async () => {
    // This function clears memory by closing puppeteer open instances

    if (ScrapperFacebook.browser !== null) {
      console.log(`🤖: Puppeteer: Closing opened browser`);
      await ScrapperFacebook.browser.close()
      ScrapperFacebook.browser = null
    }
  }


  public static crawlPageFeed = async (link: string, postDataOverride?) => {

    console.log(`🔥 Starting PUPPETEER BOT 🔥`);


    let options;
    switch (process.env.ENV) {
      case EnvType.Development:
        console.log(`🤖: Loading Development config - NOT USING PROXY!`);
        options = {
          headless: true,
          args: ['--no-sandbox']
        }
        break;
      case EnvType.Production:
        console.log(`🤖: Using Proxy IP: ${ScrapperHelper.chosenProxy.ip} on PORT: ${ScrapperHelper.chosenProxy.port}`);
        options = {
          ignoreHTTPSErrors: true,
          userDataDir: './tmp',
          headless: true,
          args: ['--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-infobars',
            '--window-position=0,0',
            '--ignore-certifcate-errors',
            '--ignore-certifcate-errors-spki-list',
            `--proxy-server=http://${ScrapperHelper.chosenProxy.ip}:${ScrapperHelper.chosenProxy.port}`,
            `'--user-agent="${ScrapperHelper.userAgent}"'`]
        }
        break;
    }


    ScrapperFacebook.browser = await puppeteer.launch(options)

    ScrapperFacebook.page = await ScrapperFacebook.browser.newPage();

    await ScrapperFacebook.page.goto(link, { waitUntil: 'load', timeout: 60000 })


    // Evaluate page data ========================================

    const data = await ScrapperFacebook.page.evaluate(async () => {

      const moreLinks: HTMLElement[] = Array.from(document.querySelectorAll('.see_more_link'))

      // First, click on all "See More" links, to show up hidden content to scrap
      for (const elLink of moreLinks) {
        elLink.click()
        await new Promise(r => setTimeout(r, 2000)); // 2 sec for each click
      }

      const rawPosts = document.querySelectorAll('.userContentWrapper div.userContent[data-testid="post_message"]')

      const posts = Array.from(rawPosts);

      return posts.map((post) => {
        // @ts-ignore

        return post.innerText.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').replace('Nova vaga publicada!', '')

      })
    })

    ScrapperFacebook.page.close();


    // Prepare output in the proper format ========================================

    const output = await Promise.all(data.map(async (postContent: string) => {
      let title = (postContent && postContent.split('\n')[0] || postContent.split('\n\n')[0] || postContent.slice(0, 25)).replace('\n', '')

      const { sector, jobRoleBestMatch } = await PostScrapperHelper.findJobRolesAndSector(postContent.replace(new RegExp('\n', 'g'), " "), title)

      if (!title || !title.length) {
        title = jobRoleBestMatch
      }

      // console.log(`Title: ${title}`);
      // console.log(`SECTOR => ${sector}`);
      // console.log(`JOB ROLE => ${jobRoleBestMatch}`);

      const complementaryData = await DataExtractorHelper.extractJobData(postContent)

      return {
        ...complementaryData,
        ...postDataOverride,
        title,
        content: postContent,
        source: IPostSource.Facebook,
        sourceUrl: link,
        sector,
        jobRoles: [jobRoleBestMatch],
      }

    }))

    await ScrapperFacebook.clear()

    await GenericHelper.sleep(1000)

    return output

  }
}
