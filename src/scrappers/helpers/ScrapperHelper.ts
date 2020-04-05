import UserAgent from 'user-agents';

import { EnvType } from '../../constants/types/env.types';
import { IPost, Post } from '../../resources/Post/post.model';
import { User } from '../../resources/User/user.model';
import { ConsoleColor, ConsoleHelper } from '../../utils/ConsoleHelper';
import { GenericHelper } from '../../utils/GenericHelper';
import { PostHelper } from '../../utils/PostHelper';
import { ScrapperFacebook } from '../scrappers/ScrapperFacebook';
import { IScrapperLink, ScrapperOLX } from '../scrappers/ScrapperOLX';
import { ConnectionHelper } from './ConnectionHelper';
import { PostScrapperHelper } from './PostScrapperHelper';

export interface IProxyItem {
  ip: string;
  port: string;
}

export enum PagePattern {
  ListAndInternalPosts = "ListAndInternalPost", // Example: https://es.olx.com.br/vagas-de-emprego
  Feed = "Feed" // Example: https://www.facebook.com/oportunidadesdeempregoes/
}

export interface ICrawlerFunctions {
  crawlLinksFunction?: (externalSource: string) => Promise<IScrapperLink[]>,
  crawlPageDataFunction?: (link: string) => any,
  crawlFeedFunction?: (link: string) => Promise<any>
}

export interface IBestMatchAndSector {
  jobRoleBestMatch: string,
  sector: string
}

export class ScrapperHelper {

  public static proxyList: IProxyItem[];
  public static chosenProxy: IProxyItem;
  public static userAgent: string;
  public static owner;


  public static init = async (name, crawlerFunctions: ICrawlerFunctions, type: PagePattern, externalSource?: string, postDataOverride?: Object) => {

    const { crawlLinksFunction, crawlPageDataFunction, crawlFeedFunction } = crawlerFunctions

    console.log(`🤖: Initializing ${name}`);
    // Make sure we close any puppeteer open instances, if that's the case
    await ScrapperFacebook.clear()

    const proxyList = await ConnectionHelper.fetchProxyList();
    ScrapperHelper.proxyList = proxyList;
    ScrapperHelper.chosenProxy = ConnectionHelper.rotateProxy(ScrapperHelper.proxyList);
    ScrapperHelper.userAgent = new UserAgent().random().data.userAgent;

    ScrapperHelper.owner = await User.findOne({ email: process.env.ADMIN_EMAIL })

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
            await GenericHelper.sleep(10000)
            await ScrapperHelper._scrapPage(linkItem.link, crawlPageDataFunction, postDataOverride)

          }


        }

        break;

      case PagePattern.Feed: // used by ScrapperFacebook

        if (externalSource) {
          await ScrapperHelper._scrapFeed(externalSource, crawlFeedFunction, postDataOverride)
        } else {
          console.log(`🤖: Warning! You should define an external source page for scrapping on OnePageAllPosts PagePattern!`);
        }
        break;
    }

    ConsoleHelper.coloredLog(ConsoleColor.BgGreen, ConsoleColor.FgWhite, `🤖: Finished!`)

    // Make sure we close any puppeteer open instances, if that's the case
    await ScrapperFacebook.clear()

    if (process.env.ENV === EnvType.Production) {
      await GenericHelper.sleep(1000 * 60 * Math.floor(Math.random() * 5))
    }
  };



  private static _scrapFeed = async (link: string, crawlFeedFunction, postDataOverride?: Object) => {
    console.log(`🤖: Scrapping data FEED from...${link}`);

    const args = postDataOverride ? [link, postDataOverride] : [link]

    const postsData: IPost[] = await ConnectionHelper.tryRequestUntilSucceeds(crawlFeedFunction, args)

    if (!postsData) {
      console.log(`🤖: Failed to scrap posts data at ${link}`)
      return
    }

    if (ScrapperHelper.owner) {

      // loop through feed posts and start saving them into db

      for (const post of postsData) {

        // check if post already exists

        if (await PostScrapperHelper.isPostInvalid(post)) {
          continue
        }



        const newPost = new Post({ ...post, slug: PostHelper.generateTitleSlug(post.title), owner: ScrapperHelper.owner._id })
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



      if (ScrapperHelper.owner) {


        const newPost = new Post({ ...postData, slug: PostHelper.generateTitleSlug(postData.title), owner: ScrapperHelper.owner._id })

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
