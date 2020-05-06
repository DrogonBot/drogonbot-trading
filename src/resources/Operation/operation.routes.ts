import axios from 'axios';
import { Router } from 'express';
import moment from 'moment-timezone';
import mailjet from 'node-mailjet';
import SibApiV3Sdk from 'sib-api-v3-sdk';

import { PuppeteerBot } from '../../bots/classes/PuppeteerBot';
import { ZOHO_SOCIAL_ES_CREDENTIALS, ZOHO_SOCIAL_SP_CREDENTIALS } from '../../bots/data/loginCredentials';
import { PostScrapperHelper } from '../../bots/helpers/PostScrapperHelper';
import { ScrappingTargetHelper } from '../../bots/helpers/ScrappingTargetHelper';
import { PosterFacebook } from '../../bots/posters/PosterFacebook';
import { ZohoSocialSchedulerBot } from '../../bots/schedulers/ZohoSocialSchedulerBot';
import { userAuthMiddleware } from '../../middlewares/auth.middleware';
import { UserMiddleware } from '../../middlewares/user.middleware';
import { ConsoleColor, ConsoleHelper } from '../../utils/ConsoleHelper';
import { GenericHelper } from '../../utils/GenericHelper';
import { LanguageHelper } from '../../utils/LanguageHelper';
import { PostHelper } from '../../utils/PostHelper';
import { PushNotificationHelper } from '../../utils/PushNotificationHelper';
import { Lead } from '../Lead/lead.model';
import { Log } from '../Log/log.model';
import { Post } from '../Post/post.model';
import { IJobReminder } from '../Post/post.routes';
import { User } from '../User/user.model';
import { UserType } from '../User/user.types';



// @ts-ignore
const operationRouter = new Router();


/*#############################################################|
|  >>> TEST AND OPERATIONS ROUTES!
*##############################################################*/

operationRouter.get('/slug', [userAuthMiddleware, UserMiddleware.restrictUserType(UserType.Admin)], async (req, res) => {

  // query posts that does not contain the slug field
  const posts = await Post.find({ slug: null })

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
      _id: jobId
    })

    if (post) {
      await PostScrapperHelper.notifyUsersPushNotification(post)
    }
  }
  catch (error) {
    console.error(error);

  }

  return res.status(200).send({
    status: 'push submitted'
  })

})

operationRouter.get('/leads-add', [userAuthMiddleware, UserMiddleware.restrictUserType(UserType.Admin)], async (req, res) => {

  const response = await axios.get(`https://app-bo.firebaseio.com/.json`);

  const { leads } = response.data;

  // change BH to MG, since we need the stateCode
  leads.ptbr.mg = leads.ptbr.bh;
  delete leads.ptbr.bh;


  const states = Object.keys(leads.ptbr);

  for (const state of states) {

    for (const [key, value] of Object.entries(leads.ptbr[state])) {

      const leadInfo: any = value;
      // value is what matter to us (user data)

      // check if lead is already saved on database

      try {

        const leadExists = await Lead.exists({ email: leadInfo.email });

        if (leadExists) {
          console.log(`Skipping ${leadInfo.email} because it's already in our database`);
          continue
        }

        // define job roles

        const rawPOIs = leadInfo.position.split(',')

        let jobRolesFound: string[] = []

        // based on what the user has typed in "position" key, lets try to guess what jobRole tag he mean't
        for (let POI of rawPOIs) {
          POI = POI.trim();
          const { jobRoleBestMatch } = await PostScrapperHelper.findJobRolesAndSector(POI);
          jobRolesFound = [
            ...jobRolesFound,
            jobRoleBestMatch
          ]
        }

        ConsoleHelper.coloredLog(ConsoleColor.BgGreen, ConsoleColor.FgWhite, `🤖: Adding lead ${leadInfo.email} (${leadInfo.name}) to our database!`)

        const stateCode = state.toUpperCase()

        const newLead = new Lead({
          stateCode,
          country: "Brazil",
          email: leadInfo.email,
          name: leadInfo.name,
          jobRoles: jobRolesFound
        })
        await newLead.save()

      }
      catch (error) {
        console.error(error);

      }

    }
  }

  return res.status(200).send({
    'status': 'ok'
  })



});

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

  const randomPostSP = await PuppeteerBot.getRandomPost("SP")
  if (randomPostSP) {
    await ZohoSocialSchedulerBot.schedulePost("SP", ZOHO_SOCIAL_SP_CREDENTIALS, randomPostSP)
  }

  await GenericHelper.sleep(60 * 1000 * 3)

  const randomPostES = await PuppeteerBot.getRandomPost("ES")
  if (randomPostES) {
    await ZohoSocialSchedulerBot.schedulePost("ES", ZOHO_SOCIAL_ES_CREDENTIALS, randomPostES);
  }

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

operationRouter.get('/job-notification', [userAuthMiddleware, UserMiddleware.restrictUserType(UserType.Admin)], async (req, res) => {

  try {
    const user = await User.findOne({ email: "admin@empregourgente.com" })
    const post = await Post.findOne({
      jobRoles: {
        $in: ['Vendedor']
      }
    })



    if (user && post) {
      await PostScrapperHelper.notifyUsersEmail(user, post);
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

operationRouter.get('/garbage-posts-clean', [userAuthMiddleware, UserMiddleware.restrictUserType(UserType.Admin)], async (req, res) => {

  try {
    const posts = await Post.find({})

    for (const post of posts) {
      if (PostScrapperHelper.checkForBannedWords(post.title) || PostScrapperHelper.checkForBannedWords(post.content)) {
        console.log(`🤖: Deleting post ${post.title}`);
        await post.remove();
      }
    }

    return res.status(200).send({
      status: 'ok'
    })

  }
  catch (error) {
    console.error(error);

  }



})

operationRouter.get('/scrap', [userAuthMiddleware, UserMiddleware.restrictUserType(UserType.Admin)], async (req, res) => {

  const { target } = req.query;

  const results = ScrappingTargetHelper.getScrappingTargetList(true, target);

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

        const positionsFound = await Post.find({ jobRoles: { "$in": [genericPositionOfInterest] } })

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
              body: LanguageHelper.getLanguageString('user', 'cronInactiveUserReminderText', {
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



export { operationRouter }