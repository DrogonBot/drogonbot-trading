import cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import rp from 'request-promise';
import stringSimilarity from 'string-similarity';
import util from 'util';

import { IPost, Post } from '../../resources/Post/post.model';
import { ISector, Sector } from '../../resources/Sector/sector.model';
import { User } from '../../resources/User/user.model';
import { ConsoleColor, ConsoleHelper } from '../../utils/ConsoleHelper';
import { GenericHelper } from '../../utils/GenericHelper';

export interface IProxyItem {
  ip: string;
  port: string;
}

export enum PagePattern {
  ListAndInternalPosts = "ListAndInternalPost", // Example: https://es.olx.com.br/vagas-de-emprego
  Feed = "Feed" // Example: https://www.facebook.com/oportunidadesdeempregoes/
}

export interface ICrawlerFunctions {
  crawlLinksFunction?: () => Promise<string[]>,
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
  public static owner;


  public static init = async (name, crawlerFunctions: ICrawlerFunctions, type: PagePattern, externalSource?: string, postDataOverride?: Object) => {

    const { crawlLinksFunction, crawlPageDataFunction, crawlFeedFunction } = crawlerFunctions

    console.log(`🤖: Initializing ${name}`);

    const proxyList = await ScrapperHelper.fetchProxyList();

    ScrapperHelper.proxyList = proxyList;
    ScrapperHelper.chosenProxy = ScrapperHelper.rotateProxy(ScrapperHelper.proxyList);
    ScrapperHelper.owner = await User.findOne({ email: process.env.ADMIN_EMAIL })

    switch (type) {

      case PagePattern.ListAndInternalPosts:
        const links = await ScrapperHelper.tryRequestUntilSucceeds(crawlLinksFunction)

        for (const link of links) {
          await GenericHelper.sleep(10000)

          // check if link wasn't already scrapped!
          const postFound = await Post.find({ externalUrl: link })

          if (postFound.length >= 1) {
            console.log(`🤖: Hmm... This post is already scrapped! Skipping...`);
            continue
          }

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

    await GenericHelper.sleep(1000 * 60 * Math.floor(Math.random() * 5))
  };

  private static _checkForBannedWords = (content: string) => {

    const bannedWords = ['renda extra', 'marketing multinível', 'grátis', 'compro', 'vendo', 'extra', 'trabalhar em casa', 'home office', 'digitador']

    for (const word of bannedWords) {
      if (content.toLowerCase().includes(word.toLowerCase())) {
        return word
      }
    }
    return false;
  }

  private static _scrapFeed = async (link: string, crawlFeedFunction, postDataOverride?: Object) => {
    console.log(`🤖: Scrapping data FEED from...${link}`);

    const args = postDataOverride ? [link, postDataOverride] : [link]

    const postsData: IPost[] = await ScrapperHelper.tryRequestUntilSucceeds(crawlFeedFunction, args)

    if (!postsData) {
      console.log(`🤖: Failed to scrap posts data at ${link}`)
      return
    }

    console.log(postsData);

    if (ScrapperHelper.owner) {

      // loop through feed posts and start saving them into db

      for (const post of postsData) {

        const forbiddenWord = ScrapperHelper._checkForBannedWords(post.content)
        if (forbiddenWord) {
          console.log(`🤖: Skipping scrapping! This post contains the forbidden word ${forbiddenWord}.`)
          continue
        }

        if (post.content.length <= 70) {
          console.log(`🤖: Skipping because post description is too short! Maybe its not a post!`)
          continue
        }

        if (!post.email && !post.phone && !post.externalUrl) {
          console.log(`🤖: Skipping! No email, phone or external url found for: ${link}!`)
          continue
        }

        const newPost = new Post({ ...post, owner: ScrapperHelper.owner._id })
        newPost.save()
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

      const postData = await ScrapperHelper.tryRequestUntilSucceeds(crawlPageDataFunction, [link])

      const forbiddenWord = ScrapperHelper._checkForBannedWords(postData)
      if (forbiddenWord) {
        console.log(`🤖: Skipping scrapping! This post contains the forbidden word ${forbiddenWord}.`)
        return
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


  public static loadLocalHtml = async (location: string) => {
    const readFile = util.promisify(fs.readFile);
    return readFile(path.join(__dirname, location), 'utf8');
  };

  public static crawlHtml = async (
    url: string,
    proxyItem?: IProxyItem | null,
    showProxyWarnings?: boolean
  ) => {

    let proxiedRequest;

    try {
      if (proxyItem) {
        console.log(`🤖: Using proxy IP ${proxyItem.ip} - PORT ${proxyItem.port}`);
        proxiedRequest = rp.defaults({
          proxy: `http://${proxyItem.ip}:${proxyItem.port}`,
          strictSSL: false,
          timeout: 15000
        });

        // Check if proxy is really working
        // console.log('TEST RESULTS');
        // const test = await proxiedRequest('https://api.ipify.org?format=json');
        // console.log(test);

        const req = await proxiedRequest(url);

        return req;
      } else {
        if (showProxyWarnings) {
          console.log("🔥 WARNING - YOU'RE NOT USING A PROXY! 🔥");
        }

        const req = await rp(url);
        return req;
      }
    } catch (error) {

      throw new Error('PROXY CONNECTION FAILED!')
    }

  };

  public static fetchProxyList = async () => {
    console.log('🤖: Fetching proxy list...');

    const html = await ScrapperHelper.crawlHtml(
      'https://sslproxies.org/',
      null,
      false
    );

    const $ = cheerio.load(html);

    const proxyTableRows = $('#proxylisttable tbody tr');

    let proxyList: IProxyItem[] = [];

    proxyTableRows.each((i, el) => {
      const ip = $(el.children[0]).text();
      const port = $(el.children[1]).text();

      proxyList = [...proxyList, { ip, port }];
    });

    return proxyList;
  };

  public static rotateProxy = (proxyList: IProxyItem[]) => {
    return proxyList[Math.floor(Math.random() * proxyList.length)];
  };

  public static tryRequestUntilSucceeds = async (request, args?) => {

    // This function is useful because it's not always that we'll get a connection on a free proxy!

    while (true) {
      try {

        if (args) {
          return await request(...args)
        } else {
          return await request()
        }

      }
      catch (error) {

        ConsoleHelper.coloredLog(ConsoleColor.BgRed, ConsoleColor.FgBlack, `🤖: Request failed! Rotating proxy! Better luck next time!`)
        console.log(error);

        ScrapperHelper.chosenProxy = ScrapperHelper.rotateProxy(ScrapperHelper.proxyList);

        await GenericHelper.sleep(30000)
      }
    }


  }

  public static getTitle = (post): string => {
    try {
      return post.split('\n')[0]
    }
    catch (error) {
      return ""
    }
  }

  private static getSector = async (jobRole) => {
    // now, based on the jobRoleBestMatch, lets find which sector does this position belongs too
    try {
      const sector = await Sector.findOne({ keywords: { "$in": [jobRole] } })
      if (sector) {
        return sector.name
      }
    }
    catch (error) {
      console.log(`Couldn't the sector for ${jobRole}!`);
      return "Outros"
    }

    return "Outros"
  }

  public static findJobRolesAndSector = async (content, title?): Promise<IBestMatchAndSector> => {
    let bestMatchOverall;

    const sectorsData = await Sector.find({})
    const sectorRolesRaw = sectorsData.map((sectorEl: ISector) => sectorEl.keywords)
    const sectors = GenericHelper.arrayFlatten(sectorRolesRaw)

    try {
      // First step: Let's try a full match

      for (const role of sectors) {
        if (content.replace('\n', ' ').toLowerCase().includes(` ${role.toLowerCase()}`)) {

          console.log('ROLE MATCH');
          console.log(role);

          const sectorData = await ScrapperHelper.getSector(role)
          return {
            jobRoleBestMatch: role,
            sector: sectorData
          }
        }
      }
      // Second step: If a full match is not possible, let's analyze the post content
      const uppercaseMatches = content.match(/[A-Z]+\W/g) ? content.match(/[A-Z]+\W/g).join(' ').toLowerCase() : [];

      const bestTitleMatches = title ? stringSimilarity.findBestMatch(title, sectors).bestMatch : []
      const bestContentMatches = stringSimilarity.findBestMatch(content, sectors).bestMatch
      const bestUppercaseMatches = (uppercaseMatches.length >= 1 ? stringSimilarity.findBestMatch(uppercaseMatches, sectors).bestMatch : [])   // sometimes companies leave the position name in uppercase


      const bestMatches = [bestTitleMatches, bestContentMatches, bestUppercaseMatches].sort((x, y) => x.rating > y.rating ? -1 : 1).filter((match) => {
        if (match.target) { // we do this to avoid empty matches
          return match
        }
      });



      bestMatchOverall = bestMatches[0].target

    }
    catch (error) {
      // if not found, throw an error
      console.log(error);
      throw new Error('Position not found!')
    }

    const sector = await ScrapperHelper.getSector(bestMatchOverall)

    return {
      jobRoleBestMatch: bestMatchOverall,
      sector
    }
  }

}
