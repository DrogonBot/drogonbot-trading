import moment from 'moment-timezone';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

import { Log } from '../../resources/Log/log.model';
import { PostSource } from '../../resources/Post/post.types';
import { ConsoleColor, ConsoleHelper } from '../../utils/ConsoleHelper';
import { GenericHelper } from '../../utils/GenericHelper';
import { PuppeteerBot } from '../classes/PuppeteerBot';
import { BotHelper } from '../helpers/BotHelper';
import { DataExtractorHelper } from '../helpers/DataExtractorHelper';
import { PostScrapperHelper } from '../helpers/PostScrapperHelper';
import { ProxyType } from '../types/bots.types';


puppeteer.use(StealthPlugin())

export class ScrapperFacebook extends PuppeteerBot {

  public static crawlPageFeed = async (link: string, postDataOverride?) => {

    console.log(`🔥 Starting PUPPETEER BOT 🔥`);

    if (ScrapperFacebook.browser && ScrapperFacebook.browser.isConnected()) {
      await ScrapperFacebook.clear(ScrapperFacebook.browser)
    }

    // initialize FreeProxy if we're on this mode, without a chosenProxy
    if (ProxyType.FreeProxy && !BotHelper.chosenProxy) {
      await BotHelper.initializeFreeProxy()
    }

    let puppeteerOptions;

    switch (BotHelper.proxyType) {
      case ProxyType.ZenScrape:
      case ProxyType.None:
        puppeteerOptions = ScrapperFacebook.getOptions(null, BotHelper.userAgent)
        break;
      case ProxyType.FreeProxy:
        if (BotHelper.chosenProxy) {
          puppeteerOptions = ScrapperFacebook.getOptions({ ip: BotHelper.chosenProxy.ip, port: BotHelper.chosenProxy.port }, BotHelper.userAgent)
        } else {
          console.log('Error! Puppeteer is set to FreeProxy mode but no chosenProxy was found!');
          console.log('Initializing proxies!');
          await BotHelper.initializeFreeProxy()
        }

        break;
    }

    ScrapperFacebook.browser = await puppeteer.launch(puppeteerOptions)

    ScrapperFacebook.page = await ScrapperFacebook.browser.newPage();

    if (BotHelper.proxyType === ProxyType.ZenScrape) {

      // display how many zenscrape requests were made today
      const today = moment.tz(new Date(), process.env.TIMEZONE).format('YYYY-MM-DD[T00:00:00.000Z]');
      const zenScrapeUsedRequests = await Log.find({
        action: `ZENSCRAPE_REQUEST`,
        createdAt: { "$gte": today }
      })
      ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `🤖: (ZenScrape) - Using ZenScrape Proxy API (${zenScrapeUsedRequests.length}/${Number(process.env.ZEN_SCRAPE_FREE_TIER_THRESHOLD)})`)

      // execute request
      await ScrapperFacebook.page.goto(`https://app.zenscrape.com/api/v1/get?apikey=${process.env.ZEN_SCRAPE_API_KEY}&url=${link}`, { waitUntil: 'load', timeout: 60000 })

      // register in our logs, so we keep track of it
      const registerZenScrapeRequest = new Log({
        action: `ZENSCRAPE_REQUEST`,
      })
      await registerZenScrapeRequest.save()


    } else {

      if (BotHelper.chosenProxy) {
        ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `🤖: (FreeProxy) Using proxy IP ${BotHelper.chosenProxy.ip} - PORT ${BotHelper.chosenProxy.port}`)
      } else {
        ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `🤖: (None) - 🔥 WARNING - YOU'RE NOT BEHIND A PROXY! 🔥`)
      }
      await ScrapperFacebook.page.goto(link, { waitUntil: 'load', timeout: 60000 })

    }


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

    await ScrapperFacebook.page.goto('about:blank')

    await ScrapperFacebook.page.close();


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
        source: PostSource.Facebook,
        sourceUrl: link,
        sector,
        jobRoles: [jobRoleBestMatch],
      }

    }))

    await ScrapperFacebook.clear(ScrapperFacebook.browser)

    await GenericHelper.sleep(5000)

    return output

  }
}
