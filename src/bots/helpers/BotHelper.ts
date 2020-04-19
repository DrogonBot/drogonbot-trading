import UserAgent from 'user-agents';

import { EnvType } from '../../constants/types/env.types';
import { IPost, Post } from '../../resources/Post/post.model';
import { User } from '../../resources/User/user.model';
import { ConsoleColor, ConsoleHelper } from '../../utils/ConsoleHelper';
import { GenericHelper } from '../../utils/GenericHelper';
import { PostHelper } from '../../utils/PostHelper';
import { ScrapperFacebook } from '../scrappers/ScrapperFacebook';
import { ScrapperOLX } from '../scrappers/ScrapperOLX';
import { ICrawlerFunctions, IProxyItem, PagePattern } from '../types/bots.types';
import { ConnectionHelper } from './ConnectionHelper';
import { PostScrapperHelper } from './PostScrapperHelper';

export class BotHelper {

  public static proxyList: IProxyItem[];
  public static chosenProxy: IProxyItem;
  public static userAgent: string;
  public static owner;
  public static failedRequestIntervalMs: number = 10000;
  public static postLinkScrappingIntervalMs: number = 10000;
  public static scrapperHelperFinishIntervalMs: number = 1000 * 60 * Math.floor(Math.random() * 5)


  public static init = async (name: string) => {
    console.log(`🤖: Initializing ${name}`);


    const proxyList = await ConnectionHelper.fetchProxyList();
    BotHelper.proxyList = proxyList;
    BotHelper.chosenProxy = ConnectionHelper.rotateProxy(BotHelper.proxyList);
    BotHelper.userAgent = new UserAgent().random().data.userAgent;
    BotHelper.owner = await User.findOne({ email: process.env.ADMIN_EMAIL })
  }

  public static initScrapper = async (name, crawlerFunctions: ICrawlerFunctions, type: PagePattern, externalSource?: string, postDataOverride?: Object) => {

    const { crawlLinksFunction, crawlPageDataFunction, crawlFeedFunction } = crawlerFunctions



    BotHelper.init(name)


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

    ConsoleHelper.coloredLog(ConsoleColor.BgGreen, ConsoleColor.FgWhite, `🤖: Finished!`)

    // Make sure we close any puppeteer open instances, if that's the case
    await ScrapperFacebook.clear()

    if (process.env.ENV === EnvType.Production) {
      await GenericHelper.sleep(BotHelper.scrapperHelperFinishIntervalMs)
    }
  };

  public static initPoster = async (name, groupPostFunction) => {

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
        newPost.save()
        console.log(`Saving post: ${post.title}`);

        // notify users that may be interested on this role, about this position
        PostScrapperHelper.notifyUsers(post)


        await GenericHelper.sleep(1000)
        ConsoleHelper.coloredLog(ConsoleColor.BgGreen, ConsoleColor.FgWhite, `🤖: Post saved on database! => ${post.title}`)
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


        const newPost = new Post({ ...postData, slug: PostHelper.generateTitleSlug(postData.title), owner: BotHelper.owner._id })

        newPost.save()
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
