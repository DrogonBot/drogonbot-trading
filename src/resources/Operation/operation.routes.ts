import Promise from 'bluebird';
import { Router } from 'express';
import _ from 'lodash';
import moment from 'moment-timezone';

import { PuppeteerBot } from '../../bots/classes/PuppeteerBot';
import { RECURPOST_CREDENTIALS_SP, ZOHO_SOCIAL_ES_CREDENTIALS } from '../../bots/data/loginCredentials';
import { ScrappingTargetHelper } from '../../bots/helpers/ScrappingTargetHelper';
import { WhatsAppBotHelper } from '../../bots/messengers/WhatsAppBot/WhatsappBotHelper';
import { RecurPostSocialSchedulerBot } from '../../bots/schedulers/RecurPostSocialSchedulerBot';
import { ZohoSocialSchedulerBot } from '../../bots/schedulers/ZohoSocialSchedulerBot';
import { PosterFacebook } from '../../bots/social_media/PosterFacebook';
import { userAuthMiddleware } from '../../middlewares/auth.middleware';
import { UserMiddleware } from '../../middlewares/user.middleware';
import { PostHelper } from '../../utils/PostHelper';
import { SubscriptionHelper } from '../../utils/SubscriptionHelper';
import { Log } from '../Log/log.model';
import { Post } from '../Post/post.model';
import { Subscription } from '../Subscription/subscription.model';
import { User } from '../User/user.model';
import { UserType } from '../User/user.types';
import { TelegramBotHelper } from './../../bots/messengers/TelegramBot/TelegramBotHelper';
import { NotificationHelper } from './../../utils/NotificationHelper';
import { SubscriptionStatus } from './../Subscription/subscription.types';

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

  await TelegramBotHelper.postOnGroups()

  return res.status(200).send({
    status: 'success'
  })

})


operationRouter.get('/whatsapp-bot/', [userAuthMiddleware, UserMiddleware.restrictUserType(UserType.Admin)], async (req, res) => {


  // const chatList = await WhatsAppBotHelper.request("GET", "/dialogs");


  // const { keyword } = req.query;


  // const filteredData = chatList.data.dialogs.filter((item) => item.name.toLowerCase().includes(keyword.toLowerCase()))

  // console.log(filteredData);

  await WhatsAppBotHelper.postOnGroups()







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

operationRouter.get('/subscription-fixes/', [userAuthMiddleware, UserMiddleware.restrictUserType(UserType.Admin)], async (req, res) => {

  // ObjectId("5eeb69c0425047002b814663")
  // ObjectId("5efb50ea9fa7b40173c3dc1e")
  // ObjectId("5ef3c4b8cb3860006356bb65")
  // /ObjectId("5ef2bb80d098620065eddba5")

  const userIds = ["5eeb69c0425047002b814663", "5efb50ea9fa7b40173c3dc1e", "5ef3c4b8cb3860006356bb65", "5ef2bb80d098620065eddba5"]


  // generate subscriptions

  for (const id of userIds) {
    const newSubscription = new Subscription({
      status: SubscriptionStatus.Active,
      userId: id,
      paymentType: "BOLETO",
      subscriberDays: 90
    })

    newSubscription.save();

  }

  // randomize post premium or not premium

  const posts = await Post.find({ active: true })

  for (const post of posts) {

    // decide if it will be a premium only post or not
    const n = _.random(100);

    if (n <= SubscriptionHelper.getSectorPremiumChance(post.sector)) {
      await Post.updateOne({ _id: post.id }, { premiumOnly: true })
    }


  }






});







export { operationRouter }