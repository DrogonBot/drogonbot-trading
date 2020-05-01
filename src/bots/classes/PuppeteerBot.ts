import child_process from 'child_process';
import { Browser, Page } from 'puppeteer';
import { UserAgent } from 'user-agents';

import { EnvType } from '../../constants/types/env.types';
import { Post } from '../../resources/Post/post.model';
import { IPost } from '../../resources/Post/post.types';
import { ConsoleColor, ConsoleHelper } from '../../utils/ConsoleHelper';
import botsAccounts from '../data/botsAccounts.json';
import {
  FB_LOGIN_EMAIL_INPUT,
  FB_LOGIN_LOGIN_CTA,
  FB_LOGIN_PASSWORD_INPUT,
  FB_LOGIN_SKIP_SAVE_PASSWORD,
} from '../selectors/facebook.selectors';
import { IBot, IProxyItem } from '../types/bots.types';



export class PuppeteerBot {
  public static browser: Browser | null = null
  public static page: Page | null = null
  public static options: Object;

  public static clear = async (browser: Browser | null) => {
    try {
      // This function clears memory by closing puppeteer open instances

      if (browser && browser.isConnected()) {
        ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `🤖: Puppeteer: Closing opened browser instance`)

        await browser.close()
      }

      // if it stills open, force it to close!!
      if (browser && browser.isConnected()) {

        browser.on('disconnected', () => {
          console.log('sleeping 100ms'); //  sleep to eliminate race condition
          setTimeout(function () {
            console.log(`Browser Disconnected... Process Id: ${process}`);
            child_process.exec(`kill -9 ${process}`, (error, stdout, stderr) => {
              if (error) {
                console.log(`Process Kill Error: ${error}`)
              }
              console.log(`Process Kill Success. stdout: ${stdout} stderr:${stderr}`);
            });
          }, 100);
        });

      }



    }
    catch (error) {
      console.log('Failed to close scrapper browser!');
      console.error(error);
    }
  }

  public static getOptions = (proxyItem: IProxyItem, userAgent: UserAgent, extraOptions?) => {
    switch (process.env.ENV) {
      case EnvType.Development:

        console.log(`🤖: Loading Development config - NOT USING PROXY!`);
        return {
          executablePath: 'google-chrome-unstable',
          headless: true,
          args: ['--no-sandbox',
            '--disable-setuid-sandbox',
            '--no-zygote',
            '--disable-dev-shm-usage'
          ],
          ...extraOptions
        }


      case EnvType.Production:
        console.log(`🤖: Using Proxy IP: ${proxyItem.ip} on PORT: ${proxyItem.port}`);
        return {
          executablePath: 'google-chrome-unstable',
          ignoreHTTPSErrors: true,
          headless: true,
          args: ['--no-sandbox',
            '--disable-setuid-sandbox',
            '--no-zygote',
            '--disable-gpu',
            '--single-process',
            '--disable-web-security',
            '--disable-dev-profile',
            '--disable-infobars',
            '--window-position=0,0',
            '--disable-dev-shm-usage',
            '--ignore-certificate-errors',
            '--disable-notifications',
            '--disable-geolocation',
            '--disable-infobars',
            '--disable-session-crashed-bubble',
            '--ignore-certificate-errors-spki-list',
            `--proxy-server=http://${proxyItem.ip}:${proxyItem.port}`,
            `'--user-agent="${userAgent}"'`],
          ...extraOptions
        }

    }
  }

  public static getRandomDelay = () => Math.floor(Math.random() * 10)

  public static loginUserFacebook = async (bot: IBot, page: Page) => {

    try {
      await page.goto('https://m.facebook.com/login/', { waitUntil: 'networkidle2' })

      // capture page console for debugging
      page.on('console', msg => console.log('PAGE LOG:', msg.text()));

      console.log(`Logging in bot ${bot.email}...`);

      // Fill login and password

      await page.type(FB_LOGIN_EMAIL_INPUT, bot.email); // Types slower, like a user
      await page.type(FB_LOGIN_PASSWORD_INPUT, bot.password); // Types slower, like a user


      await page.click(FB_LOGIN_LOGIN_CTA);

      await page.waitForNavigation(); // it will change page, so wait

      await page.waitForSelector(FB_LOGIN_SKIP_SAVE_PASSWORD);

      await page.click(FB_LOGIN_SKIP_SAVE_PASSWORD) // do not save password button

      console.log('Finished login!');
    }
    catch (error) {
      console.log('Failed to login bot!');
      console.error(error);
    }

  }

  public static preparePostContent = (post: IPost) => {

    return `💼 VAGA: ${post.title} 💼

    ✔️ Apenas repassamos vagas! Maiores informações no link ou diretamente com anunciante ✔️
    👇 Se interessou? Aplique através do link abaixo 👇

    https://vagasempregourgente.com/posts/${post.slug}
    `

  }

  public static getRandomPost = async (stateCode: string) => {
    try {

      const popularJobPosts = await Post.find({
        stateCode,
        // jobRoles: { "$in": ['Atendente', 'Vendedor', 'Recepcionista', 'Auxiliar Administrativo', 'Administrador'] }
      })

      // select one of these popularJobPosts randomly

      const randomJobPost: IPost = popularJobPosts[Math.floor(Math.random() * popularJobPosts.length)]

      return PuppeteerBot.preparePostContent(randomJobPost)


    }
    catch (error) {
      console.error(error);
      console.log('Failed to fetch popular job posts');
    }
  }

  public static getRandomData = async (isMarketingPost: boolean) => {
    const bots: IBot[] = botsAccounts;

    const randomBot = bots[Math.floor(bots.length * Math.random())]
    const randomAvailableGroup = randomBot.availableGroups[Math.floor(randomBot.availableGroups.length * Math.random())]

    const randomGroup = randomAvailableGroup.groups[Math.floor(Math.random() * randomAvailableGroup.groups.length)]

    let post;
    // tslint:disable-next-line: prefer-conditional-expression
    if (!isMarketingPost) {
      post = randomBot.randomPosts[Math.floor(Math.random() * randomBot.randomPosts.length)]
    } else {

      // get posts from the most popular job roles only
      post = await PuppeteerBot.getRandomPost(randomAvailableGroup.stateCode)


    }


    return {
      randomBot,
      randomGroup,
      post
    }

  }


}