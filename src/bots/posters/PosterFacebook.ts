import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

import { GenericHelper } from '../../utils/GenericHelper';
import { PuppeteerBot } from '../classes/PuppeteerBot';
import { BotHelper } from '../helpers/BotHelper';
import { ScrapperFacebook } from '../scrappers/ScrapperFacebook';
import { IBot } from '../types/bots.types';


puppeteer.use(StealthPlugin())

export class PosterFacebook extends PuppeteerBot {

  public static postToGroup = async (bot: IBot, link: string, post: string) => {

    console.log(`🔥 Starting PUPPETEER BOT 🔥`);


    if (PosterFacebook.browser) {
      await PosterFacebook.clear(PosterFacebook.browser)
    }


    PosterFacebook.browser = await puppeteer.launch(ScrapperFacebook.getOptions({ ip: BotHelper.chosenProxy.ip, port: BotHelper.chosenProxy.port }, BotHelper.userAgent, { slowMo: 250 }))


    PosterFacebook.page = await PosterFacebook.browser.newPage();

    await PuppeteerBot.loginUser(bot, PosterFacebook.page);

    // go to create post page
    console.log(`🤖: Vising group page: ${link}`);
    await PosterFacebook.page.goto(link, { waitUntil: 'networkidle2' })

    // Go to group post page...
    console.log('🤖: Clicking on "Write something input"');
    await PosterFacebook.page.evaluate(() => {
      // @ts-ignore
      document.querySelector('[onclick*="bgUploadInlineComposerCallback"]').click()
    })

    await PosterFacebook.page.waitForNavigation();

    await PosterFacebook.page.click('.composerInput.mentions-input')

    console.log(`🤖: Writing post: "${post}"`);

    await PosterFacebook.page.type('.composerInput.mentions-input', post)

    await PosterFacebook.page.waitForSelector('button._54k8._52jg._56bs._26vk._56b_._56bw._56bv')

    await PosterFacebook.page.click('button._54k8._52jg._56bs._26vk._56b_._56bw._56bv');

    await PosterFacebook.page.goto('about:blank')
    await PosterFacebook.page.close();

    await PosterFacebook.clear(PosterFacebook.browser)

    await GenericHelper.sleep(5000)

    if (PosterFacebook.browser) {
      await PosterFacebook.clear(PosterFacebook.browser)
    }



  }
}
