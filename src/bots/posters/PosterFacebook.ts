import { Browser, Page } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

import { EnvType } from '../../constants/types/env.types';
import { GenericHelper } from '../../utils/GenericHelper';
import { BotHelper } from '../helpers/BotHelper';


puppeteer.use(StealthPlugin())

export class ScrapperFacebook {

  public static browser: Browser | null = null
  public static page: Page | null = null

  public static clear = async () => {
    try {
      // This function clears memory by closing puppeteer open instances
      if (ScrapperFacebook.browser !== null) {

        await ScrapperFacebook.browser.close()

        console.log(`🤖: Puppeteer: Closing opened browser`);

        ScrapperFacebook.browser = null
      }

    }
    catch (error) {
      console.log('Failed to close scrapper browser!');
      console.error(error);
    }
  }


  public static crawlPageFeed = async (link: string, postDataOverride?) => {

    console.log(`🔥 Starting PUPPETEER BOT 🔥`);

    let options;
    switch (process.env.ENV) {
      case EnvType.Development:

        console.log(`🤖: Loading Development config - NOT USING PROXY!`);
        options = {
          executablePath: 'google-chrome-unstable',
          headless: true,
          args: ['--no-sandbox',
            '--disable-setuid-sandbox',
            '--no-zygote',
            '--disable-dev-shm-usage'
          ]
        }
        break;
      case EnvType.Production:
        console.log(`🤖: Using Proxy IP: ${BotHelper.chosenProxy.ip} on PORT: ${BotHelper.chosenProxy.port}`);
        options = {
          executablePath: 'google-chrome-unstable',
          ignoreHTTPSErrors: true,
          headless: true,
          args: ['--no-sandbox',
            '--disable-setuid-sandbox',
            '--no-zygote',
            '--disable-infobars',
            '--window-position=0,0',
            '--disable-dev-shm-usage',
            '--ignore-certificate-errors',
            '--ignore-certificate-errors-spki-list',
            `--proxy-server=http://${BotHelper.chosenProxy.ip}:${BotHelper.chosenProxy.port}`,
            `'--user-agent="${BotHelper.userAgent}"'`]
        }
        break;
    }

    if (ScrapperFacebook.browser) {
      await ScrapperFacebook.clear()
    }


    ScrapperFacebook.browser = await puppeteer.launch(options)

    ScrapperFacebook.page = await ScrapperFacebook.browser.newPage();

    await ScrapperFacebook.page.goto(link, { waitUntil: 'load', timeout: 60000 })

    await GenericHelper.sleep(5000)

    await ScrapperFacebook.page.goto('about:blank')
    await ScrapperFacebook.page.close();

    await ScrapperFacebook.clear()

    await GenericHelper.sleep(5000)



  }
}
