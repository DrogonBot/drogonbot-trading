import puppeteer from 'puppeteer';

import { EnvType } from '../../constants/types/env.types';
import { IPostSource } from '../../resources/Post/post.model';
import { GenericHelper } from '../../utils/GenericHelper';
import { DataExtractorHelper } from '../helpers/DataExtractorHelper';
import { ScrapperHelper } from '../helpers/ScrapperHelper';





export class ScrapperFacebook {

  public static crawlPageFeed = async (link: string) => {

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
          headless: true,
          args: ['--no-sandbox', `--proxy-server=http://${ScrapperHelper.chosenProxy.ip}:${ScrapperHelper.chosenProxy.port}`]
        }
        console.log(`🤖: Loading Development config`);
        break;
    }


    const browser = await puppeteer.launch(options)

    const page = await browser.newPage();


    await page.goto(link, { waitUntil: 'load', timeout: 60000 })


    const data = await page.evaluate(async () => {

      const moreLinks: HTMLElement[] = Array.from(document.querySelectorAll('.see_more_link'))

      // First, click on all "See More" links, to show up hidden content to scrap
      for (const elLink of moreLinks) {
        elLink.click()
        await new Promise(r => setTimeout(r, 2000));
      }
      console.log(`🤖: Evaluating the DOM...`);

      const rawPosts = document.querySelectorAll('.userContentWrapper div[data-testid="post_message"]')

      const posts = Array.from(rawPosts);

      return posts.map((post) => {
        // @ts-ignore

        const textWithoutEmoji = post.innerText.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').replace('Nova vaga publicada!')

        return textWithoutEmoji
      })
    })

    const output = await Promise.all(data.map(async (postContent) => {
      const title = postContent.split('\n')[0] || postContent.splice(0, 25)

      const { sector, jobRoleBestMatch } = await ScrapperHelper.findJobRolesAndSector(postContent, title)

      console.log(`Title: ${title}`);
      console.log(`SECTOR => ${sector}`);
      console.log(`JOB ROLE => ${jobRoleBestMatch}`);

      const complementaryData = await DataExtractorHelper.extractJobData(postContent)

      return {
        ...complementaryData,
        title,
        content: postContent,
        source: IPostSource.Facebook,
        sourceUrl: link,
        country: "Brazil",
        stateCode: "ES",
        city: "Vitória",
        sector,
        jobRoles: [jobRoleBestMatch],
      }

    }))


    await GenericHelper.sleep(1000)

    await browser.close()

    return output
  }
}
