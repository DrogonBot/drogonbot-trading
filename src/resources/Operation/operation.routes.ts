import { Router } from 'express';

import { userAuthMiddleware } from '../../middlewares/auth.middleware';
import { UserMiddleware } from '../../middlewares/user.middleware';
import { PostScrapperHelper } from '../../scrappers/helpers/PostScrapperHelper';
import { PagePattern, ScrapperHelper } from '../../scrappers/helpers/ScrapperHelper';
import { ScrapperFacebook } from '../../scrappers/scrappers/ScrapperFacebook';
import { ScrapperOLX } from '../../scrappers/scrappers/ScrapperOLX';
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

  await ScrapperHelper.init('OLX => ES', {
    crawlLinksFunction: ScrapperOLX.crawlLinks,
    crawlPageDataFunction: ScrapperOLX.crawlPageData
  }, PagePattern.ListAndInternalPosts, "https://es.olx.com.br/vagas-de-emprego", {
    country: "Brazil",
    stateCode: "ES",

  })

  await ScrapperHelper.init('Facebook => Empregos ES', {
    crawlFeedFunction: ScrapperFacebook.crawlPageFeed
  }, PagePattern.Feed, 'https://www.facebook.com/groups/empregoses/', {
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