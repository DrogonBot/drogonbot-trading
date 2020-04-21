import { Browser, Page } from 'puppeteer';
import { UserAgent } from 'user-agents';

import { EnvType } from '../../constants/types/env.types';
import { IBot, IProxyItem } from '../types/bots.types';



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

  public static getOptions = (proxyItem: IProxyItem, userAgent: UserAgent, extraOptions?) => {
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
          ],
          ...extraOptions
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
            `'--user-agent="${userAgent}"'`],
          ...extraOptions
        }

    }
  }

  public static getRandomDelay = () => Math.floor(Math.random() * 10)

  public static loginUser = async (bot: IBot, page: Page) => {

    try {
      await page.goto('https://m.facebook.com/login/', { waitUntil: 'networkidle2' })

      // capture page console for debugging
      page.on('console', msg => console.log('PAGE LOG:', msg.text()));



      console.log(`Logging in bot ${bot.email}...`);

      // Fill login and password

      await page.type('#m_login_email', bot.email); // Types slower, like a user
      await page.type('#m_login_password', bot.password); // Types slower, like a user


      await page.click('button[name="login"]');

      await page.waitForNavigation(); // it will change page, so wait

      await page.waitForSelector('._55sr');

      await page.click('._55sr') // do not save password button

      console.log('Finished login!');

    }
    catch (error) {
      console.log('Failed to login bot!');
      console.error(error);
    }

  }


}