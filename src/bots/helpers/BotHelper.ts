import moment from 'moment-timezone';
import UserAgent from 'user-agents';

import { EnvType } from '../../constants/types/env.types';
import { Lead } from '../../resources/Lead/lead.model';
import { Log } from '../../resources/Log/log.model';
import { Post } from '../../resources/Post/post.model';
import { IPost, PostSource } from '../../resources/Post/post.types';
import { User } from '../../resources/User/user.model';
import { ConsoleColor, ConsoleHelper } from '../../utils/ConsoleHelper';
import { GenericHelper } from '../../utils/GenericHelper';
import { PostHelper } from '../../utils/PostHelper';
import { ScrapperFacebook } from '../scrappers/ScrapperFacebook';
import { ScrapperOLX } from '../scrappers/ScrapperOLX';
import { ICrawlerFunctions, IProxyItem, PagePattern, ProxyType } from '../types/bots.types';
import { ConnectionHelper } from './ConnectionHelper';
import { PostScrapperHelper } from './PostScrapperHelper';

export class BotHelper {

  public static proxyType: ProxyType
  public static proxyList: IProxyItem[];
  public static chosenProxy: IProxyItem | null;
  public static userAgent: string;
  public static owner;
  public static failedRequestIntervalMs: number = 10000;
  public static postLinkScrappingIntervalMs: number = 10000;
  public static scrapperHelperFinishIntervalMs: number = 1000 * 60 * Math.floor(Math.random() * 5)
  public static ZenScrapeDailyLimit = 33;



  public static init = async (name: string, source: PostSource) => {
    console.log(`🤖: Initializing ${name}`);

    switch (process.env.ENV) {
      case EnvType.Production:

        // lets check if our free tier on ZenScrape is already gone. If so, use free proxy for requests

        const today = moment.tz(new Date(), process.env.TIMEZONE).format('YYYY-MM-DD[T00:00:00.000Z]');

        // ! Here we use ZenScrape only for PagePattern.feed (eg. Facebook), since PagePattern.ListAndInternalPosts would consome too much credits for now
        if (source === PostSource.Facebook) {
          const zenScrapeUsedRequests = await Log.find({
            action: `ZENSCRAPE_REQUEST`,
            createdAt: { "$gte": today }
          })

          zenScrapeUsedRequests.length <= BotHelper.ZenScrapeDailyLimit ? BotHelper.proxyType = ProxyType.ZenScrape : BotHelper.proxyType = ProxyType.FreeProxy;


        } else {
          BotHelper.proxyType = ProxyType.FreeProxy;
        }


        // BotHelper.proxyType = ProxyType.FreeProxy;


        if (BotHelper.proxyType === ProxyType.FreeProxy) {
          // Let's fetch our proxies list only if we didn't do it before...
          if (!BotHelper.proxyList) {
            const proxyList = await ConnectionHelper.fetchFreeProxyList();
            BotHelper.proxyList = proxyList;
          }
          BotHelper.chosenProxy = ConnectionHelper.rotateProxy(BotHelper.proxyList);

        } else {
          BotHelper.proxyList = []
          BotHelper.chosenProxy = null
        }

        break;
      case EnvType.Development:

        // We don't use proxies on development, since it slow us down...
        BotHelper.proxyType = ProxyType.None;
        BotHelper.proxyList = []
        BotHelper.chosenProxy = null
        break;
    }

    BotHelper.userAgent = new UserAgent().random().data.userAgent;
    BotHelper.owner = await User.findOne({ email: process.env.ADMIN_EMAIL })
  }

  public static finish = async () => {

    ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `🤖: Finished!`)

    // Make sure we close any puppeteer open instances, if that's the case
    await ScrapperFacebook.clear(ScrapperFacebook.browser)

    if (process.env.ENV === EnvType.Production) {
      await GenericHelper.sleep(BotHelper.scrapperHelperFinishIntervalMs)
    }

  }

  public static initScrapper = async (name, source: PostSource, crawlerFunctions: ICrawlerFunctions, type: PagePattern, externalSource?: string, postDataOverride?: Object) => {

    const { crawlLinksFunction, crawlPageDataFunction, crawlFeedFunction } = crawlerFunctions

    await BotHelper.init(name, source)


    switch (type) {

      case PagePattern.ListAndInternalPosts: // used by ScrapperOLX

        if (ScrapperOLX.postLinks === null) { // If no links were scrapped yet
          ScrapperOLX.postLinks = await ConnectionHelper.tryRequestUntilSucceeds(crawlLinksFunction, [externalSource])
          console.log(`🤖: Scrapping external source ${externalSource}`);
        }
        // if we already have scrapped post links, filter the ones who were not scrapped

        if (ScrapperOLX.postLinks) {

          const links = ScrapperOLX.postLinks.filter((link) => !link.scrapped) // make sure we only scrap unscrapped items

          for (const linkItem of links) {
            await GenericHelper.sleep(BotHelper.postLinkScrappingIntervalMs)
            await BotHelper._scrapPage(linkItem.link, crawlPageDataFunction, postDataOverride)
          }
        }

        break;

      case PagePattern.Feed: // used by ScrapperFacebook

        if (externalSource) {
          await BotHelper._scrapFeed(externalSource, crawlFeedFunction, postDataOverride)
        } else {
          console.log(`🤖: Warning! You should define an external source page for scrapping on OnePageAllPosts PagePattern!`);
        }
        break;
    }

    BotHelper.finish();

  };

  private static _notifyUsers = async (post: IPost) => {

    console.log(`Trying to notify users about post slug ${post.slug}`);
    // notify users that may be interested on this role, about this position

    await PostScrapperHelper.notifyUsersPushNotification(post)

    // notify users and or leads that have this jobRole as position of interest

    try {
      const leads = await Lead.find({
        stateCode: post.stateCode,
        jobRoles: { "$in": [post.jobRoles[0]] }
      })
      const users = await User.find({
        stateCode: post.stateCode,
        genericPositionsOfInterest: { "$in": [post.jobRoles[0]] }
      })

      const targetedUsers = [
        ...leads,
        ...users
      ]

      // TODO: This is temporarely hardcoded. We'll automatize it later with an unsubscribe button
      const optOutList = ['francielyoliveira6633@gmail.com']


      for (const targetedUser of targetedUsers) {


        if (optOutList.includes(targetedUser.email)) {
          console.log(`Skipping user ${targetedUser.email} since opted out from our alert system!`);
          continue
        }


        console.log(post.slug);
        if (post.slug) {
          console.log(`🤖: Email notification: Notifying user ${targetedUser.email} about new post (${post.title}) - slug: ${post.slug}`);
          await PostScrapperHelper.notifyUsersEmail(targetedUser, post)
        }
      }
    }
    catch (error) {
      console.log('🤖:  Failed to run new post email notification');
      console.error(error);
    }
  }

  private static _scrapFeed = async (link: string, crawlFeedFunction, postDataOverride?: Object) => {
    console.log(`🤖: Scrapping data FEED from...${link}`);

    const args = postDataOverride ? [link, postDataOverride] : [link]

    const postsData: IPost[] = await ConnectionHelper.tryRequestUntilSucceeds(crawlFeedFunction, args)

    if (!postsData) {
      console.log(`🤖: Failed to scrap posts data at ${link}`)
      return
    }

    if (BotHelper.owner) {

      // loop through feed posts and start saving them into db

      for (const post of postsData) {

        // check if post already exists

        if (await PostScrapperHelper.isPostInvalid(post)) {
          continue
        }



        const newPost = new Post({ ...post, slug: PostHelper.generateTitleSlug(post.title), owner: BotHelper.owner._id })
        await newPost.save()
        console.log(`🤖: Saving post: ${post.title}`);



        await BotHelper._notifyUsers(newPost);

        await GenericHelper.sleep(1000)
        ConsoleHelper.coloredLog(ConsoleColor.BgGreen, ConsoleColor.FgWhite, `🤖: Post saved on database! => ${newPost.title}`)
      }
    } else {
      console.log(`🤖: User with e-mail ${process.env.ADMIN_EMAIL} not found! It's necessary for saving our posts!`)
      console.log(`🤖: Failed to scrap data from ${link}!`)
    }

  }

  private static _scrapPage = async (link: string, crawlPageDataFunction, postDataOverride?) => {
    try {
      console.log(`🤖: Scrapping data from ...${link}`);

      ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `🤖: Scrapping link ${link}`)

      const args = postDataOverride ? [link, postDataOverride] : [link]

      const postData = await ConnectionHelper.tryRequestUntilSucceeds(crawlPageDataFunction, args)


      if (await PostScrapperHelper.isPostInvalid(postData)) {
        return false
      }

      if (BotHelper.owner) {
        // create a new post and save with post data!

        try {
          const newPost = new Post({ ...postData, slug: PostHelper.generateTitleSlug(postData.title), owner: BotHelper.owner._id })
          await newPost.save()

          await BotHelper._notifyUsers(newPost);

        }
        catch (error) {
          console.error(error);
        }


        ConsoleHelper.coloredLog(ConsoleColor.BgGreen, ConsoleColor.FgWhite, '🤖: Post saved on database!')

        if (ScrapperOLX.postLinks) {
          ScrapperOLX.postLinks.map((postLink) => {
            if (postLink.link === link) {
              postLink.scrapped = true
            }
            return postLink
          })
        }

      } else {
        console.log(`🤖: User with e-mail ${process.env.ADMIN_EMAIL} not found! It's necessary for saving our posts!`)
        console.log(`🤖: Failed to scrap data from ${link}!`)
      }

    }
    catch (error) {
      console.log(`🤖: Failed to scrap data from ${link}!`)
      console.log(error);
    }
  }






}
