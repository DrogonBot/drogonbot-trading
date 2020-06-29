import Promise from 'bluebird';
import { Router } from 'express';
import _ from 'lodash';
import moment from 'moment-timezone';
import TelegramBot from 'node-telegram-bot-api';

import { PuppeteerBot } from '../../bots/classes/PuppeteerBot';
import { RECURPOST_CREDENTIALS_SP, ZOHO_SOCIAL_ES_CREDENTIALS } from '../../bots/data/loginCredentials';
import { ScrappingTargetHelper } from '../../bots/helpers/ScrappingTargetHelper';
import { PosterFacebook } from '../../bots/posters/PosterFacebook';
import { RecurPostSocialSchedulerBot } from '../../bots/schedulers/RecurPostSocialSchedulerBot';
import { ZohoSocialSchedulerBot } from '../../bots/schedulers/ZohoSocialSchedulerBot';
import { userAuthMiddleware } from '../../middlewares/auth.middleware';
import { UserMiddleware } from '../../middlewares/user.middleware';
import { ITelegramChannel } from '../../typescript/telegrambot.types';
import { ConsoleColor, ConsoleHelper } from '../../utils/ConsoleHelper';
import { PostHelper } from '../../utils/PostHelper';
import { Log } from '../Log/log.model';
import { Post } from '../Post/post.model';
import { User } from '../User/user.model';
import { UserType } from '../User/user.types';
import { EnvType } from './../../constants/types/env.types';
import { GenericHelper } from './../../utils/GenericHelper';
import { NotificationHelper } from './../../utils/NotificationHelper';
import { WhatsAppBotHelper } from './../../utils/WhatsAppBot/WhatsappBotHelper';

// Fix Telegram bot promise issue: https://github.com/benjick/meteor-telegram-bot/issues/37#issuecomment-389669310
Promise.config({
  cancellation: true
});

// @ts-ignore
const operationRouter = new Router();


/*#############################################################|
|  >>> TEST AND OPERATIONS ROUTES!
*##############################################################*/

operationRouter.get('/slug', [userAuthMiddleware, UserMiddleware.restrictUserType(UserType.Admin)], async (req, res) => {

  // query posts that does not contain the slug field
  const posts = await Post.find({ slug: null, active: true })

  for (const post of posts) {

    post.slug = PostHelper.generateTitleSlug(post.title)
    await post.save();

  }

  return res.status(200).send({
    status: 'Slugs updated!!'
  })


})

operationRouter.get('/push', [userAuthMiddleware, UserMiddleware.restrictUserType(UserType.Admin)], async (req, res) => {

  const { jobId } = req.query;

  console.log(`Submitting push regarding jobId=${jobId}`);

  try {
    const post = await Post.findOne({
      _id: jobId,
      active: true
    })

    if (post) {
      await NotificationHelper.notifyUsersPushNotification(post)
    }
  }
  catch (error) {
    console.error(error);

  }

  return res.status(200).send({
    status: 'push submitted'
  })

})

operationRouter.get('/fb-poster', [userAuthMiddleware, UserMiddleware.restrictUserType(UserType.Admin)], async (req, res) => {

  PosterFacebook.triggerMarketingPost()

  return res.status(200).send({
    status: 'ok'
  })
});

operationRouter.get('/scheduler', [userAuthMiddleware, UserMiddleware.restrictUserType(UserType.Admin)], async (req, res) => {

  // const randomPostMG = await PuppeteerBot.getRandomPost("MG")
  // if (randomPostMG) {
  //   await RecurPostSocialSchedulerBot.schedulePost("MG", RECURPOST_CREDENTIALS_MG, randomPostMG);
  // }

  // await GenericHelper.sleep(60 * 1000 * 3)




  // await GenericHelper.sleep(60 * 1000 * 3)


  const randomPostSP = await PuppeteerBot.getRandomPost("SP")
  if (randomPostSP) {
    await RecurPostSocialSchedulerBot.schedulePost("SP", RECURPOST_CREDENTIALS_SP, randomPostSP);
  }

  // await GenericHelper.sleep(60 * 1000 * 3)

  // const randomPostSP = await PuppeteerBot.getRandomPost("SP")
  // if (randomPostSP) {
  //   await ZohoSocialSchedulerBot.schedulePost("SP", ZOHO_SOCIAL_SP_CREDENTIALS, randomPostSP);
  // }

  // await GenericHelper.sleep(60 * 1000 * 3)

  // const randomPostMG = await PuppeteerBot.getRandomPost("MG")
  // if (randomPostMG) {
  //   await RecurPostSocialSchedulerBot.schedulePost("MG", RECURPOST_CREDENTIALS_MG, randomPostMG);
  // }

  const randomPostES = await PuppeteerBot.getRandomPost("ES")
  if (randomPostES) {
    await ZohoSocialSchedulerBot.schedulePost("ES", ZOHO_SOCIAL_ES_CREDENTIALS, randomPostES);
  }

  // await GenericHelper.sleep(60 * 1000 * 3)


  return res.status(200).send({
    status: 'ok'
  })

});
operationRouter.get('/logs', [userAuthMiddleware, UserMiddleware.restrictUserType(UserType.Admin)], async (req, res) => {


  const nowInVancouver = moment.tz(new Date(), 'America/Vancouver').format('YYYY-MM-DD[T00:00:00.000Z]');

  console.log(nowInVancouver);

  const providerEmailsToday = await Log.find({
    action: `SENDGRID_EMAIL_SUBMISSION`,
    createdAt: { $gte: nowInVancouver }
  })







  return res.status(200).send({
    count: providerEmailsToday.length
  })

})

operationRouter.get('/report', async (req, res) => {

  await NotificationHelper.generateJobReport()

  return res.status(200).send({
    status: 'report generated'
  })

})

operationRouter.get('/job-notification', [userAuthMiddleware, UserMiddleware.restrictUserType(UserType.Admin)], async (req, res) => {

  try {
    const user = await User.findOne({ email: "admin@empregourgente.com" })
    const post = await Post.findOne({
      jobRoles: {
        $in: ['Representante']
      },
      active: true
    })

    if (!post) {
      return res.status(200).send({
        status: 'error',
        message: 'Post not found! Please, double check the post slug.'
      })
    }



    if (user && post) {
      await NotificationHelper.notifyUsersEmail(user, post);
    }
  }
  catch (error) {
    console.error(error);

  }

  return res.status(200).send({
    status: 'ok'
  })



});


operationRouter.get('/scrap', [userAuthMiddleware, UserMiddleware.restrictUserType(UserType.Admin)], async (req, res) => {

  const { target, source, name } = req.query;

  const results = ScrappingTargetHelper.getScrappingTargetList(false, true, target, source, name);

  await ScrappingTargetHelper.startScrappers(results);

  return res.status(200).send({
    'status': 'ok'
  })

});


operationRouter.get('/telegram-bot/', [userAuthMiddleware, UserMiddleware.restrictUserType(UserType.Admin)], async (req, res) => {

  const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN || "");

  if (bot.isPolling()) {
    await bot.stopPolling()
  }

  let telegramChannels: ITelegramChannel[] = [
    {
      stateCode: "ES",
      city: "all",
      chatId: '@empregourgentetest'
    },
    {
      stateCode: "RJ",
      city: "Rio de Janeiro",
      chatId: "@empregourgentetest"
    },
    // {
    //   stateCode: "MG",
    //   city: "Belo Horizonte",
    //   chatId: '@empregourgenteMGc'
    // },
    // {
    //   stateCode: "SP",
    //   city: "São Paulo",
    //   chatId: "@empregourgenteSPc"
    // },
  ]

  telegramChannels = _.shuffle(telegramChannels)

  try {
    for (const channel of telegramChannels) {


      // fetch related posts
      const query: { stateCode: string, city?: string } = {
        stateCode: channel.stateCode
      }
      if (channel.city !== "all") {
        query.city = channel.city
      }

      const posts = await Post.find({
        ...query,
        $or: [{ isPostedOnTelegram: { $exists: false } }, { isPostedOnTelegram: { $exists: true, $eq: false } }]
      }).limit(10).sort({ 'createdAt': 'descending' })

      ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `🤖: Publishing ${posts.length} posts on channel: ${channel.stateCode}/${channel.city}`)

      // now start looping through posts...

      await bot.startPolling();
      for (const post of posts) {

        const postTitle = post.title.length >= 35 ? post.title.substr(0, 35) + "..." : post.title
        const content = `
          👇 ${postTitle} 👇
          https://empregourgente.com/posts/${post.slug}
          `
        const msg = await bot.sendMessage(channel.chatId, content)
        console.log(msg);

        if (process.env.ENV === EnvType.Production) {
          post.isPostedOnTelegram = true;
          await post.save()
        }


        await GenericHelper.sleep(3000);
      }
      await bot.stopPolling();
    }

    ConsoleHelper.coloredLog(ConsoleColor.BgGreen, ConsoleColor.FgWhite, '🤖: Finished posting on Telegram Groups!')

    return res.status(200).send({
      status: 'success'
    })


  }
  catch (error) {
    console.error(error);
    return res.status(200).send({
      status: 'error'
    })
  }




})

operationRouter.get('/whatsapp-bot/', [userAuthMiddleware, UserMiddleware.restrictUserType(UserType.Admin)], async (req, res) => {


  const chatList = await WhatsAppBotHelper.request("GET", "/dialogs");


  const filteredData = chatList.data.dialogs.filter((item) => item.name.includes('Empregos RJ'))

  console.log(filteredData);

  // await WhatsAppBotHelper.postOnGroups()







  return res.status(200).send({
    status: 'success'
  })


})

operationRouter.get('/whatsapp-is-posted/', [userAuthMiddleware, UserMiddleware.restrictUserType(UserType.Admin)], async (req, res) => {

  const posts = await Post.find({})

  for (const post of posts) {
    post.isPostedOnWhatsApp = true;
    await post.save();
  }







  return res.status(200).send({
    status: 'success'
  })


})







export { operationRouter }