import axios from 'axios';
import { Router } from 'express';
import moment from 'moment-timezone';
import mailjet from 'node-mailjet';
import SibApiV3Sdk from 'sib-api-v3-sdk';

import { PuppeteerBot } from '../../bots/classes/PuppeteerBot';
import { ZOHO_SOCIAL_ES_CREDENTIALS, ZOHO_SOCIAL_SP_CREDENTIALS } from '../../bots/data/loginCredentials';
import { BotHelper } from '../../bots/helpers/BotHelper';
import { PostScrapperHelper } from '../../bots/helpers/PostScrapperHelper';
import { PosterFacebook } from '../../bots/posters/PosterFacebook';
import { ZohoSocialSchedulerBot } from '../../bots/schedulers/ZohoSocialSchedulerBot';
import { ScrapperFacebook } from '../../bots/scrappers/ScrapperFacebook';
import { ScrapperOLX } from '../../bots/scrappers/ScrapperOLX';
import { PagePattern } from '../../bots/types/bots.types';
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

  switch (target) {

    case "es":

      await BotHelper.initScrapper('OLX => ES', {
        crawlLinksFunction: ScrapperOLX.crawlLinks,
        crawlPageDataFunction: ScrapperOLX.crawlPageData
      }, PagePattern.ListAndInternalPosts, "https://es.olx.com.br/vagas-de-emprego?sf=1", {
        country: "Brazil",
        stateCode: "ES",
      })

      await BotHelper.initScrapper('OLX => Vitoria', {
        crawlLinksFunction: ScrapperOLX.crawlLinks,
        crawlPageDataFunction: ScrapperOLX.crawlPageData
      }, PagePattern.ListAndInternalPosts, "https://es.olx.com.br/norte-do-espirito-santo/vitoria/vagas-de-emprego?sf=1", {
        country: "Brazil",
        stateCode: "ES",
        city: "Vitória"
      })

      await BotHelper.initScrapper('OLX => Vila Velha', {
        crawlLinksFunction: ScrapperOLX.crawlLinks,
        crawlPageDataFunction: ScrapperOLX.crawlPageData
      }, PagePattern.ListAndInternalPosts, "https://es.olx.com.br/norte-do-espirito-santo/vila-velha/vagas-de-emprego?sf=1", {
        country: "Brazil",
        stateCode: "ES",
        city: "Vila Velha"
      })

      await BotHelper.initScrapper('OLX => Serra', {
        crawlLinksFunction: ScrapperOLX.crawlLinks,
        crawlPageDataFunction: ScrapperOLX.crawlPageData
      }, PagePattern.ListAndInternalPosts, "https://es.olx.com.br/norte-do-espirito-santo/outras-cidades/serra/vagas-de-emprego?sf=1", {
        country: "Brazil",
        stateCode: "ES",
        city: "Serra"
      })


      // ESPIRITO SANTO ========================================

      await BotHelper.initScrapper('Facebook => Empregos ES', {
        crawlFeedFunction: ScrapperFacebook.crawlPageFeed
      }, PagePattern.Feed, 'https://www.facebook.com/groups/empregoses/', {
        country: "Brazil",
        stateCode: "ES",
        city: "Vitória",
      })

      await BotHelper.initScrapper('Facebook => Emprego Urgente ES', {
        crawlFeedFunction: ScrapperFacebook.crawlPageFeed
      }, PagePattern.Feed, 'https://www.facebook.com/groups/255725088176388', {
        country: "Brazil",
        stateCode: "ES",
        city: "Vitória",
      })

      await BotHelper.initScrapper('Facebook => Empregos e Vagas Espirito Santo', {
        crawlFeedFunction: ScrapperFacebook.crawlPageFeed
      }, PagePattern.Feed, 'https://www.facebook.com/groups/958646364179986/', {
        country: "Brazil",
        stateCode: "ES",
        city: "Vitória",
      })


      break;

    case "sp":

      await BotHelper.initScrapper('OLX => SP/CAPITAL', {
        crawlLinksFunction: ScrapperOLX.crawlLinks,
        crawlPageDataFunction: ScrapperOLX.crawlPageData
      }, PagePattern.ListAndInternalPosts, "https://sp.olx.com.br/vagas-de-emprego", {
        country: "Brazil",
        stateCode: "SP",
        city: "São Paulo"
      })
      await BotHelper.initScrapper('OLX => SP/Guarulhos', {
        crawlLinksFunction: ScrapperOLX.crawlLinks,
        crawlPageDataFunction: ScrapperOLX.crawlPageData
      }, PagePattern.ListAndInternalPosts, "https://sp.olx.com.br/sao-paulo-e-regiao/outras-cidades/guarulhos/vagas-de-emprego", {
        country: "Brazil",
        stateCode: "SP",
        city: "Guarulhos"
      })

      await BotHelper.initScrapper('OLX => SP/Campinas', {
        crawlLinksFunction: ScrapperOLX.crawlLinks,
        crawlPageDataFunction: ScrapperOLX.crawlPageData
      }, PagePattern.ListAndInternalPosts, "https://sp.olx.com.br/grande-campinas/vagas-de-emprego", {
        country: "Brazil",
        stateCode: "SP",
        city: "Campinas"
      })

      await BotHelper.initScrapper('Facebook => Grupo Vagas de Emprego Sao Paulo SP', {
        crawlFeedFunction: ScrapperFacebook.crawlPageFeed
      }, PagePattern.Feed, 'https://www.facebook.com/groups/grupovagasdeempregosaopaulo', {
        country: "Brazil",
        stateCode: "SP",
        city: "São Paulo",
      })

      await BotHelper.initScrapper('Facebook => SP EMPREGO SAO PAULO ', {
        crawlFeedFunction: ScrapperFacebook.crawlPageFeed
      }, PagePattern.Feed, 'https://www.facebook.com/groups/Temostrampo/', {
        country: "Brazil",
        stateCode: "SP",
        city: "São Paulo",
      })

      await BotHelper.initScrapper('Facebook => Grupo Vagas de Emprego Sao Paulo - SP', {
        crawlFeedFunction: ScrapperFacebook.crawlPageFeed
      }, PagePattern.Feed, 'https://www.facebook.com/groups/grupovagasdeempregosaopaulosp/', {
        country: "Brazil",
        stateCode: "SP",
        city: "São Paulo",
      })

      await BotHelper.initScrapper('Facebook => Grupo Vagas de Emprego Sao Paulo - SP', {
        crawlFeedFunction: ScrapperFacebook.crawlPageFeed
      }, PagePattern.Feed, 'https://www.facebook.com/groups/508765489527560/', {
        country: "Brazil",
        stateCode: "SP",
        city: "São Paulo",
      })
      break;

    case "mg":

      /*#############################################################|
          |  >>> BELO HORIZONTE
          *##############################################################*/

      await BotHelper.initScrapper('OLX => MG/BH', {
        crawlLinksFunction: ScrapperOLX.crawlLinks,
        crawlPageDataFunction: ScrapperOLX.crawlPageData
      }, PagePattern.ListAndInternalPosts, "https://mg.olx.com.br/belo-horizonte-e-regiao/vagas-de-emprego", {
        country: "Brazil",
        stateCode: "MG",
      })

      await BotHelper.initScrapper('OLX => MG/BH', {
        crawlLinksFunction: ScrapperOLX.crawlLinks,
        crawlPageDataFunction: ScrapperOLX.crawlPageData
      }, PagePattern.ListAndInternalPosts, "https://mg.olx.com.br/belo-horizonte-e-regiao/vagas-de-emprego", {
        country: "Brazil",
        stateCode: "MG",
        city: "Belo Horizonte"
      })

      await BotHelper.initScrapper('OLX => MG/Uberlandia', {
        crawlLinksFunction: ScrapperOLX.crawlLinks,
        crawlPageDataFunction: ScrapperOLX.crawlPageData
      }, PagePattern.ListAndInternalPosts, "https://mg.olx.com.br/regiao-de-uberlandia-e-uberaba/triangulo-mineiro/uberlandia/vagas-de-emprego", {
        country: "Brazil",
        stateCode: "MG",
        city: "Uberlândia"
      })


      await BotHelper.initScrapper('OLX => MG/Uberlandia', {
        crawlLinksFunction: ScrapperOLX.crawlLinks,
        crawlPageDataFunction: ScrapperOLX.crawlPageData
      }, PagePattern.ListAndInternalPosts, "https://mg.olx.com.br/regiao-de-uberlandia-e-uberaba/triangulo-mineiro/uberlandia/vagas-de-emprego", {
        country: "Brazil",
        stateCode: "MG",
        city: "Uberlândia"
      })

      await BotHelper.initScrapper('OLX => MG/Contagem', {
        crawlLinksFunction: ScrapperOLX.crawlLinks,
        crawlPageDataFunction: ScrapperOLX.crawlPageData
      }, PagePattern.ListAndInternalPosts, "https://mg.olx.com.br/belo-horizonte-e-regiao/grande-belo-horizonte/contagem/vagas-de-emprego", {
        country: "Brazil",
        stateCode: "MG",
        city: "Contagem"
      })

      await BotHelper.initScrapper('OLX => MG/Juiz de Fora', {
        crawlLinksFunction: ScrapperOLX.crawlLinks,
        crawlPageDataFunction: ScrapperOLX.crawlPageData
      }, PagePattern.ListAndInternalPosts, "https://mg.olx.com.br/regiao-de-juiz-de-fora/vagas-de-emprego", {
        country: "Brazil",
        stateCode: "MG",
        city: "Juiz de Fora"
      })

      await BotHelper.initScrapper('OLX => MG/Betim', {
        crawlLinksFunction: ScrapperOLX.crawlLinks,
        crawlPageDataFunction: ScrapperOLX.crawlPageData
      }, PagePattern.ListAndInternalPosts, "https://mg.olx.com.br/belo-horizonte-e-regiao/grande-belo-horizonte/betim/vagas-de-emprego", {
        country: "Brazil",
        stateCode: "MG",
        city: "Juiz de Fora"
      })

      /*#############################################################|
      |  >>> BELO HORIZONTE
      *##############################################################*/

      await BotHelper.initScrapper('Facebook => Vagas de Empregos BH', {
        crawlFeedFunction: ScrapperFacebook.crawlPageFeed
      }, PagePattern.Feed, 'https://www.facebook.com/groups/grupoempregosbh/', {
        country: "Brazil",
        stateCode: "MG",
        city: "Belo Horizonte",
      })

      await BotHelper.initScrapper('Facebook => Empregos BH', {
        crawlFeedFunction: ScrapperFacebook.crawlPageFeed
      }, PagePattern.Feed, 'https://www.facebook.com/groups/597673520276895/', {
        country: "Brazil",
        stateCode: "MG",
        city: "Belo Horizonte",
      })

      await BotHelper.initScrapper('Facebook => Empregos em Belo Horizonte', {
        crawlFeedFunction: ScrapperFacebook.crawlPageFeed
      }, PagePattern.Feed, 'https://www.facebook.com/groups/833818616764376/', {
        country: "Brazil",
        stateCode: "MG",
        city: "Belo Horizonte",
      })

      await BotHelper.initScrapper('Facebook => Empregos Urgentes BH', {
        crawlFeedFunction: ScrapperFacebook.crawlPageFeed
      }, PagePattern.Feed, 'https://www.facebook.com/groups/empregosbhmg/', {
        country: "Brazil",
        stateCode: "MG",
        city: "Belo Horizonte",
      })

      await BotHelper.initScrapper('Facebook => Emprego BH', {
        crawlFeedFunction: ScrapperFacebook.crawlPageFeed
      }, PagePattern.Feed, 'https://www.facebook.com/groups/557833854267297/', {
        country: "Brazil",
        stateCode: "MG",
        city: "Belo Horizonte",
      })

      await BotHelper.initScrapper('Facebook => Melhor Emprego BH', {
        crawlFeedFunction: ScrapperFacebook.crawlPageFeed
      }, PagePattern.Feed, 'https://www.facebook.com/groups/718029571552489/', {
        country: "Brazil",
        stateCode: "MG",
        city: "Belo Horizonte",
      })
      await BotHelper.initScrapper('Facebook => Empregos de A&Z Extrema-MG e regiao', {
        crawlFeedFunction: ScrapperFacebook.crawlPageFeed
      }, PagePattern.Feed, 'https://www.facebook.com/groups/963229973714703/', {
        country: "Brazil",
        stateCode: "MG",
        city: "Extrema",
      })

      await BotHelper.initScrapper('Facebook => Balcao de empregos - Betim MG', {
        crawlFeedFunction: ScrapperFacebook.crawlPageFeed
      }, PagePattern.Feed, 'https://www.facebook.com/groups/1641409356177065/', {
        country: "Brazil",
        stateCode: "MG",
        city: "Betim",
      })

      await BotHelper.initScrapper('Facebook => Cambui - MG', {
        crawlFeedFunction: ScrapperFacebook.crawlPageFeed
      }, PagePattern.Feed, 'https://www.facebook.com/groups/838499019528802', {
        country: "Brazil",
        stateCode: "MG",
        city: "Cambuí",
      })

      break;
  }






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