import cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import rp from 'request-promise';
import UserAgent from 'user-agents';
import util from 'util';

import { ConsoleColor, ConsoleHelper } from '../../utils/ConsoleHelper';
import { GenericHelper } from '../../utils/GenericHelper';
import { ScrapperFacebook } from '../scrappers/ScrapperFacebook';
import { IProxyItem, ScrapperBotHelper } from './ScrapperBotHelper';

export class ConnectionHelper {

  public static requestLocalHtml = async (location: string) => {
    const readFile = util.promisify(fs.readFile);
    return readFile(path.join(__dirname, location), 'utf8');
  };

  public static requestHtml = async (
    url: string,
    proxyItem?: IProxyItem | null,
    showProxyWarnings?: boolean
  ) => {

    let proxiedRequest;

    try {
      if (proxyItem) {
        console.log(`🤖: Using proxy IP ${proxyItem.ip} - PORT ${proxyItem.port}`);

        ScrapperBotHelper.userAgent = new UserAgent().random().data.userAgent;

        console.log(`🤖: User agent: ${ScrapperBotHelper.userAgent}`);

        proxiedRequest = rp.defaults({
          proxy: `http://${proxyItem.ip}:${proxyItem.port}`,
          strictSSL: false,
          timeout: 15000,
          headers: {
            'User-Agent': ScrapperBotHelper.userAgent
          }
        });


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

    const html = await ConnectionHelper.requestHtml('https://sslproxies.org/',
      null,
      false)

    const $ = cheerio.load(html);

    const proxyTableRows = $('#proxylisttable tbody tr');

    let proxyList: IProxyItem[] = [];

    proxyTableRows.each((i, el) => {
      const ip = $(el.children[0]).text();
      const port = $(el.children[1]).text();

      proxyList = [...proxyList, { ip, port }];
    });
    console.log(`🤖: Done, proxy list loaded! => ${proxyList.length} proxies found!`);
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

        // Change proxy and user agent on every request
        ScrapperBotHelper.chosenProxy = ConnectionHelper.rotateProxy(ScrapperBotHelper.proxyList);
        ScrapperBotHelper.userAgent = new UserAgent().random().data.userAgent;

        // Close our browser agents to avoid memory leaks
        await ScrapperFacebook.clear();

        await GenericHelper.sleep(ScrapperBotHelper.failedRequestIntervalMs)
      }
    }


  }



}