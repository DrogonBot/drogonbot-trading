import cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import rp from 'request-promise';
import stringSimilarity from 'string-similarity';
import util from 'util';

import { ISector, Sector } from '../../resources/Sector/sector.model';
import { GenericHelper } from '../../utils/GenericHelper';
import { ScrapperESOlx } from '../scrappers/ScrapperESOlx';

export interface IProxyItem {
  ip: string;
  port: string;
}

export class ScrapperHelper {
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
        console.log(`Using proxy IP ${proxyItem.ip} - PORT ${proxyItem.port}`);
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

        ScrapperESOlx.chosenProxy = ScrapperHelper.rotateProxy(ScrapperESOlx.proxyList);

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
