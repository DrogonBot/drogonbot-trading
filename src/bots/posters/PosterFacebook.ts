import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

import { GenericHelper } from '../../utils/GenericHelper';
import { PuppeteerBot } from '../classes/PuppeteerBot';
import { BotHelper } from '../helpers/BotHelper';
import { ScrapperFacebook } from '../scrappers/ScrapperFacebook';


puppeteer.use(StealthPlugin())

export class PosterFacebook extends PuppeteerBot {




  public static crawlPageFeed = async (link: string, postDataOverride?) => {

    console.log(`🔥 Starting PUPPETEER BOT 🔥`);



    if (PosterFacebook.browser) {
      await PosterFacebook.clear(PosterFacebook.browser)
    }


    PosterFacebook.browser = await puppeteer.launch(ScrapperFacebook.getOptions({ ip: BotHelper.chosenProxy.ip, port: BotHelper.chosenProxy.port }, BotHelper.userAgent))


    PosterFacebook.page = await PosterFacebook.browser.newPage();

    await PosterFacebook.page.goto(link, { waitUntil: 'load', timeout: 60000 })

    await GenericHelper.sleep(5000)

    await PosterFacebook.page.goto('about:blank')
    await PosterFacebook.page.close();

    await PosterFacebook.clear(PosterFacebook.browser)

    await GenericHelper.sleep(5000)



  }
}
