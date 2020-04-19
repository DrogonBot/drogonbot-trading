import { Browser, Page } from 'puppeteer';


export class PuppeteerBot {
  public static browser: Browser | null = null
  public static page: Page | null = null
  public static options: Object;

  public static clear = async (browser: Browser | null) => {
    try {
      // This function clears memory by closing puppeteer open instances
      if (browser) {
        await browser.close()
        console.log(`🤖: Puppeteer: Closing opened browser`);
      }

    }
    catch (error) {
      console.log('Failed to close scrapper browser!');
      console.error(error);
    }
  }

}