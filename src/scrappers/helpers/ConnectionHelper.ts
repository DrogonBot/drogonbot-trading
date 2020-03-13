import cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import rp from 'request-promise';
import UserAgent from 'user-agents';
import util from 'util';

import { ConsoleColor, ConsoleHelper } from '../../utils/ConsoleHelper';
import { GenericHelper } from '../../utils/GenericHelper';
import { IProxyItem, ScrapperHelper } from './ScrapperHelper';

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

        ScrapperHelper.userAgent = new UserAgent().random();

        console.log(`🤖: User agent: ${ScrapperHelper.userAgent}`);

        proxiedRequest = rp.defaults({
          proxy: `http://${proxyItem.ip}:${proxyItem.port}`,
          strictSSL: false,
          timeout: 15000,
          headers: {
            'User-Agent': ScrapperHelper.userAgent
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
    console.log('🤖: Done, proxy list loaded!');
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

        ScrapperHelper.chosenProxy = ConnectionHelper.rotateProxy(ScrapperHelper.proxyList);

        await GenericHelper.sleep(30000)
      }
    }


  }



}