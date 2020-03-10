import puppeteer from 'puppeteer';

import { DataExtractorHelper } from '../helpers/DataExtractorHelper';
import { ScrapperHelper } from '../helpers/ScrapperHelper';





export class ScrapperFBVagasOportunidadesES {

  public static crawlPageFeed = async (link: string) => {

    console.log(`🤖 Starting PUPPETEER BOT 🔥`);

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox']
    })

    const page = await browser.newPage();

    await page.goto(link, { waitUntil: 'networkidle2' })


    const data = await page.evaluate(async () => {

      console.log(`🤖: Evaluating the DOM...`);

      const rawPosts = document.querySelectorAll('.userContentWrapper div[data-testid="post_message"]')

      const posts = Array.from(rawPosts);

      return posts.map((post) => {
        // @ts-ignore
        return post.innerText
      })
    })

    const output = Promise.all(data.map(async (postContent) => {
      const title = postContent ? postContent.split('\n')[0] : ""

      const { sector, jobRoleBestMatch } = await ScrapperHelper.findJobRolesAndSector(title, postContent)

      const complementaryData = DataExtractorHelper.extractJobData(postContent)

      console.log(complementaryData);

      return {
        ...complementaryData,
        title,
        content: postContent,
        externalUrl: link,
        country: "Brazil",
        stateCode: "ES",
        city: "Vitória",
        sector: sector.name,
        jobRoles: [jobRoleBestMatch],
      }

    }))


    await browser.close()

    return output
  }
}
