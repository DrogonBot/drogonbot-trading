import { Page } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

import { GenericEmailManager } from '../../../emails/generic.email';
import { ConsoleColor, ConsoleHelper } from '../../../utils/ConsoleHelper';
import { PuppeteerBot } from '../classes/PuppeteerBot';
import { ICredential } from '../types/bots.types';

puppeteer.use(StealthPlugin())
export class RecurPostSocialSchedulerBot extends PuppeteerBot {

  public static loginRecurPost = async (credentials: ICredential, page: Page) => {

    console.log('🤖: Login user...');

    await page.goto('https://recurpost.com/signin', { waitUntil: 'networkidle2' })

    // Login
    await page.type('#loginemail_address', credentials.login)
    await page.type('#loginpassword', credentials.password)
    await page.click('#btnlogin')
    await page.waitForNavigation();
    console.log('🤖 Logged in on RecurPost');
  }

  public static schedulePost = async (stateCode: string, credentials: ICredential, postContent: string) => {

    try {
      if (RecurPostSocialSchedulerBot.browser) {
        await RecurPostSocialSchedulerBot.clear(RecurPostSocialSchedulerBot.browser)
      }

      ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `🤖: Starting RecurPostSocialScheduler for ${stateCode}`)

      RecurPostSocialSchedulerBot.browser = await puppeteer.launch({
        ignoreHTTPSErrors: true,
        headless: true,
        slowMo: 50,
        timeout: 0,
        // userDataDir: "./src/classes/bots/data/recurpost_session_data",
        executablePath: 'google-chrome-unstable',
        args: [
          '--start-maximized',
          "--no-sandbox",
          "--disable-setuid-sandbox",
          '--no-zygote',
          '--disable-dev-shm-usage',
          '--disable-setuid-sandbox'
        ]
      })
      const browser = RecurPostSocialSchedulerBot.browser

      RecurPostSocialSchedulerBot.page = await browser.newPage();
      const page = RecurPostSocialSchedulerBot.page;

      await page.setViewport({ width: 1366, height: 768 });
      page.setDefaultNavigationTimeout(0);



      // go to create post page
      await page.goto('https://recurpost.com/signin', { waitUntil: 'networkidle2' })


      const needsLogin = await page.$('#loginemail_address') // if this input is found (if it does not redirect us automatically to the dashboard), it means we should login!
      if (needsLogin) {
        console.log('🤖: User needs login...');
        await RecurPostSocialSchedulerBot.loginRecurPost(credentials, page)
      }


      // Publishing

      console.log('🤖: Clicking on share something input');
      await page.waitForSelector('.add_content_btn .btn')
      await page.click('.add_content_btn .btn')

      await page.waitForSelector('.socialmediacheckboximage')
      await page.click('.socialmediacheckboximage')

      // if its a random post content, lets fetch it

      console.log('🤖: Typing post content...');

      await page.type('.emojionearea-editor', postContent)


      await page.waitFor(10000) // wait for a while, to fb scrap image

      console.log('🤖: Scheduling post');
      await page.waitForSelector('.custom-control-label[data-target*=schedule-post]')
      await page.click('.custom-control-label[data-target*=schedule-post]')

      await page.waitFor(1000)

      await page.click('.custom-control-label[for=autobesttime]')

      await page.waitFor(1000)

      console.log('🤖: Shortening url');
      await page.waitForSelector('label[data-target=".shorten-url"]')
      await page.click('label[data-target=".shorten-url"]')
      await page.waitForSelector('label[for=google_shorten_radio]')
      await page.click('label[for=google_shorten_radio]')
      await page.waitForSelector('#google_short_url_btn')
      await page.click('#google_short_url_btn')
      await page.waitFor(1000)


      console.log('🤖: Scheduling...');
      await page.click('#pc_schedulebtn')

      console.log('🤖: Done!');

      if (RecurPostSocialSchedulerBot.browser) {
        await RecurPostSocialSchedulerBot.clear(RecurPostSocialSchedulerBot.browser)
      }
    }
    catch (error) {
      if (RecurPostSocialSchedulerBot.browser) {
        await RecurPostSocialSchedulerBot.clear(RecurPostSocialSchedulerBot.browser)
      }
      console.log('Error while running your scheduler bot RecurPostSocialScheduler');
      console.error(error);
      const genericEmailManager = new GenericEmailManager();
      genericEmailManager.sendEmail(process.env.ADMIN_EMAIL, 'Failure: RecurPostSocialScheduler BOT', 'admin-notification', {
        notification: "Your RecurPostSocialScheduler bot is failing. Please check on docker logs what's going on."
      })
    }

  }



}