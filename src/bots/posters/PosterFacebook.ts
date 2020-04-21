import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

import botsAccounts from '../../bots/data/botsAccounts.json';
import { IPost, Post } from '../../resources/Post/post.model';
import { GenericHelper } from '../../utils/GenericHelper';
import { PuppeteerBot } from '../classes/PuppeteerBot';
import { BotHelper } from '../helpers/BotHelper';
import { ScrapperFacebook } from '../scrappers/ScrapperFacebook';
import { IBot } from '../types/bots.types';


puppeteer.use(StealthPlugin())

export class PosterFacebook extends PuppeteerBot {

  public static getRandomData = async (isMarketingPost: boolean) => {
    const bots: IBot[] = botsAccounts;

    const randomBot = bots[Math.floor(bots.length * Math.random())]
    const randomAvailableGroup = randomBot.availableGroups[Math.floor(randomBot.availableGroups.length * Math.random())]

    const randomGroup = randomAvailableGroup.groups[Math.floor(Math.random() * randomAvailableGroup.groups.length)]

    let post;
    if (!isMarketingPost) {
      post = randomBot.randomPosts[Math.floor(Math.random() * randomBot.randomPosts.length)]
    } else {

      // get posts from the most popular job roles only

      try {

        const popularJobPosts = await Post.find({
          stateCode: randomAvailableGroup.stateCode,
          jobRoles: { "$in": ['Atendente', 'Vendedor', 'Recepcionista', 'Auxiliar Administrativo', 'Administrador'] }
        })

        // select one of these popularJobPosts randomly

        const randomJobPost: IPost = popularJobPosts[Math.floor(Math.random() * popularJobPosts.length)]

        post = `${randomJobPost.title}
        https://vagasempregourgente.com/posts/${randomJobPost.slug}
        `


      }
      catch (error) {
        console.error(error);
        console.log('Failed to fetch popular job posts');
      }

    }


    return {
      randomBot,
      randomGroup,
      post
    }

  }

  public static triggerMarketingPost = async () => {
    const { randomBot, randomGroup, post } = await PosterFacebook.getRandomData(true);

    console.log('Initializing MARKETING posting with...');
    console.log(randomBot.name);
    console.log(randomGroup);
    console.log(post);

    await BotHelper.initPoster(randomBot, randomGroup, post, PosterFacebook.postToGroup)
  }

  public static triggerRandomPostComments = async () => {

    const { randomBot, randomGroup, post } = await PosterFacebook.getRandomData(false);

    console.log('Initializing RANDOM posting with...');
    console.log(randomBot.name);
    console.log(randomGroup);
    console.log(post);

    await BotHelper.initPoster(randomBot, randomGroup, post, PosterFacebook.postToGroup)
  }

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

    console.log(`🤖: Done!`);

    await PosterFacebook.page.goto('about:blank')
    await PosterFacebook.page.close();

    await PosterFacebook.clear(PosterFacebook.browser)

    await GenericHelper.sleep(5000)


  }
}
