import UserAgent from 'user-agents';

import { EnvType } from '../../constants/types/env.types';
import { Post } from '../../resources/Post/post.model';
import { IPost, PostSource } from '../../resources/Post/post.types';
import { IUser, User } from '../../resources/User/user.model';
import { ConsoleColor, ConsoleHelper } from '../../utils/ConsoleHelper';
import { GenericHelper } from '../../utils/GenericHelper';
import { LanguageHelper } from '../../utils/LanguageHelper';
import { PostHelper } from '../../utils/PostHelper';
import { ScrapperFacebook } from '../scrappers/ScrapperFacebook';
import { ICrawlerFunctions, IProxyItem, PagePattern, ProxyType } from '../types/bots.types';
import { ILeadModel } from './../../resources/Lead/lead.model';
import { NotificationHelper } from './../../utils/NotificationHelper';
import { ConnectionHelper } from './ConnectionHelper';
import { PostScrapperHelper } from './PostScrapperHelper';

export class BotHelper {

  public static proxyType: ProxyType
  public static proxyList: IProxyItem[];
  public static chosenProxy: IProxyItem | null;
  public static userAgent: string;
  public static owner;
  public static failedRequestIntervalMs: number = 2000;
  public static postLinkScrappingIntervalMs: number = 3000;
  public static scrapperHelperFinishIntervalMs: number = 1000 * 60 * Math.floor(Math.random() * 2)
  public static scrapperClass;
  public static fixEncoding: boolean = false

  public static init = async (name: string, source: PostSource) => {


    ConsoleHelper.coloredLog(ConsoleColor.BgYellow, ConsoleColor.FgWhite, `🤖: Initializing ${name}`)



    switch (process.env.ENV) {
      case EnvType.Production:

        BotHelper.proxyType = ProxyType.FreeProxy
        await BotHelper.initializeFreeProxy()


        // ! ZenScrape is turned off temporarely
        // // ! Due to high costs, ZenScrape is restricted to Facebook only!
        // if (source === PostSource.Facebook) {
        //   // lets check if our free tier on ZenScrape is already gone. If so, use free proxy for requests
        //   const today = moment.tz(new Date(), process.env.TIMEZONE).format('YYYY-MM-DD[T00:00:00.000Z]');

        //   const zenScrapeUsedRequests = await Log.find({
        //     action: `ZENSCRAPE_REQUEST`,
        //     createdAt: { "$gte": today }
        //   })

        //   // use ZenScrape if we still have credits left

        //   if (zenScrapeUsedRequests.length <= Number(process.env.ZEN_SCRAPE_FREE_TIER_THRESHOLD)) {
        //     console.log(`⚙️: Setting ProxyType as ZenScrape`);
        //     BotHelper.proxyType = ProxyType.ZenScrape
        //   } else {
        //     console.log(`⚙️: Setting ProxyType as FreeProxy`);
        //     BotHelper.proxyType = ProxyType.FreeProxy;
        //     await BotHelper.initializeFreeProxy()
        //   }

        // } else { // use FreeProxy as fallback, is ZenScrape is not available anymore
        //   BotHelper.proxyType = ProxyType.FreeProxy
        //   await BotHelper.initializeFreeProxy()
        // }


        break;
      case EnvType.Development:

        // We don't use proxies on development, since it slow us down...
        BotHelper.proxyType = ProxyType.None;
        BotHelper.proxyList = []
        BotHelper.chosenProxy = null
        break;
    }

    BotHelper.scrapperClass.postLinks = null // Since we're initializing a scrapper, set postLinks to null
    BotHelper.userAgent = new UserAgent().random().data.userAgent;
    BotHelper.owner = await User.findOne({ email: process.env.ADMIN_EMAIL })
  }

  public static finish = async () => {

    BotHelper.scrapperClass.postLinks = null

    ConsoleHelper.coloredLog(ConsoleColor.BgYellow, ConsoleColor.FgWhite, `🤖: Finished!`)

    // Make sure we close any puppeteer open instances, if that's the case
    await ScrapperFacebook.clear(ScrapperFacebook.browser)

    if (process.env.ENV === EnvType.Production) {
      await GenericHelper.sleep(BotHelper.scrapperHelperFinishIntervalMs)
    }

  }

  public static initScrapper = async (name, scrapperClass, source: PostSource, crawlerFunctions: ICrawlerFunctions, type: PagePattern, externalSource?: string, postDataOverride?: Object, bypassPostContentFilter?: boolean, fixEncoding?: boolean, isTrustableSource?: boolean, redirectToSourceOnly?: boolean) => {

    BotHelper.scrapperClass = scrapperClass;
    BotHelper.fixEncoding = fixEncoding || false;

    const { crawlLinksFunction, crawlPageDataFunction, crawlFeedFunction } = crawlerFunctions

    await BotHelper.init(name, source)


    switch (type) {

      case PagePattern.ListAndInternalPosts: // used by ScrapperOLX

        if (BotHelper.scrapperClass.postLinks === null) { // If no links were scrapped yet
          BotHelper.scrapperClass.postLinks = await ConnectionHelper.tryRequestUntilSucceeds(crawlLinksFunction, [externalSource])
          console.log(`🤖: Scrapping external source ${externalSource}`);
        }
        // if we already have scrapped post links, filter the ones who were not scrapped

        if (BotHelper.scrapperClass.postLinks) {

          const links = BotHelper.scrapperClass.postLinks.filter((link) => !link.scrapped) // make sure we only scrap unscrapped items

          for (const linkItem of links) {

            // check if post exists in our database. Skip if so.

            const isPostScrapped = await Post.exists({ externalUrl: linkItem.link });

            if (isPostScrapped) {
              console.log(`🤖: Post ${linkItem.link} is already scrapped! Skipping!`);
              continue;
            }

            await GenericHelper.sleep(BotHelper.postLinkScrappingIntervalMs)
            await BotHelper._scrapPage(linkItem.link, crawlPageDataFunction, postDataOverride, bypassPostContentFilter, isTrustableSource, redirectToSourceOnly)
          }
        }

        break;

      case PagePattern.Feed: // used by ScrapperFacebook

        if (externalSource) {
          await BotHelper._scrapFeed(externalSource, crawlFeedFunction, postDataOverride, bypassPostContentFilter, isTrustableSource, redirectToSourceOnly)
        } else {
          console.log(`🤖: Warning! You should define an external source page for scrapping on OnePageAllPosts PagePattern!`);
        }
        break;
    }

    BotHelper.finish();

  };

  public static initializeFreeProxy = async () => {
    // Let's fetch our proxies list only if we didn't do it before...
    if (!BotHelper.proxyList) {
      const proxyList = await ConnectionHelper.fetchFreeProxyList();
      BotHelper.proxyList = proxyList;
    }
    BotHelper.chosenProxy = ConnectionHelper.rotateProxy(BotHelper.proxyList);

  }

  public static combineLeadsAndUsers = (users, leads): ILeadModel[] | IUser[] => {

    let output: ILeadModel[] | IUser[] = users;

    for (const lead of leads) {

      const hasInUsers = users.some((user) => user.email === lead.email)

      if (!hasInUsers) {
        output = [
          ...output,
          lead
        ]
      }

    }

    return output;

  }



  private static _scrapFeed = async (link: string, crawlFeedFunction, postDataOverride?: Object, bypassPostContentFilter?: boolean, isTrustableSource?: boolean, redirectToSourceOnly?: boolean) => {
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

        if (post.email && post.email.includes(',')) {
          post.email = post.email.replace(',', '') // fix any comma that may be mistakenly added
        }

        // check if post already exists
        // if theres no bypass, lets check if the post content is valid!
        if (!bypassPostContentFilter) {
          if (await PostScrapperHelper.isPostInvalid(post)) {
            continue
          }
        }

        const newPost = new Post({ ...post, slug: PostHelper.generateTitleSlug(post.title), owner: BotHelper.owner._id, isTrustableSource, redirectToSourceOnly })
        await newPost.save()
        console.log(`🤖: Saving post: ${post.title}`);

        await NotificationHelper.newPostNotification(newPost);

        await GenericHelper.sleep(1000)
        ConsoleHelper.coloredLog(ConsoleColor.BgGreen, ConsoleColor.FgWhite, `🤖: Post saved on database! => ${newPost.title}`)
        console.log(`${newPost.title} - ${newPost.stateCode}/${newPost.city} - ${newPost.externalUrl ? newPost.externalUrl : ''}`);
      }
    } else {
      console.log(`🤖: User with e-mail ${process.env.ADMIN_EMAIL} not found! It's necessary for saving our posts!`)
      console.log(`🤖: Failed to scrap data from ${link}!`)
    }

  }

  private static _scrapPage = async (link: string, crawlPageDataFunction, postDataOverride?, bypassPostContentFilter?: boolean, isTrustableSource?: boolean, redirectToSourceOnly?: boolean) => {
    try {
      console.log(`🤖: Scrapping data from ...${link}`);

      ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `🤖: Scrapping link ${link}`)

      const args = postDataOverride ? [link, postDataOverride] : [link]

      const postData = await ConnectionHelper.tryRequestUntilSucceeds(crawlPageDataFunction, args)

      if (postData.email && postData.email.includes(',')) {
        postData.email = postData.email.replace(',', '') // fix any comma that may be mistakenly added
      }


      // if theres no bypass, lets check if the post content is valid!
      if (!bypassPostContentFilter) {
        if (await PostScrapperHelper.isPostInvalid(postData)) {
          return false
        }
      }


      if (BotHelper.owner) {
        // create a new post and save with post data!


        try {
          const newPost = new Post({ ...postData, slug: PostHelper.generateTitleSlug(postData.title), owner: BotHelper.owner._id, isTrustableSource, redirectToSourceOnly })

          // hide all contact data from page source, if this is a redirectOnly page
          if (redirectToSourceOnly) {
            newPost.content = newPost.content.replace(new RegExp(/\S+@\S+\.\S+/, 'ig'), LanguageHelper.getLanguageString('post', 'postIsRedirectOnlyMessage'));

            newPost.content = newPost.content.replace(new RegExp(/(\(?\d{2}\)?\.?\s?)?(\d{4,5}(\-?|\s?)\d{4})/, 'g'), LanguageHelper.getLanguageString('post', 'postIsRedirectOnlyMessage'));
          }

          await newPost.save()

          console.log(`${newPost.title} - ${newPost.stateCode}/${newPost.city} - ${newPost.externalUrl ? newPost.externalUrl : ''}`);

          await NotificationHelper.newPostNotification(newPost);

        }
        catch (error) {
          console.error(error);
        }


        ConsoleHelper.coloredLog(ConsoleColor.BgGreen, ConsoleColor.FgWhite, '🤖: Post saved on database!')


        if (BotHelper.scrapperClass.postLinks) {
          BotHelper.scrapperClass.postLinks.map((postLink) => {
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
