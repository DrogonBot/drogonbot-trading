import Promise from 'bluebird';
import { Router } from 'express';

import { PuppeteerBot } from '../../classes/bots/classes/PuppeteerBot';
import { RECURPOST_CREDENTIALS_SP, ZOHO_SOCIAL_ES_CREDENTIALS } from '../../classes/bots/data/loginCredentials';
import { ScrappingTargetHelper } from '../../classes/bots/helpers/ScrappingTargetHelper';
import { TelegramBotHelper } from '../../classes/bots/messengers/TelegramBot/TelegramBotHelper';
import { WhatsAppBotHelper } from '../../classes/bots/messengers/WhatsAppBot/WhatsappBotHelper';
import { RecurPostSocialSchedulerBot } from '../../classes/bots/schedulers/RecurPostSocialSchedulerBot';
import { ZohoSocialSchedulerBot } from '../../classes/bots/schedulers/ZohoSocialSchedulerBot';
import { PosterFacebook } from '../../classes/bots/social_media/PosterFacebook';
import { PagSeguro } from '../../classes/payment/Pagseguro/Pagseguro';
import { userAuthMiddleware } from '../../middlewares/auth.middleware';
import { UserMiddleware } from '../../middlewares/user.middleware';
import { PostHelper } from '../../utils/PostHelper';
import { Post } from '../Post/post.model';
import { User } from '../User/user.model';
import { UserType } from '../User/user.types';
import { NotificationHelper } from './../../utils/NotificationHelper';
import {
  SUBSCRIPTION_DESCRIPTION,
  SUBSCRIPTION_PRICE,
  SUBSCRIPTION_REFERENCE,
} from './../Subscription/subscription.constant';


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


operationRouter.get('/pagseguro/checkout/test', [userAuthMiddleware, UserMiddleware.restrictUserType(UserType.Admin)], async (req, res) => {

  const { buyerName, buyerCPF, buyerEmail, buyerCity, buyerState, buyerPostalCode, buyerStreet, buyerNumber, buyerNeighborhood } = req.body;

  const user = req.user;

  const pagseguro = new PagSeguro()

  const response = await pagseguro.generateBoletoCharge(user._id, SUBSCRIPTION_REFERENCE, SUBSCRIPTION_DESCRIPTION, SUBSCRIPTION_PRICE * 100, buyerName, buyerCPF, buyerEmail, buyerState, buyerCity, buyerPostalCode, buyerStreet, buyerNumber, buyerNeighborhood);

  console.log(response.data);


  return res.status(200).send({
    status: "success"
  })


})

operationRouter.get('/subscription-disable-premium-posts/', [userAuthMiddleware, UserMiddleware.restrictUserType(UserType.Admin)], async (req, res) => {


  const posts = await Post.find({ premiumOnly: true })

  console.log(`${posts.length} found`);

  for (const post of posts) {
    post.premiumOnly = false;
    await post.save();
  }




  return res.status(200).send({
    status: 'success'
  })


})


operationRouter.get('/disable-olx-posts/', [userAuthMiddleware, UserMiddleware.restrictUserType(UserType.Admin)], async (req, res) => {


  const posts = await Post.find({ source: "OLX", active: true })

  console.log(`${posts.length} found`);

  for (const post of posts) {
    post.active = false
    await post.save();
  }




  return res.status(200).send({
    status: 'success'
  })


})


export { operationRouter }