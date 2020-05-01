import { resolve } from 'path';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

import { GenericHelper } from '../../utils/GenericHelper';
import { PuppeteerBot } from '../classes/PuppeteerBot';
import { BotHelper } from '../helpers/BotHelper';
import { IBot } from '../types/bots.types';



puppeteer.use(StealthPlugin())

export class PosterFacebook extends PuppeteerBot {



  public static triggerMarketingPost = async () => {
    const { randomBot, randomGroup, post: postContent } = await PosterFacebook.getRandomData(true);

    console.log('Initializing MARKETING posting with...');
    console.log(randomBot.name);
    console.log(randomGroup);
    console.log(postContent);

    // await BotHelper.initPoster(randomBot, randomGroup, post, PosterFacebook.postToGroup)

    await PosterFacebook.postToGroup(randomBot, randomGroup, postContent)
  }

  public static triggerRandomPostComments = async () => {

    const { randomBot, randomGroup, post } = await PosterFacebook.getRandomData(false);

    console.log('Initializing RANDOM posting with...');
    console.log(randomBot.name);
    console.log(randomGroup);
    console.log(post);

    await BotHelper.initPoster(randomBot, randomGroup, post, PosterFacebook.postToGroup)
  }

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
        userDataDir: resolve('./src/bots/data/fb_poster_session_data'),
        args: [
          '--start-maximized',
          "--no-sandbox",
          "--disable-setuid-sandbox"
        ]
      })


      PosterFacebook.page = await PosterFacebook.browser.newPage();
      const page = PosterFacebook.page;

      await page.goto('https://m.facebook.com/login', { waitUntil: 'networkidle2' })

      const needsLogin = await page.$('#m_login_email') // if this input is found (if Zoho does not redirect us automatically to the dashboard), it means we should login!
      if (needsLogin) {
        console.log('User needs login...');
        try {
          await PosterFacebook.loginUserFacebook(bot, page);
        }
        catch (error) {
          console.log('Login failure!');
          console.error(error);
          return
        }
      }

      const checkpointPresent = await page.$('#checkpointSubmitButton')

      if (checkpointPresent) {
        console.log('Location checkpoint present, clicking to skip...');
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

      console.log('Typing post');

      await page.type('.composerInput.mentions-input', postContent)

      await page.waitForSelector('button._54k8._52jg._56bs._26vk._56b_._56bw._56bv')

      console.log('Posting...');

      await page.click('button._54k8._52jg._56bs._26vk._56b_._56bw._56bv');


      console.log('🤖: Done posting!')


      await page.goto('about:blank')
      await page.close();

      if (PosterFacebook.browser) {
        await PosterFacebook.clear(PosterFacebook.browser)
      }

      await GenericHelper.sleep(5000)

    }
    catch (error) {
      console.log('Error while running your poster bot!');
      console.error(error);

    }


  }
}
