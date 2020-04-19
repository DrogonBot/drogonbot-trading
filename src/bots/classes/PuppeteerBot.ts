import { Browser, Page } from 'puppeteer';
import { UserAgent } from 'user-agents';

import { EnvType } from '../../constants/types/env.types';
import { IProxyItem } from '../types/bots.types';



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

  public static getOptions = (proxyItem: IProxyItem, userAgent: UserAgent) => {
    switch (process.env.ENV) {
      case EnvType.Development:

        console.log(`🤖: Loading Development config - NOT USING PROXY!`);
        return {
          executablePath: 'google-chrome-unstable',
          headless: true,
          args: ['--no-sandbox',
            '--disable-setuid-sandbox',
            '--no-zygote',
            '--disable-dev-shm-usage'
          ]
        }


      case EnvType.Production:
        console.log(`🤖: Using Proxy IP: ${proxyItem.ip} on PORT: ${proxyItem.port}`);
        return {
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
            `--proxy-server=http://${proxyItem.ip}:${proxyItem.port}`,
            `'--user-agent="${userAgent}"'`]
        }

    }
  }

}