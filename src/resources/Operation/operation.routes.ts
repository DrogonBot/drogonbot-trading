import { Router } from 'express';

import { PostScrapperHelper } from '../../bots/helpers/PostScrapperHelper';
import { PagePattern, ScrapperBotHelper } from '../../bots/helpers/ScrapperBotHelper';
import { ScrapperFacebook } from '../../bots/scrappers/ScrapperFacebook';
import { userAuthMiddleware } from '../../middlewares/auth.middleware';
import { UserMiddleware } from '../../middlewares/user.middleware';
import { LanguageHelper } from '../../utils/LanguageHelper';
import { PostHelper } from '../../utils/PostHelper';
import { PushNotificationHelper } from '../../utils/PushNotificationHelper';
import { Log } from '../Log/log.model';
import { Post } from '../Post/post.model';
import { IJobReminder } from '../Post/post.routes';
import { User, UserType } from '../User/user.model';

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
      await PostScrapperHelper.notifyUsers(post)
    }
  }
  catch (error) {
    console.error(error);

  }

  return res.status(200).send({
    status: 'push submitted'
  })

})


operationRouter.get('/scrap', [userAuthMiddleware, UserMiddleware.restrictUserType(UserType.Admin)], async (req, res) => {


  await ScrapperBotHelper.init('Vagas e Oportunidades ES', {
    crawlFeedFunction: ScrapperFacebook.crawlPageFeed
  }, PagePattern.Feed, 'https://www.facebook.com/groups/jo.darc.13/', {
    country: "Brazil",
    stateCode: "ES",
    city: "Vitória",
  })


  await ScrapperBotHelper.init('Facebook => Emprego ES', {
    crawlFeedFunction: ScrapperFacebook.crawlPageFeed
  }, PagePattern.Feed, 'https://www.facebook.com/groups/470386613006396/', {
    country: "Brazil",
    stateCode: "ES",
    city: "Vitória",
  })



  await ScrapperBotHelper.init('Facebook => Empregos Vitoria ES', {
    crawlFeedFunction: ScrapperFacebook.crawlPageFeed
  }, PagePattern.Feed, 'https://www.facebook.com/groups/462576003935602', {
    country: "Brazil",
    stateCode: "ES",
    city: "Vitória",
  })

  await ScrapperBotHelper.init('Facebook => Gazeta Empregos ES', {
    crawlFeedFunction: ScrapperFacebook.crawlPageFeed
  }, PagePattern.Feed, 'https://www.facebook.com/groups/2143865589172147/', {
    country: "Brazil",
    stateCode: "ES",
    city: "Vitória",
  })


  await ScrapperBotHelper.init('Facebook => Empregos Vila Velha', {
    crawlFeedFunction: ScrapperFacebook.crawlPageFeed
  }, PagePattern.Feed, 'https://www.facebook.com/groups/1002682889820586/', {
    country: "Brazil",
    stateCode: "ES",
    city: "Vila Velha",
  })

  await ScrapperBotHelper.init('Facebook => Empregos Guarapari', {
    crawlFeedFunction: ScrapperFacebook.crawlPageFeed
  }, PagePattern.Feed, 'https://www.facebook.com/groups/145238849184087/', {
    country: "Brazil",
    stateCode: "ES",
    city: "Guarapari",
  })

  /*#############################################################|
  |  >>> BELO HORIZONTE
  *##############################################################*/

  await ScrapperBotHelper.init('Facebook => Vagas de Empregos BH', {
    crawlFeedFunction: ScrapperFacebook.crawlPageFeed
  }, PagePattern.Feed, 'https://www.facebook.com/groups/grupoempregosbh/', {
    country: "Brazil",
    stateCode: "MG",
    city: "Belo Horizonte",
  })

  await ScrapperBotHelper.init('Facebook => Empregos BH', {
    crawlFeedFunction: ScrapperFacebook.crawlPageFeed
  }, PagePattern.Feed, 'https://www.facebook.com/groups/597673520276895/', {
    country: "Brazil",
    stateCode: "MG",
    city: "Belo Horizonte",
  })

  await ScrapperBotHelper.init('Facebook => Empregos em Belo Horizonte', {
    crawlFeedFunction: ScrapperFacebook.crawlPageFeed
  }, PagePattern.Feed, 'https://www.facebook.com/groups/833818616764376/', {
    country: "Brazil",
    stateCode: "MG",
    city: "Belo Horizonte",
  })

  await ScrapperBotHelper.init('Facebook => Empregos Urgentes BH', {
    crawlFeedFunction: ScrapperFacebook.crawlPageFeed
  }, PagePattern.Feed, 'https://www.facebook.com/groups/empregosbhmg/', {
    country: "Brazil",
    stateCode: "MG",
    city: "Belo Horizonte",
  })

  await ScrapperBotHelper.init('Facebook => Emprego BH', {
    crawlFeedFunction: ScrapperFacebook.crawlPageFeed
  }, PagePattern.Feed, 'https://www.facebook.com/groups/557833854267297/', {
    country: "Brazil",
    stateCode: "MG",
    city: "Belo Horizonte",
  })

  await ScrapperBotHelper.init('Facebook => Melhor Emprego BH', {
    crawlFeedFunction: ScrapperFacebook.crawlPageFeed
  }, PagePattern.Feed, 'https://www.facebook.com/groups/718029571552489/', {
    country: "Brazil",
    stateCode: "MG",
    city: "Belo Horizonte",
  })



  /*#############################################################|
  |  >>> SAO PAULO
  *##############################################################*/

  await ScrapperBotHelper.init('Facebook => Empregos SP', {
    crawlFeedFunction: ScrapperFacebook.crawlPageFeed
  }, PagePattern.Feed, 'https://www.facebook.com/groups/empregosessp/', {
    country: "Brazil",
    stateCode: "SP",
    city: "São Paulo",
  })


  await ScrapperBotHelper.init('Facebook => Vagas de Empregos SP', {
    crawlFeedFunction: ScrapperFacebook.crawlPageFeed
  }, PagePattern.Feed, 'https://www.facebook.com/groups/508765489527560/', {
    country: "Brazil",
    stateCode: "SP",
    city: "São Paulo",
  })


  await ScrapperBotHelper.init('Facebook => Vagas de Empregos SP', {
    crawlFeedFunction: ScrapperFacebook.crawlPageFeed
  }, PagePattern.Feed, 'https://www.facebook.com/groups/508765489527560/', {
    country: "Brazil",
    stateCode: "SP",
    city: "São Paulo",
  })



  await ScrapperBotHelper.init('Facebook => Empregos em Osasco', {
    crawlFeedFunction: ScrapperFacebook.crawlPageFeed
  }, PagePattern.Feed, 'https://www.facebook.com/groups/252483528524808/', {
    country: "Brazil",
    stateCode: "SP",
    city: "Osasco",
  })

  await ScrapperBotHelper.init('Facebook => Empregos Marilia - SP', {
    crawlFeedFunction: ScrapperFacebook.crawlPageFeed
  }, PagePattern.Feed, 'https://www.facebook.com/groups/empregosmariliasp/', {
    country: "Brazil",
    stateCode: "SP",
    city: "Marília",
  })

  await ScrapperBotHelper.init('Facebook => Empregos Marilia SP', {
    crawlFeedFunction: ScrapperFacebook.crawlPageFeed
  }, PagePattern.Feed, 'https://www.facebook.com/groups/901278506627755/', {
    country: "Brazil",
    stateCode: "SP",
    city: "Marília",
  })

  await ScrapperBotHelper.init('Facebook => Ribeirao Preto', {
    crawlFeedFunction: ScrapperFacebook.crawlPageFeed
  }, PagePattern.Feed, 'https://www.facebook.com/groups/923149231033037/', {
    country: "Brazil",
    stateCode: "SP",
    city: "Ribeirão Preto",
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