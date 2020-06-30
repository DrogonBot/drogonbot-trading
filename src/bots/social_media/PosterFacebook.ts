import { Page } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

import { GenericEmailManager } from '../../emails/generic.email';
import { PuppeteerBot } from '../classes/PuppeteerBot';
import { IBot } from '../types/bots.types';
import {
  FB_LOGIN_EMAIL_INPUT,
  FB_LOGIN_LOGIN_CTA,
  FB_LOGIN_PASSWORD_INPUT,
  FB_LOGIN_SKIP_SAVE_PASSWORD,
} from './selectors/facebook.selectors';



puppeteer.use(StealthPlugin())

export class PosterFacebook extends PuppeteerBot {

  public static loginUserFacebook = async (bot: IBot, page: Page) => {

    try {
      await page.goto('https://m.facebook.com/login/', { waitUntil: 'networkidle2' })

      console.log(`🤖: Logging in bot ${bot.email}...`);

      // Fill login and password

      await page.type(FB_LOGIN_EMAIL_INPUT, bot.email); // Types slower, like a user
      await page.type(FB_LOGIN_PASSWORD_INPUT, bot.password); // Types slower, like a user

      await page.click(FB_LOGIN_LOGIN_CTA);
      await page.waitForNavigation(); // it will change page, so wait

      await page.waitForSelector(FB_LOGIN_SKIP_SAVE_PASSWORD);
      await page.click(FB_LOGIN_SKIP_SAVE_PASSWORD) // do not save password button

      console.log('🤖: Finished login!');
    }
    catch (error) {
      console.log('🤖: Failed to login bot!');
      console.error(error);
    }

  }

  public static triggerMarketingPost = async () => {
    const { randomBot, randomGroup, post: postContent } = await PosterFacebook.getRandomData(true);



    // await BotHelper.initPoster(randomBot, randomGroup, post, PosterFacebook.postToGroup)

    await PosterFacebook.postToGroup(randomBot, randomGroup, postContent)

    if (PosterFacebook.browser) {
      await PosterFacebook.clear(PosterFacebook.browser)
    }
  }

  // public static triggerRandomPostComments = async () => {

  //   const { randomBot, randomGroup, post } = await PosterFacebook.getRandomData(false);

  //   console.log('Initializing RANDOM posting with...');
  //   console.log(randomBot.name);
  //   console.log(randomGroup);
  //   console.log(post);

  //   await BotHelper.initPoster(randomBot, randomGroup, post, PosterFacebook.postToGroup)
  // }

  public static postToGroup = async (bot: IBot, groupUrl: string, postContent: string) => {

    console.log(`🔥 Starting PUPPETEER BOT 🔥`);

    try {
      if (PosterFacebook.browser) {
        await PosterFacebook.clear(PosterFacebook.browser)
      }

      PosterFacebook.browser = await puppeteer.launch({
        ignoreHTTPSErrors: true,
        headless: true,
        slowMo: 50,
        timeout: 0,
        executablePath: 'google-chrome-unstable',
        // userDataDir: resolve('./src/bots/data/fb_poster_session_data'),
        args: [
          '--start-maximized',
          "--no-sandbox",
          "--disable-setuid-sandbox"
        ]
      })
      const browser = PosterFacebook.browser;

      PosterFacebook.page = await browser.newPage();
      const page = PosterFacebook.page;

      await page.goto('https://m.facebook.com/login', { waitUntil: 'networkidle2' })
      await page.setDefaultNavigationTimeout(0);

      const needsLogin = await page.$('#m_login_email') // if this input is found (if Zoho does not redirect us automatically to the dashboard), it means we should login!
      if (needsLogin) {
        console.log('🤖: User needs login...');
        try {
          await PosterFacebook.loginUserFacebook(bot, page);
        }
        catch (error) {
          console.log('🤖: Login failure!');
          console.error(error);
          return
        }
      }

      // This happens when facebook finds a mismatch between IPs that are logging into your account (security measure)
      const checkpointPresent = await page.$('#checkpointSubmitButton')

      if (checkpointPresent) {
        console.log('🤖: Location checkpoint present, clicking to skip...');
        await page.click('#checkpointSubmitButton')
      }

      await page.waitForNavigation()

      // go to create post page
      console.log(`🤖: Vising group page: ${groupUrl}`);
      await page.goto(groupUrl, { waitUntil: 'networkidle2' })

      // Go to group post page...
      console.log('🤖: Clicking on "Write something input"');

      // Go to group post page...
      await page.evaluate(() => {
        // @ts-ignore
        document.querySelector('[onclick*=bgUploadInlineComposerCallback]').click()
      })

      await page.waitForNavigation();

      await page.click('.composerInput.mentions-input')

      console.log('🤖: Typing post...');

      await page.type('.composerInput.mentions-input', postContent)

      await page.waitForSelector('button._54k8._52jg._56bs._26vk._56b_._56bw._56bv')

      console.log('🤖: Posting...');

      await page.click('button._54k8._52jg._56bs._26vk._56b_._56bw._56bv');


      console.log('🤖: Done posting! Closing browser...')

      if (PosterFacebook.browser) {
        await PosterFacebook.clear(PosterFacebook.browser)
      }

    }
    catch (error) {
      if (PosterFacebook.browser) {
        await PosterFacebook.clear(PosterFacebook.browser)
      }
      console.log('Error while running your poster bot!');
      console.error(error);
      const genericEmailManager = new GenericEmailManager();
      genericEmailManager.sendEmail(process.env.ADMIN_EMAIL, 'Failure: PosterFacebook BOT', 'admin-notification', {
        notification: "Your PosterFacebook bot is failing. Please check on docker logs what's going on."
      })

    }

  }
}
