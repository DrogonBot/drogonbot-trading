import _ from 'lodash';
import moment from 'moment-timezone';

import { BotHelper } from '../bots/helpers/BotHelper';
import { Lead } from '../resources/Lead/lead.model';
import { Post } from '../resources/Post/post.model';
import { IPost } from '../resources/Post/post.types';
import { User } from '../resources/User/user.model';
import { IReportItem } from '../typescript/report.types';
import { GenericHelper } from './GenericHelper';
import { LanguageHelper } from './LanguageHelper';
import { PushNotificationHelper } from './PushNotificationHelper';


export class NotificationHelper {

  public static notifyUsersPushNotification = async (post: IPost) => {

    const jobRole = post.jobRoles[0] // on this situation, the post only have 1 jobRole (was just added)

    try {
      // find users that have a particular jobRole
      const users = await User.find({ genericPositionsOfInterest: { "$in": [jobRole] }, stateCode: post.stateCode })


      for (const user of users) {

        console.log(`🤖 Push notification: Warning user ${user.email} about the post [${jobRole}] - ${post.title}`);

        // then send a push notification to them, with this post
        const owner = await User.findOne({
          _id: post?.owner
        })

        await PushNotificationHelper.sendPush([user.pushToken], {
          sound: "default",
          body: LanguageHelper.getLanguageString('post', 'postNotification', {
            jobRole
          }),
          data: {
            toScreen: "IndividualFeed",
            params: {
              // @ts-ignore
              post,
              user: owner
            }
          }
        })
      }

    }
    catch (error) {
      console.error(error);

    }

  }

  public static newPostNotification = async (post: IPost) => {

    console.log(`Trying to notify users about post slug ${post.slug}`);

    // PUSH NOTIFICATION ========================================
    // notify users that may be interested on this role, about this position

    await NotificationHelper.notifyUsersPushNotification(post)

    // EMAIL ========================================
    // notify users and or leads that have this jobRole as position of interest

    // ! Deprecated in favor of job reports. This feature will be a premmium only benefit, later.
    // try {
    //   const leads = await Lead.find({
    //     stateCode: post.stateCode,
    //     jobRoles: { "$in": [post.jobRoles[0]] }
    //   })
    //   const users = await User.find({
    //     stateCode: post.stateCode,
    //     genericPositionsOfInterest: { "$in": [post.jobRoles[0]] }
    //   })

    //   // combine users and leads into an unique array (no duplicate email!)
    //   const targetedUsers = BotHelper.combineLeadsAndUsers(users, leads)

    //   for (const targetedUser of targetedUsers) {

    //     // make sure we have a post and an email!
    //     if (post.slug && targetedUser.email) {

    //       if (targetedUser.city && targetedUser.city !== post.city) {
    //         console.log(`🤖: Skipping e-mail notification for the user ${targetedUser.email}, since his city (${targetedUser.city}) does not match with post's city (${post.city})`);
    //         continue;
    //       }

    //       console.log(`🤖: Email notification: Notifying user ${targetedUser.email} about new post (${post.title}) - slug: ${post.slug}`);
    //       await PostScrapperHelper.notifyUsersEmail(targetedUser, post)
    //     }
    //   }
    // }
    // catch (error) {
    //   console.log('🤖:  Failed to run new post email notification');
    //   console.error(error);
    // }
  }

  public static generateJobReport = async () => {
    try {

      // get positions that were posted between now and yesterday

      const yesterday = moment.tz(moment().subtract(1, 'days'), process.env.TIMEZONE).format('YYYY-MM-DD[T00:00:00.000Z]');

      const posts = await Post.find({
        createdAt: { "$gte": yesterday }
      })

      let output: IReportItem[] = []

      // loop through every post
      for (const post of posts) {

        // * First step: Compile a list of leads/users who may think this post interesting!

        const leads = await Lead.find({
          stateCode: post.stateCode,
          genericPositionsOfInterest: { "$in": post.jobRoles }
        })

        const users = await User.find({
          stateCode: post.stateCode,
          genericPositionsOfInterest: { "$in": post.jobRoles }
        })

        const targeted = BotHelper.combineLeadsAndUsers(users, leads);

        for (const target of targeted) {

          // skip if target has a city and its not on the same post city
          if (target.city && target.city !== post.city) {
            continue;
          }

          output = [
            ...output,
            { slug: post.slug, email: target.email }
          ]
        }
      }

      const grouped = GenericHelper.groupBy(output, 'email');


      // * Now, for every user/lead email, lets submit a list of potential posts

      // forOwn will allow us to iterate on the previously created "grouped" object, through its properties
      _.forOwn(grouped, (value, key) => {

        console.log(key);

        const slugs = _.map(value, 'slug');

        console.log(slugs);

        // * With our lead email and slugs prepared, lets submit an e-mail!


      })

      return true
    }
    catch (error) {
      console.error(error);
      return false;

    }
  }
}