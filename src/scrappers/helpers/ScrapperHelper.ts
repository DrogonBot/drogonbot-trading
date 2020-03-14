import UserAgent from 'user-agents';

import { EnvType } from '../../constants/types/env.types';
import { IPost, Post } from '../../resources/Post/post.model';
import { User } from '../../resources/User/user.model';
import { ConsoleColor, ConsoleHelper } from '../../utils/ConsoleHelper';
import { GenericHelper } from '../../utils/GenericHelper';
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
  crawlLinksFunction?: (externalSource: string) => Promise<string[]>,
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

    const proxyList = await ConnectionHelper.fetchProxyList();
    ScrapperHelper.proxyList = proxyList;
    ScrapperHelper.chosenProxy = ConnectionHelper.rotateProxy(ScrapperHelper.proxyList);
    ScrapperHelper.userAgent = new UserAgent().random().data.userAgent;

    ScrapperHelper.owner = await User.findOne({ email: process.env.ADMIN_EMAIL })

    switch (type) {

      case PagePattern.ListAndInternalPosts:
        console.log(`🤖: Scrapping external source ${externalSource}`);
        const links = await ConnectionHelper.tryRequestUntilSucceeds(crawlLinksFunction, [externalSource])

        for (const link of links) {
          await GenericHelper.sleep(10000)

          await ScrapperHelper._scrapPage(link, crawlPageDataFunction)
        }
        break;

      case PagePattern.Feed:

        if (externalSource) {
          await ScrapperHelper._scrapFeed(externalSource, crawlFeedFunction, postDataOverride)
        } else {
          console.log(`🤖: Warning! You should define an external source page for scrapping on OnePageAllPosts PagePattern!`);
        }
        break;
    }

    ConsoleHelper.coloredLog(ConsoleColor.BgGreen, ConsoleColor.FgWhite, `🤖: Finished!`)

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

        const newPost = new Post({ ...post, owner: ScrapperHelper.owner._id })
        newPost.save()
        console.log(`Saving post: ${post.title}`);
        await GenericHelper.sleep(1000)
        ConsoleHelper.coloredLog(ConsoleColor.BgGreen, ConsoleColor.FgWhite, '🤖: Post saved on database!')
      }
    } else {
      console.log(`🤖: User with e-mail ${process.env.ADMIN_EMAIL} not found! It's necessary for saving our posts!`)
      console.log(`🤖: Failed to scrap data from ${link}!`)
    }

  }

  private static _scrapPage = async (link: string, crawlPageDataFunction) => {
    try {
      console.log(`🤖: Scrapping data from ...${link}`);

      const postData = await ConnectionHelper.tryRequestUntilSucceeds(crawlPageDataFunction, [link])


      if (await PostScrapperHelper.isPostInvalid(postData)) {
        return false
      }



      if (ScrapperHelper.owner) {
        const newPost = new Post({ ...postData, owner: ScrapperHelper.owner._id })
        newPost.save()
        ConsoleHelper.coloredLog(ConsoleColor.BgGreen, ConsoleColor.FgWhite, '🤖: Post saved on database!')
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
