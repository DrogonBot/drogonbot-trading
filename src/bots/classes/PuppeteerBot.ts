import child_process from 'child_process';
import _ from 'lodash';
import { Browser, Page } from 'puppeteer';
import { UserAgent } from 'user-agents';

import { EnvType } from '../../constants/types/env.types';
import { Post } from '../../resources/Post/post.model';
import { IPost } from '../../resources/Post/post.types';
import { ConsoleColor, ConsoleHelper } from '../../utils/ConsoleHelper';
import botsAccounts from '../data/botsAccounts.json';
import { IBot, IProxyItem } from '../types/bots.types';


export class PuppeteerBot {
  public static browser: Browser | null = null
  public static page: Page | null = null
  public static options: Object;

  public static clear = async (browser: Browser | null) => {
    try {

      // This function clears memory by closing puppeteer open instances

      if (browser && browser.isConnected()) {

        for (const browserPage of await browser.pages()) {
          await browserPage.close();
        }

        ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `🤖: Puppeteer: Closing opened browser and pages instances`)

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

  public static getOptions = (proxyItem: IProxyItem | null, userAgent: UserAgent, extraOptions?) => {
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

        const proxyString = proxyItem ? `--proxy-server=http://${proxyItem.ip}:${proxyItem.port}` : ''


        if (proxyItem) {
          console.log(`🤖: Using Proxy IP: ${proxyItem.ip} on PORT: ${proxyItem.port}`);
        }
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
            proxyString,
            `'--user-agent="${userAgent}"'`],
          ...extraOptions
        }

    }
  }

  public static getRandomDelay = () => Math.floor(Math.random() * 10)



  public static preparePostContent = (post: IPost) => {

    if (post) {

      const titleVariations = [
        `💼 VAGA: ${post.title} 💼`,
        `💼 ${post.title} 💼`,
        `👨‍💼 CONTRATA-SE: ${post.title} 👨‍💼`,
        `📰 Nova vaga: ${post.title} 📰`,
        `💼 Cargo: ${post.title} 💼`
      ]
      const bodyVariations = [
        `✔️ Apenas repassamos vagas! Mais informações no link ou diretamente com anunciante ✔️
      👇 Se interessou? Aplique através do link abaixo 👇`,
        `🔗 Clique no link abaixo para mais informações 🔗
      ✔️ Apenas repassamos vagas! Processo de contratação apenas com a empresa do post ✔️`
      ]

      const chosenTitle = _.sample(titleVariations)
      const chosenBody = _.sample(bodyVariations)

      return `${chosenTitle}

    ${chosenBody}

    https://vagasempregourgente.com/posts/${post.slug}
    `
    }

    return null

  }

  public static getRandomPost = async (stateCode: string) => {
    try {

      const popularJobPosts = await Post.find({
        stateCode,
        active: true
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

    console.log('Initializing MARKETING posting with...');
    console.log(randomBot.name);
    console.log(randomGroup);
    console.log(randomAvailableGroup);
    console.log(randomAvailableGroup.stateCode);

    console.log(post);


    return {
      randomBot,
      randomGroup,
      post
    }

  }


}