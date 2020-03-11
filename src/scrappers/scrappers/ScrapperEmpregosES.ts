import puppeteer from 'puppeteer';

import { IPostSource } from '../../resources/Post/post.model';
import { GenericHelper } from '../../utils/GenericHelper';
import { DataExtractorHelper } from '../helpers/DataExtractorHelper';
import { ScrapperHelper } from '../helpers/ScrapperHelper';





export class ScrapperEmpregosES {

  public static crawlPageFeed = async (link: string) => {

    console.log(`🤖 Starting PUPPETEER BOT 🔥`);
    console.log(`🤖: Using Proxy IP: ${ScrapperHelper.chosenProxy.ip} on PORT: ${ScrapperHelper.chosenProxy.port}`);

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', `--proxy-server=http://${ScrapperHelper.chosenProxy.ip}:${ScrapperHelper.chosenProxy.port}`],
    })

    const page = await browser.newPage();

    await page.goto(link, { waitUntil: 'load', timeout: 0 }) // Disable timeout


    const data = await page.evaluate(async () => {

      console.log(`🤖: Evaluating the DOM...`);

      const rawPosts = document.querySelectorAll('.userContentWrapper div[data-testid="post_message"]')

      const posts = Array.from(rawPosts);

      return posts.map((post) => {
        // @ts-ignore
        return post.innerText
      })
    })

    const output = await Promise.all(data.map(async (postContent) => {
      const title = postContent ? postContent.split('\n')[0] : ""

      const { sector, jobRoleBestMatch } = await ScrapperHelper.findJobRolesAndSector(title, postContent)

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
