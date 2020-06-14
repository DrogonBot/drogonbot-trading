import _ from 'lodash';
import moment from 'moment-timezone';

import { AccountEmailManager } from '../emails/account.email';
import { ILead } from '../resources/Lead/lead.types';
import { Log } from '../resources/Log/log.model';
import { IPost } from '../resources/Post/post.types';
import { IUser, User } from '../resources/User/user.model';
import { emailProviders } from './../constants/emailProviders.constant';
import { JobsCron } from './../cron_jobs/jobs.cron';
import { ILeadModel, Lead } from './../resources/Lead/lead.model';
import { IUserDocument } from './../resources/User/user.types';
import { ConsoleColor, ConsoleHelper } from './ConsoleHelper';
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

  public static areThereEmailCredits = async () => {

    const today = moment.tz(new Date(), process.env.TIMEZONE).format('YYYY-MM-DD[T00:00:00.000Z]');


    for (const emailProvider of emailProviders) {
      try {
        const providerEmailsToday = await Log.find({
          action: `${emailProvider.key}_EMAIL_SUBMISSION`,
          createdAt: { "$gte": today }
        })
        if (providerEmailsToday.length < emailProvider.credits) {
          return true
        }
      }
      catch (error) {
        console.error(error);
        return false
      }

      return false;
    }
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

  private static _submitReport = async (postThumbnailsLinks, reportedPostsJobRoles, user?: IUserDocument | null, lead?: ILead | null) => {

    const target = user! || lead!

    // @ts-ignore
    const jobRoles = target.genericPositionsOfInterest || target.jobRoles

    if (postThumbnailsLinks.length >= 1) { // if there's something to send!

      reportedPostsJobRoles = Array.from(new Set(reportedPostsJobRoles))

      // submit post

      ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `🤖: Job Report: Submitting report to ${target.email} about ${postThumbnailsLinks.length} posts (${reportedPostsJobRoles})`)


      // * With our lead email and slugs prepared, lets submit an e-mail!

      const accountEmailManager = new AccountEmailManager();

      // Randomize post content: Avoid spam filters thinking that your message is too repetitive. It will create some uniqueness!

      const firstPhraseSample = _.sample(['jobsNotificationFirstPhrase', 'jobsNotificationFirstPhrase2', 'jobsNotificationFirstPhrase3', 'jobsNotificationFirstPhrase4'])
      const secondPhraseSample = _.sample(['jobReportSecondPhrase', 'jobReportSecondPhrase2', 'jobReportSecondPhrase3', 'jobReportSecondPhrase4'])
      const closingSample = _.sample(['jobsNotificationClosing', 'jobsNotificationClosing2', 'jobsNotificationClosing3'])

      const jobReportFirstPhrase = TS.string('post', firstPhraseSample || 'jobsNotificationFirstPhrase', { userName: target!.name || "" })
      const jobReportSecondPhrase = TS.string('post', secondPhraseSample || 'jobsNotificationSecondParagraph')
      const jobReportClosing = TS.string('post', closingSample || 'jobsNotificationClosing')

      // check if there're credits left
      const areThereEmailCredits = await NotificationHelper.areThereEmailCredits()

      if (!areThereEmailCredits) {
        ConsoleHelper.coloredLog(ConsoleColor.BgRed, ConsoleColor.FgWhite, `🤖: Stopping cron job because there're no credits left!`)
        JobsCron.reportsCron.stop();
        return false
      }


      const submitted = await accountEmailManager.sendEmail(
        target.email!,
        jobRoles!.length === 1 ? TS.string('post', 'reportNotificationSubjectSingular', {
          jobRolesString: NotificationHelper._generateJobRolesString(reportedPostsJobRoles!)
        }) : TS.string('post', 'reportNotificationSubjectPlural', {
          jobRolesString: NotificationHelper._generateJobRolesString(reportedPostsJobRoles!)
        }),
        'job-report', {
        jobReportFirstPhrase,
        jobReportSecondPhrase,
        postSummary: postThumbnailsLinks.join(''),
        jobReportClosing
      }
      );

      if (submitted) {
        target.postReportItems = []
        await target.save();
      }


      return true


    } else {
      console.log(`🤖: Hmm... nothing interesting to report!`);
    }


  }

  private static _getReportItemsAndJobRoles = (target) => {
    let postThumbnailsLinks: string[] = []
    let reportedPostsJobRoles: string[] = []

    for (const post of target.postReportItems) {

      // compile report list
      postThumbnailsLinks = [
        ...postThumbnailsLinks,
        `<a href="https://empregourgente.com/posts/${post.slug}?utm_source=empregourgente_sendgrid&utm_medium=email" target="_blank" style="display: block; padding-bottom: 0.75rem; padding-top: 0.75rem; text-decoration: none; font-size: 0.9rem; font-weight: bold;">${post.title}</a>`
      ]

      reportedPostsJobRoles = [
        ...reportedPostsJobRoles,
        ...post.jobRoles
      ]

    }

    return {
      postThumbnailsLinks, reportedPostsJobRoles
    }
  }

  public static generateJobReport = async () => {
    try {


      const users = await User.find({
        postReportItems: { $exists: true, $not: { $size: 0 } }
      })

      for (const user of users) {

        const { postThumbnailsLinks, reportedPostsJobRoles } = NotificationHelper._getReportItemsAndJobRoles(user)

        // then submit
        const status = await NotificationHelper._submitReport(postThumbnailsLinks, reportedPostsJobRoles, user)

        if (!status) {
          return
        }

      }

      const leads = await Lead.find({
        postReportItems: { $exists: true, $not: { $size: 0 } }
      })

      for (const lead of leads) {

        const { postThumbnailsLinks, reportedPostsJobRoles } = NotificationHelper._getReportItemsAndJobRoles(lead)

        // then submit
        const status = await NotificationHelper._submitReport(postThumbnailsLinks, reportedPostsJobRoles, null, lead)


        if (!status) {
          return
        }


      }

      ConsoleHelper.coloredLog(ConsoleColor.BgGreen, ConsoleColor.FgWhite, `🤖: Finished sending reports!`)


      return true
    }
    catch (error) {
      console.error(error);
      return false;

    }
  }

  public static combineLeadsAndUsers = (users, leads): ILeadModel[] | IUser[] => {

    let output: ILeadModel[] | IUser[] = users;

    for (const lead of leads) {

      const hasInUsers = users.some((user) => user.email === lead.email)

      if (!hasInUsers) {
        output = [
          ...output,
          lead
        ]
      }

    }

    return output;

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