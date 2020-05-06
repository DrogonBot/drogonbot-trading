import cheerio from 'cheerio';
import fs from 'fs';
import moment from 'moment-timezone';
import path from 'path';
import rp from 'request-promise';
import UserAgent from 'user-agents';
import util from 'util';

import { Log } from '../../resources/Log/log.model';
import { ConsoleColor, ConsoleHelper } from '../../utils/ConsoleHelper';
import { GenericHelper } from '../../utils/GenericHelper';
import { ScrapperFacebook } from '../scrappers/ScrapperFacebook';
import { IProxyItem, ProxyType } from '../types/bots.types';
import { BotHelper } from './BotHelper';


export class ConnectionHelper {

  public static requestLocalHtml = async (location: string) => {
    const readFile = util.promisify(fs.readFile);
    return readFile(path.join(__dirname, location), 'utf8');
  };

  public static requestHtml = async (
    url: string,
    noProxy?: boolean
  ) => {

    try {

      if (noProxy) {
        return await rp(url);
      }


      switch (BotHelper.proxyType) {
        case ProxyType.FreeProxy:
          if (BotHelper.chosenProxy) {

            ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `🤖: (FreeProxy) Using proxy IP ${BotHelper.chosenProxy.ip} - PORT ${BotHelper.chosenProxy.port}`)

            BotHelper.userAgent = new UserAgent().random().data.userAgent;

            console.log(`🤖: User agent: ${BotHelper.userAgent}`);

            const proxiedRequest = rp.defaults({
              proxy: `http://${BotHelper.chosenProxy.ip}:${BotHelper.chosenProxy.port}`,
              strictSSL: false,
              timeout: 15000,
              headers: {
                'User-Agent': BotHelper.userAgent
              }
            });


            // console.log('TEST RESULTS');
            // const test = await proxiedRequest('https://api.ipify.org?format=json');
            // console.log(test);

            return await proxiedRequest(url);
          }
          break;

        case ProxyType.ZenScrape:

          const today = moment.tz(new Date(), process.env.TIMEZONE).format('YYYY-MM-DD[T00:00:00.000Z]');

          const zenScrapeUsedRequests = await Log.find({
            action: `ZENSCRAPE_REQUEST`,
            createdAt: { "$gte": today }
          })

          ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `🤖: (ZenScrape) - Using ZenScrape Proxy API (${zenScrapeUsedRequests}/${BotHelper.ZenScrapeDailyLimit}`)



          BotHelper.userAgent = new UserAgent().random().data.userAgent;

          console.log(`🤖: User agent: ${BotHelper.userAgent}`);

          const zenScrapeRequest = rp.defaults({
            strictSSL: false,
            timeout: 15000,
            headers: {
              'User-Agent': BotHelper.userAgent
            }
          });

          const registerZenScrapeRequest = new Log({
            action: `ZENSCRAPE_REQUEST`,
          })
          await registerZenScrapeRequest.save()

          return await zenScrapeRequest(`https://app.zenscrape.com/api/v1/get?apikey=${process.env.ZEN_SCRAPE_API_KEY}&url=` + url);

        case ProxyType.None:
          ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `🤖: (None) - 🔥 WARNING - YOU'RE NOT BEHIND A PROXY! 🔥`)
          return await rp(url);

      }
    } catch (error) {

      // Make sure we close any puppeteer open instances, on errors
      await ScrapperFacebook.clear(ScrapperFacebook.browser)

      console.log(error.message);

      throw new Error('PROXY CONNECTION FAILED!')
    }

  };

  public static fetchFreeProxyList = async () => {
    console.log('🤖: Fetching proxy list...');

    const html = await ConnectionHelper.requestHtml('https://sslproxies.org/', true)

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
        BotHelper.chosenProxy = ConnectionHelper.rotateProxy(BotHelper.proxyList);
        BotHelper.userAgent = new UserAgent().random().data.userAgent;

        // Close our browser agents to avoid memory leaks
        await ScrapperFacebook.clear(ScrapperFacebook.browser);

        await GenericHelper.sleep(BotHelper.failedRequestIntervalMs)
      }
    }


  }



}