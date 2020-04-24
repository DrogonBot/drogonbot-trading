import puppeteer, { Page } from 'puppeteer';

import { PuppeteerBot } from '../classes/PuppeteerBot';

export class ZohoSocialSchedulerBot extends PuppeteerBot {

  public static zohoLogin = async (page: Page) => {

    console.log('🤖: Starting Zoho Login');

    await page.goto('https://accounts.zoho.com/signin?servicename=ZohoSocial', { waitUntil: 'networkidle2' })

    console.log('🤖: Typing username and password');
    await page.type('#login_id', 'admin@empregourgente.com')
    await page.waitForSelector('#nextbtn')
    await page.click('#nextbtn')
    await page.type('#password', 'abc3225ABC@@')
    await page.waitForSelector('#nextbtn')
    await page.click('#nextbtn')
    await page.waitForNavigation();

    try {
      await (await page.waitForSelector('.skip_btn[href*=Home]', { timeout: 2000 })).click()
    } catch (error) {
      console.log("🤖 No remind me later button found, skipping")
    }

    try {
      await (await page.waitForSelector('#rmLaterBtn', { timeout: 2000 })).click()
    } catch (error) {
      console.log("🤖 No remind me later button found, skipping")
    }
  }

  public static schedulePost = async (postContent: string) => {

    if (ZohoSocialSchedulerBot.browser) {
      await ZohoSocialSchedulerBot.clear(ZohoSocialSchedulerBot.browser)
    }


    ZohoSocialSchedulerBot.browser = await puppeteer.launch({
      ignoreHTTPSErrors: true,
      headless: true,
      slowMo: 50,
      timeout: 0,
      userDataDir: "./src/bots/data/zoho_session_data",
      args: [
        '--start-maximized',
        "--no-sandbox",
        "--disable-setuid-sandbox",
        '--no-zygote',
        '--disable-dev-shm-usage',
      ]
    })
    const browser = ZohoSocialSchedulerBot.browser;

    ZohoSocialSchedulerBot.page = await browser.newPage();
    const page = ZohoSocialSchedulerBot.page;
    await page.setViewport({ width: 1366, height: 768 });
    page.setDefaultNavigationTimeout(0);


    await page.goto('https://accounts.zoho.com/signin?servicename=ZohoSocial', { waitUntil: 'networkidle2' })

    const needsLogin = await page.$('#login_id') // if this input is found (if Zoho does not redirect us automatically to the dashboard), it means we should login!
    if (needsLogin) {
      console.log('🤖: User needs login...');
      await ZohoSocialSchedulerBot.zohoLogin(page)
    }


    // Goto dashboard
    console.log('🤖: Accessing dashboard');
    await page.goto('https://social.zoho.com/social/empregourgentecom/915797000000018019/Home.do#home', { waitUntil: 'networkidle2' })


    // Publishing
    console.log('🤖: Clicking on blue Publish CTA');
    await page.waitForSelector('.newPostBtn-primary')
    await page.click('.newPostBtn-primary')

    console.log('🤖: Typing post content');
    await page.waitForSelector('.postInput');
    await page.type('.postInput', postContent)

    await page.waitFor(10000)

    console.log('🤖: Scheduling post');
    await (await page.waitForSelector('[onclick*=customq]')).click();
    await page.click("[onclick*=publish_postnow]")



    await page.waitFor(4000)

    console.log('🤖: Posted!');

    if (ZohoSocialSchedulerBot.browser) {
      await ZohoSocialSchedulerBot.clear(ZohoSocialSchedulerBot.browser)
    }

  }


}