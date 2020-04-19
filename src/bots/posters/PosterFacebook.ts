import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

import { EnvType } from '../../constants/types/env.types';
import { GenericHelper } from '../../utils/GenericHelper';
import { PuppeteerBot } from '../classes/PuppeteerBot';
import { devOptions, prodOptions } from '../constants/puppeteer';
import { BotHelper } from '../helpers/BotHelper';


puppeteer.use(StealthPlugin())

export class PosterFacebook extends PuppeteerBot {



  public static clear = async () => {
    try {
      // This function clears memory by closing puppeteer open instances
      if (PosterFacebook.browser !== null) {

        await PosterFacebook.browser.close()

        console.log(`🤖: Puppeteer: Closing opened browser`);

        PosterFacebook.browser = null
      }

    }
    catch (error) {
      console.log('Failed to close scrapper browser!');
      console.error(error);
    }
  }

  public static setOptions = () => {
    switch (process.env.ENV) {
      case EnvType.Development:

        console.log(`🤖: Loading Development config - NOT USING PROXY!`);
        PosterFacebook.options = devOptions

        break;
      case EnvType.Production:
        console.log(`🤖: Using Proxy IP: ${BotHelper.chosenProxy.ip} on PORT: ${BotHelper.chosenProxy.port}`);
        PosterFacebook.options = prodOptions
        break;
    }
  }


  public static crawlPageFeed = async (link: string, postDataOverride?) => {

    console.log(`🔥 Starting PUPPETEER BOT 🔥`);

    PosterFacebook.setOptions();

    if (PosterFacebook.browser) {
      await PosterFacebook.clear()
    }


    PosterFacebook.browser = await puppeteer.launch(PosterFacebook.options)

    PosterFacebook.page = await PosterFacebook.browser.newPage();

    await PosterFacebook.page.goto(link, { waitUntil: 'load', timeout: 60000 })

    await GenericHelper.sleep(5000)

    await PosterFacebook.page.goto('about:blank')
    await PosterFacebook.page.close();

    await PosterFacebook.clear()

    await GenericHelper.sleep(5000)



  }
}
