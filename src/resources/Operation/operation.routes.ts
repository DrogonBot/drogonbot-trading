import { Router } from 'express';
import _ from 'lodash';
import moment from 'moment-timezone';
import mailjet from 'node-mailjet';
import TelegramBot from 'node-telegram-bot-api';
import SibApiV3Sdk from 'sib-api-v3-sdk';

import { PuppeteerBot } from '../../bots/classes/PuppeteerBot';
import { RECURPOST_CREDENTIALS_SP, ZOHO_SOCIAL_ES_CREDENTIALS } from '../../bots/data/loginCredentials';
import { PostScrapperHelper } from '../../bots/helpers/PostScrapperHelper';
import { ScrappingTargetHelper } from '../../bots/helpers/ScrappingTargetHelper';
import { PosterFacebook } from '../../bots/posters/PosterFacebook';
import { RecurPostSocialSchedulerBot } from '../../bots/schedulers/RecurPostSocialSchedulerBot';
import { ZohoSocialSchedulerBot } from '../../bots/schedulers/ZohoSocialSchedulerBot';
import { userAuthMiddleware } from '../../middlewares/auth.middleware';
import { UserMiddleware } from '../../middlewares/user.middleware';
import { ITelegramChannel } from '../../typescript/telegrambot.types';
import { ConsoleColor, ConsoleHelper } from '../../utils/ConsoleHelper';
import { PostHelper } from '../../utils/PostHelper';
import { PushNotificationHelper } from '../../utils/PushNotificationHelper';
import { TS } from '../../utils/TS';
import { Log } from '../Log/log.model';
import { Post } from '../Post/post.model';
import { IJobReminder } from '../Post/post.routes';
import { User } from '../User/user.model';
import { UserType } from '../User/user.types';
import { GenericHelper } from './../../utils/GenericHelper';
import { NotificationHelper } from './../../utils/NotificationHelper';

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

operationRouter.get('/sendinblue', [userAuthMiddleware, UserMiddleware.restrictUserType(UserType.Admin)], async (req, res) => {

  const defaultClient = SibApiV3Sdk.ApiClient.instance;

  // Configure API key authorization: api-key
  const apiKey = defaultClient.authentications['api-key'];
  apiKey.apiKey = process.env.SENDINBLUE_API_KEY
  // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
  // apiKey.apiKeyPrefix['api-key'] = "Token"

  // Configure API key authorization: partner-key
  const partnerKey = defaultClient.authentications['partner-key'];
  partnerKey.apiKey = process.env.SENDINBLUE_API_KEY
  // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
  // partnerKey.apiKeyPrefix['partner-key'] = "Token"


  const apiInstance = new SibApiV3Sdk.SMTPApi();

  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.to = [{ email: process.env.ADMIN_EMAIL }]
  sendSmtpEmail.sender = { email: process.env.ADMIN_EMAIL }
  sendSmtpEmail.htmlContent = 'hello world'
  sendSmtpEmail.textContent = 'hi there'
  sendSmtpEmail.subject = 'test'

  try {
    const sendInBlueRequest = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('SendInBlue: API called successfully. Returned data: ');
    console.log(JSON.stringify(sendInBlueRequest, null, 2));

  }
  catch (error) {
    console.log('Error in SendInBlue request!');
    console.error(error);

  }


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

operationRouter.get('/mailjet', [userAuthMiddleware, UserMiddleware.restrictUserType(UserType.Admin)], async (req, res) => {




  const mailjetClient = mailjet.connect(
    process.env.MAILJET_API_KEY_PUBLIC,
    process.env.MAILJET_API_KEY_PRIVATE
  );

  try {
    await mailjetClient.post("send", { version: 'v3.1' }).request(
      {
        "Messages": [
          {
            "From": {
              "Email": "admin@empregourgente.com",
              "Name": "Mailjet Pilot"
            },
            "To": [
              {
                "Email": "admin@empregourgente.com",
                "Name": "passenger 1"
              }
            ],
            "Subject": "Your email flight plan!",
            "TextPart": "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
            "HTMLPart": "<h3>Dear passenger 1, welcome to <a href=\"https://www.mailjet.com/\">Mailjet</a>!</h3><br />May the delivery force be with you!"
          }
        ]
      }
    );
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

operationRouter.get('/admin/test', [userAuthMiddleware, UserMiddleware.restrictUserType(UserType.Admin)], async (req, res) => {

  try {
    // loop through all users with generic positions of interest
    const users = await User.find({
      "genericPositionsOfInterest": { "$gt": 0 }
    })
    for (const user of users) {

      // for each user, verify if there's a potential position of interest that he wasnt notified about yet

      let jobsReminders: IJobReminder[] = []

      for (const genericPositionOfInterest of user.genericPositionsOfInterest) {

        const positionsFound = await Post.find({ jobRoles: { "$in": [genericPositionOfInterest] }, active: true })

        console.log(`Found some jobs for ${user.name}...`);


        // loop through positions found

        for (const position of positionsFound) {
          // check the user's log
          const jobNotification = await Log.findOne({
            emitter: user._id,
            action: 'USER_JOB_NOTIFICATION',
            target: position._id
          })


          // if we haven't warned the user about this position...
          if (!jobNotification) {
            // add it to our output report
            jobsReminders = [
              ...jobsReminders,
              {
                userPush: user.pushToken,
                jobs: positionsFound
              }
            ]

            // and then add notification to our logs
            const newNotification = new Log({
              emitter: user._id,
              action: 'USER_JOB_NOTIFICATION',
              target: position._id
            })
            await newNotification.save()
          } else {
            console.log(`Skipping job notification ${jobNotification._id}`);
          }

          // now, let's submit the push notifications regarding these positions

          for (const jobReminder of jobsReminders) {

            PushNotificationHelper.sendPush([jobReminder.userPush], {
              sound: "default",
              body: TS.string('user', 'cronInactiveUserReminderText', {
                firstName: user.givenName || user.name
              }),
              data: {
                jobs: jobReminder.jobs
              }
            })



          }




        }

      }
    }

    return res.status(200).send(users)




    // then check also for resumes

    // make sure that job posts do not repeat
  }
  catch (error) {
    console.error(error);

  }

  return res.status(200).send({
    status: 'ok'
  })
})

operationRouter.get('/posts/clean/forbidden', [userAuthMiddleware, UserMiddleware.restrictUserType(UserType.Admin)], async (req, res) => {
  // Clean posts with forbidden keywords, that somehow ended up in our database
  try {
    const dbPosts = await Post.find({})

    for (const post of dbPosts) {
      if (PostScrapperHelper.checkForBannedWords(post.title) || PostScrapperHelper.checkForBannedWords(post.content)) {
        // Post is completely removed, since it's probably garbage.
        console.log(`🤖: Deleting post ${post.title}`);
        await post.remove();
      }
    }
  }
  catch (error) {
    console.error(error);
  }

  return res.status(200).send({
    status: 'ok'
  })
})

operationRouter.get('/telegram-bot/', [userAuthMiddleware, UserMiddleware.restrictUserType(UserType.Admin)], async (req, res) => {

  const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN || "");

  if (bot.isPolling()) {
    await bot.stopPolling();
  }

  let telegramChannels: ITelegramChannel[] = [
    {
      stateCode: "ES",
      city: "all",
      chatId: '@empregourgenteESc'
    },
    {
      stateCode: "RJ",
      city: "Rio de Janeiro",
      chatId: "@empregourgenteRJc"
    },
    {
      stateCode: "MG",
      city: "Belo Horizonte",
      chatId: '@empregourgenteMGc'
    },
    {
      stateCode: "SP",
      city: "São Paulo",
      chatId: "@empregourgenteSPc"
    },
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
        ...query
      }).limit(10).sort({ 'createdAt': 'descending' })

      // now start looping through posts...

      for (const post of posts) {

        if (!post.isPostedOnTelegram) {
          await bot.startPolling();
          const msg = await bot.sendMessage(channel.chatId, `https://empregourgente.com/posts/${post.slug}`)
          console.log(msg);
          await bot.stopPolling();

        }
        post.isPostedOnTelegram = true;
        await post.save()

        await GenericHelper.sleep(3000);
      }
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


export { operationRouter }