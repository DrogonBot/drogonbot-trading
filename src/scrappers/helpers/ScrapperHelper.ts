import cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import rp from 'request-promise';
import stringSimilarity from 'string-similarity';
import util from 'util';

import { Post } from '../../resources/Post/post.model';
import { ISector, Sector } from '../../resources/Sector/sector.model';
import { User } from '../../resources/User/user.model';
import { ConsoleColor, ConsoleHelper } from '../../utils/ConsoleHelper';
import { GenericHelper } from '../../utils/GenericHelper';

export interface IProxyItem {
  ip: string;
  port: string;
}

export class ScrapperHelper {

  public static proxyList;
  public static chosenProxy;


  public static init = async (name, crawlLinksFunction, crawlPageDataFunction) => {

    console.log(`🤖: Initializing ${name}`);

    const proxyList = await ScrapperHelper.fetchProxyList();

    ScrapperHelper.proxyList = proxyList;
    ScrapperHelper.chosenProxy = ScrapperHelper.rotateProxy(ScrapperHelper.proxyList);



    /*#############################################################|
    |  >>> FIRST STEP: Crawl for post links
    *##############################################################*/

    const links = await ScrapperHelper.tryRequestUntilSucceeds(crawlLinksFunction)

    const owner = await User.findOne({ email: process.env.ADMIN_EMAIL })

    for (const link of links) {

      await GenericHelper.sleep(10000)

      // check if link wasn't already scrapped!
      const postFound = await Post.find({ externalUrl: link })

      if (postFound.length >= 1) {
        console.log(`🤖: Hmm... This post is already scrapped! Skipping...`);
        continue
      }


      /*#############################################################|
      |  >>> SECOND STEP: Crawl for INDIVIDUAL page data
      *##############################################################*/

      try {
        console.log(`🤖: Scrapping data from ...${link}`);

        const postData = await ScrapperHelper.tryRequestUntilSucceeds(crawlPageDataFunction, [link])

        if (owner) {
          const newPost = new Post({ ...postData, owner: owner._id })
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

    ConsoleHelper.coloredLog(ConsoleColor.BgGreen, ConsoleColor.FgWhite, `🤖: Finished!`)


  };


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
        console.log(`🤖: Request failed! Rotating proxy! Better luck next time!`);
        console.log(error);

        ScrapperHelper.chosenProxy = ScrapperHelper.rotateProxy(ScrapperHelper.proxyList);

        await GenericHelper.sleep(30000)
      }
    }


  }

  public static findJobRolesAndSector = async (title, content) => {
    let jobRoleBestMatch: string[] = []

    try {
      // first, try to get the position based on the title

      const sectors = await Sector.find({})
      const sectorRolesRaw = sectors.map((sectorEl: ISector) => sectorEl.keywords)
      const sectorRoles = GenericHelper.arrayFlatten(sectorRolesRaw)

      const jobRolesMatchesBasedOnTitle = stringSimilarity.findBestMatch(title, sectorRoles).bestMatch
      const jobRolesMatchesBasedOnContent = stringSimilarity.findBestMatch(content, sectorRoles).bestMatch

      const jobRoleBestMatchArr = [jobRolesMatchesBasedOnTitle, jobRolesMatchesBasedOnContent]

      // get the best match overall
      jobRoleBestMatch = jobRoleBestMatchArr.sort((x, y) => x.rating > y.rating ? -1 : 1)[0].target;

    }
    catch (error) {

      // if not found, throw an error
      throw new Error('Position not found!')
    }

    // now, based on the jobRoleBestMatch, lets find which sector does this position belongs too
    let sector;
    try {
      sector = await Sector.findOne({ keywords: { "$in": [jobRoleBestMatch] } })
    }
    catch (error) {
      sector = "Outros"
    }

    return {
      jobRoleBestMatch,
      sector
    }
  }

}
