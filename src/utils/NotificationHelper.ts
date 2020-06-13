import _ from 'lodash';
import moment from 'moment-timezone';

import { BotHelper } from '../bots/helpers/BotHelper';
import { AccountEmailManager } from '../emails/account.email';
import { ILeadModel, Lead } from '../resources/Lead/lead.model';
import { Log } from '../resources/Log/log.model';
import { Post } from '../resources/Post/post.model';
import { IPost } from '../resources/Post/post.types';
import { IUser, User } from '../resources/User/user.model';
import { IReportItem } from '../typescript/report.types';
import { GenericHelper } from './GenericHelper';
import { PushNotificationHelper } from './PushNotificationHelper';
import { TS } from './TS';


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
          body: TS.string('post', 'postNotification', {
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

  public static _generateJobRolesString = (jobRoles: string[]) => {

    if (jobRoles.length === 1) {
      return jobRoles[0];
    }
    if (jobRoles.length === 2) {
      return `${jobRoles[0]} ${TS.string(null, 'globalGenericAnd')} ${jobRoles[1]}`
    } else {
      return jobRoles.join(', ').replace(/, ([^,]*)$/, ` ${TS.string(null, 'globalGenericAnd')} $1`);
    }
  }

  public static generateJobReport = async () => {
    try {

      // get positions that were posted between now and yesterday

      const yesterday = moment.tz(moment().subtract(1, 'days'), process.env.TIMEZONE).format('YYYY-MM-DD[T00:00:00.000Z]');

      const posts = await Post.find({
        createdAt: { "$gte": yesterday }
      })

      let reportOutput: IReportItem[] = []

      // loop through every post
      for (const post of posts) {

        // * First step: Compile a list of leads/users who may think this post interesting!

        const leads = await Lead.find({
          stateCode: post.stateCode,
          genericPositionsOfInterest: { "$in": post.jobRoles },
        })

        const users = await User.find({
          stateCode: post.stateCode,
          genericPositionsOfInterest: { "$in": post.jobRoles },
        })

        const targeted = BotHelper.combineLeadsAndUsers(users, leads);

        for (const target of targeted) {

          // skip if target has a city and its not on the same post city
          if (target.city) {
            if (target.city !== post.city) {
              console.log(`🤖: Skipping report of ${post.slug} to  ${target.email}, since he's not on the same post's city`);
              continue;
            }
          }



          const postAlreadyReported = await Log.exists({
            emitter: target.email,
            action: 'REPORT_POST',
            target: post.slug
          })

          // make sure we dont report the same post twice!
          if (postAlreadyReported) {
            console.log(`🤖: Skipping report of ${post.slug} to  ${target.email}, it was already reported`);
            continue
          }

          // If post wasn't reported so far, lets generate an output with required info to compile it later
          // this output will be compiled into a report
          reportOutput = [
            ...reportOutput,
            { postTitle: post.title, postSlug: post.slug, postSector: post.sector, email: target.email, jobRoles: post.jobRoles, userName: target.name, }
          ]

          const newReportPost = new Log({
            emitter: target.email,
            action: 'REPORT_POST',
            target: post.slug
          })
          await newReportPost.save()
        }
      }

      // group all reports by Email
      const groupedReports = GenericHelper.groupBy(reportOutput, 'email');

      // loop throgh object key => values. On this case, key is our target email and value is the info we need to generate the report.
      for (const key in groupedReports) { // lets use a FOR loop, to preserve our async (if we used forEach here, await would be simply ignored!)
        if (groupedReports.hasOwnProperty(key)) {

          const value = groupedReports[key]

          // * Now, for every user/lead email, lets submit a list of potential posts

          // forOwn will allow us to iterate on the previously created "grouped" object, through its properties

          const targetEmail = key;
          const slugs = _.map(value, 'postSlug');
          const userName = Array.from(new Set(_.map(value, 'userName')))[0]
          const jobRoles = Array.from(new Set(_.flatten(_.map(value, 'jobRoles'))));

          const postThumbnailsLinks = value.map((item: IReportItem) => {
            return `
                <a href="https://empregourgente.com/posts/${item.postSlug}?utm_source=empregourgente_sendgrid&utm_medium=email" target="_blank" style="display: block; padding-bottom: 0.75rem; padding-top: 0.75rem; text-decoration: none; font-size: 0.9rem; font-weight: bold;">${item.postTitle}</a>
        `
          })

          console.log(`🤖: Job Report: Generating for ${targetEmail}`);
          console.log(value);
          console.log(userName);
          console.log(slugs);
          console.log(jobRoles);

          // * With our lead email and slugs prepared, lets submit an e-mail!

          const accountEmailManager = new AccountEmailManager();

          // Randomize post content: Avoid spam filters thinking that your message is too repetitive. It will create some uniqueness!

          const firstPhraseSample = _.sample(['jobsNotificationFirstPhrase', 'jobsNotificationFirstPhrase2', 'jobsNotificationFirstPhrase3', 'jobsNotificationFirstPhrase4'])
          const secondPhraseSample = _.sample(['jobReportSecondPhrase', 'jobReportSecondPhrase2', 'jobReportSecondPhrase3', 'jobReportSecondPhrase4'])
          const closingSample = _.sample(['jobsNotificationClosing', 'jobsNotificationClosing2', 'jobsNotificationClosing3'])

          const jobReportFirstPhrase = TS.string('post', firstPhraseSample || 'jobsNotificationFirstPhrase', { userName: userName || "" })
          const jobReportSecondPhrase = TS.string('post', secondPhraseSample || 'jobsNotificationSecondParagraph')
          const jobReportClosing = TS.string('post', closingSample || 'jobsNotificationClosing')

          await accountEmailManager.sendEmail(
            targetEmail,
            jobRoles.length === 1 ? TS.string('post', 'reportNotificationSubjectSingular', {
              jobRolesString: NotificationHelper._generateJobRolesString(jobRoles)
            }) : TS.string('post', 'reportNotificationSubjectPlural', {
              jobRolesString: NotificationHelper._generateJobRolesString(jobRoles)
            }),
            'job-report', {
            jobReportFirstPhrase,
            jobReportSecondPhrase,
            postSummary: postThumbnailsLinks.join(''),
            jobReportClosing
          }
          );

          await GenericHelper.sleep(3000);



        }
      }





      return true
    }
    catch (error) {
      console.error(error);
      return false;

    }
  }

  public static notifyUsersEmail = async (user: IUser | ILeadModel, post: IPost) => {

    const accountEmailManager = new AccountEmailManager();

    // Randomize post content: Avoid spam filters thinking that your message is too repetitive. It will create some uniqueness!

    const firstPhraseSample = _.sample(['jobsNotificationFirstPhrase', 'jobsNotificationFirstPhrase2', 'jobsNotificationFirstPhrase3', 'jobsNotificationFirstPhrase4'])
    const secondPhraseSample = _.sample(['jobsNotificationSecondParagraph', 'jobsNotificationSecondParagraph2', 'jobsNotificationSecondParagraph3', 'jobsNotificationSecondParagraph4'])
    const closingSample = _.sample(['jobsNotificationClosing', 'jobsNotificationClosing2', 'jobsNotificationClosing3'])

    await accountEmailManager.sendEmail(
      user.email,
      TS.string('post', 'jobsNotificationSubject', { jobRole: post.jobRoles[0], postTitle: post.title }),
      "job-notification", {
      jobsNotificationFirstPhrase: TS.string('post', firstPhraseSample || 'jobsNotificationFirstPhrase', { userName: user.name || "" }),
      jobsNotificationSecondParagraph: TS.string('post', secondPhraseSample || 'jobsNotificationSecondParagraph'),
      jobsNotificationClosing: TS.string('post', closingSample || 'jobsNotificationClosing', {
        postUrl: `https://empregourgente.com/posts/${post.slug}?utm_source=empregourgente_sendgrid&utm_medium=email`
      }),

      postSummary: `
      <tr>
      ${post.title}
      </tr>
      <br />
      <br />
    <tr>
    <td align="center" style="word-break: break-word; font-family: &quot;Nunito Sans&quot;, Helvetica, Arial, sans-serif; font-size: 16px;">
    <a href="https://empregourgente.com/posts/${post.slug}?utm_source=empregourgente_sendgrid&utm_medium=email" class="f-fallback button" target="_blank" style="color: #FFF; border-color: #3869d4; border-style: solid; border-width: 10px 18px; background-color: #3869D4; display: inline-block; text-decoration: none; border-radius: 3px; box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16); -webkit-text-size-adjust: none; box-sizing: border-box;">${TS.string('post', 'jobsNotificationPostCTA')}</a>
  </td>
  </tr>
      `
    }
    );

  }
}