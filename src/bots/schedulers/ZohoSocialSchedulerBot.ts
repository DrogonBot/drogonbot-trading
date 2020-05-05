import puppeteer, { Page } from 'puppeteer';

import { GenericEmailManager } from '../../emails/generic.email';
import { ConsoleColor, ConsoleHelper } from '../../utils/ConsoleHelper';
import { PuppeteerBot } from '../classes/PuppeteerBot';
import { ICredential } from '../types/bots.types';


export class ZohoSocialSchedulerBot extends PuppeteerBot {

  public static zohoLogin = async (page: Page, credentials: ICredential) => {

    console.log('🤖: Starting Zoho Login');

    await page.goto('https://accounts.zoho.com/signin?servicename=ZohoSocial', { waitUntil: 'networkidle2' })

    console.log('🤖: Typing username and password');
    await page.type('#login_id', credentials.login)
    await page.waitForSelector('#nextbtn')
    await page.click('#nextbtn')
    await page.type('#password', credentials.password)
    await page.waitForSelector('#nextbtn')
    await page.click('#nextbtn')
    await page.waitForNavigation();

    try {
      await (await page.waitForSelector('.skip_btn[href*=Home]', { timeout: 2000 })).click()
    } catch (error) {
      console.log("🤖 No remind me later button found, skipping")
    }

    try {
      await (await page.waitForSelector('#rmLaterBtn', { timeout: 2000 })).click()
    } catch (error) {
      console.log("🤖 No remind me later button found, skipping")
    }
  }

  public static schedulePost = async (stateCode: string, credentials: ICredential, postContent: string) => {

    try {
      if (ZohoSocialSchedulerBot.browser) {
        await ZohoSocialSchedulerBot.clear(ZohoSocialSchedulerBot.browser)
      }


      ZohoSocialSchedulerBot.browser = await puppeteer.launch({
        ignoreHTTPSErrors: true,
        headless: true,
        slowMo: 50,
        timeout: 0,
        executablePath: 'google-chrome-unstable',
        // userDataDir: "./src/bots/data/zoho_session_data",
        args: [
          '--start-maximized',
          "--no-sandbox",
          "--disable-setuid-sandbox",
          '--no-zygote',
          '--disable-dev-shm-usage',
          '--disable-setuid-sandbox'
        ]
      })
      const browser = ZohoSocialSchedulerBot.browser;

      ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `🤖: Starting ZohoSocialSchedulerBot for ${stateCode}`)


      ZohoSocialSchedulerBot.page = await browser.newPage();
      const page = ZohoSocialSchedulerBot.page;
      await page.setViewport({ width: 1366, height: 768 });
      page.setDefaultNavigationTimeout(0);


      await page.goto('https://accounts.zoho.com/signin?servicename=ZohoSocial', { waitUntil: 'networkidle2' })

      const needsLogin = await page.$('#login_id') // if this input is found (if Zoho does not redirect us automatically to the dashboard), it means we should login!
      if (needsLogin) {
        console.log('🤖: User needs login...');
        await ZohoSocialSchedulerBot.zohoLogin(page, credentials)
      }

      const skipManageSessions = await page.$('#continue_skip')

      if (skipManageSessions) {
        console.log('🤖: Skipping manage sessions page...');
        await skipManageSessions.click();
      }

      // Goto dashboard
      console.log('🤖: Accessing dashboard');
      await page.goto('https://social.zoho.com/social/', { waitUntil: 'networkidle2' })


      // Publishing
      console.log('🤖: Clicking on blue Publish CTA');
      await page.waitForSelector('.newPostBtn-primary')
      await page.click('.newPostBtn-primary')

      console.log('🤖: Typing post content');
      await page.waitForSelector('.postInput');
      await page.type('.postInput', postContent)


      await page.keyboard.down('Control')
      await page.keyboard.press('V')
      await page.keyboard.up('Control')

      await page.waitFor(10000)

      console.log('🤖: Scheduling post');
      await (await page.waitForSelector('[onclick*=customq]')).click();
      await page.click("[onclick*=publish_postnow]")


      console.log('🤖: Posted!');


      await page.waitFor(2000)

      // logout user
      await page.goto('https://social.zoho.com/Logout.do', { waitUntil: 'networkidle2' })


      await page.waitFor(2000)

      if (ZohoSocialSchedulerBot.browser) {
        await ZohoSocialSchedulerBot.clear(ZohoSocialSchedulerBot.browser)
      }
    }
    catch (error) {
      if (ZohoSocialSchedulerBot.browser) {
        await ZohoSocialSchedulerBot.clear(ZohoSocialSchedulerBot.browser)
      }
      console.log('Error while running your scheduler bot ZohoSocialScheduler');
      console.error(error);
      const genericEmailManager = new GenericEmailManager();
      genericEmailManager.sendEmail(process.env.ADMIN_EMAIL, 'Failure: ZohoSocialScheduler BOT', 'admin-notification', {
        notification: "Your ZohoSocialScheduler bot is failing. Please check on docker logs what's going on."
      })
    }




  }


}