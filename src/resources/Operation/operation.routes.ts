import axios from 'axios';
import { Router } from 'express';

import { PuppeteerBot } from '../../bots/classes/PuppeteerBot';
import { BotHelper } from '../../bots/helpers/BotHelper';
import { PostScrapperHelper } from '../../bots/helpers/PostScrapperHelper';
import { RecurPostSocialSchedulerBot } from '../../bots/schedulers/RecurPostSocialSchedulerBot';
import { ScrapperFacebook } from '../../bots/scrappers/ScrapperFacebook';
import { ScrapperOLX } from '../../bots/scrappers/ScrapperOLX';
import { PagePattern } from '../../bots/types/bots.types';
import { userAuthMiddleware } from '../../middlewares/auth.middleware';
import { UserMiddleware } from '../../middlewares/user.middleware';
import { ConsoleColor, ConsoleHelper } from '../../utils/ConsoleHelper';
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

operationRouter.get('/poster', [userAuthMiddleware, UserMiddleware.restrictUserType(UserType.Admin)], async (req, res) => {

  // schedule a random post
  const randomPost = await PuppeteerBot.getRandomPost("SP")
  if (randomPost) {
    // await ZohoSocialSchedulerBot.schedulePost(randomPost)
    await RecurPostSocialSchedulerBot.schedulePost(randomPost);
  }

  return res.status(200).send({
    status: 'ok'
  })

});

operationRouter.get('/scrap', [userAuthMiddleware, UserMiddleware.restrictUserType(UserType.Admin)], async (req, res) => {

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

  await BotHelper.initScrapper('OLX => Cariacica', {
    crawlLinksFunction: ScrapperOLX.crawlLinks,
    crawlPageDataFunction: ScrapperOLX.crawlPageData
  }, PagePattern.ListAndInternalPosts, "https://es.olx.com.br/norte-do-espirito-santo/outras-cidades/cariacica/vagas-de-emprego?f=p&sf=1", {
    country: "Brazil",
    stateCode: "ES",
    city: "Cariacica"
  })



  await BotHelper.initScrapper('OLX => SP/CAPITAL', {
    crawlLinksFunction: ScrapperOLX.crawlLinks,
    crawlPageDataFunction: ScrapperOLX.crawlPageData
  }, PagePattern.ListAndInternalPosts, "https://sp.olx.com.br/vagas-de-emprego", {
    country: "Brazil",
    stateCode: "SP",

  })


  await BotHelper.initScrapper('OLX => MG/BH', {
    crawlLinksFunction: ScrapperOLX.crawlLinks,
    crawlPageDataFunction: ScrapperOLX.crawlPageData
  }, PagePattern.ListAndInternalPosts, "https://mg.olx.com.br/belo-horizonte-e-regiao/vagas-de-emprego", {
    country: "Brazil",
    stateCode: "MG",

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