import Promise from 'bluebird';
import moment from 'moment';
import cron from 'node-cron';

import { ScrappingTargetHelper } from '../bots/helpers/ScrappingTargetHelper';
import { TelegramBotHelper } from '../bots/messengers/TelegramBot/TelegramBotHelper';
import { WhatsAppBotHelper } from '../bots/messengers/WhatsAppBot/WhatsappBotHelper';
import { TargetPriority } from '../bots/types/bots.types';
import { JobsEmailManager } from '../emails/jobs.email';
import { Post } from '../resources/Post/post.model';
import { IPostApplication, IPostApplicationStatus } from '../resources/Post/post.types';
import { Resume } from '../resources/Resume/resume.model';
import { User } from '../resources/User/user.model';
import { NotificationHelper } from '../utils/NotificationHelper';
import { TS } from '../utils/TS';

// Fix Telegram bot promise issue: https://github.com/benjick/meteor-telegram-bot/issues/37#issuecomment-389669310
Promise.config({
  cancellation: true
});
export class JobsCron {



  private static _executeCrawlers = async () => {

    await ScrappingTargetHelper.startScrappers([
      ...ScrappingTargetHelper.getScrappingTargetList(TargetPriority.High, true, "ES"),
      ...ScrappingTargetHelper.getScrappingTargetList(TargetPriority.High, true, "SP"),
      ...ScrappingTargetHelper.getScrappingTargetList(TargetPriority.High, true, "MG"),
      ...ScrappingTargetHelper.getScrappingTargetList(TargetPriority.High, true, "RJ"),
    ]);

    await ScrappingTargetHelper.startScrappers([
      ...ScrappingTargetHelper.getScrappingTargetList(TargetPriority.Medium, true, "ES"),
      ...ScrappingTargetHelper.getScrappingTargetList(TargetPriority.Medium, true, "SP"),
      ...ScrappingTargetHelper.getScrappingTargetList(TargetPriority.Medium, true, "MG"),
      ...ScrappingTargetHelper.getScrappingTargetList(TargetPriority.Medium, true, "RJ"),
    ]);


    await ScrappingTargetHelper.startScrappers([
      ...ScrappingTargetHelper.getScrappingTargetList(TargetPriority.Low, true, "ES"),
      ...ScrappingTargetHelper.getScrappingTargetList(TargetPriority.Low, true, "SP"),
      ...ScrappingTargetHelper.getScrappingTargetList(TargetPriority.Low, true, "MG"),
      ...ScrappingTargetHelper.getScrappingTargetList(TargetPriority.Low, true, "RJ"),
    ]);
  }



  public static submitApplications() {


    // Send one resume every 10 minutes only (*/10 * * * *)

    cron.schedule("*/10 * * * *", async () => {



      // find all posts with pending application status (email not submitted yet!)
      const jobPosts = await Post.find({
        'applications.status': IPostApplicationStatus.Pending,
        active: true
      });

      for (const post of jobPosts) {

        console.log("🕒  JobsCron: submitApplications() 🕒");

        console.log(`JobsCron => Processing ${post.title}`);

        // get applications and send user resume

        const applications: IPostApplication[] = post.applications;

        for (const application of applications) {

          console.log('processing application...');

          console.log(application);

          // If our application is pending, it means we should send the resume to a target company

          if (application.status === IPostApplicationStatus.Pending) {

            console.log('application status is pending, proceeding!');

            try {
              const resume = await Resume.findOne({ _id: application.resumeId })

              if (!resume) {
                throw new Error('Failed to find user\'s resume')
              }

              const user = await User.findOne({ _id: resume.ownerId })

              if (!user) {
                throw new Error('Failed to find user')
              }

              const jobsEmailManager = new JobsEmailManager();

              await jobsEmailManager.sendResume(user.email, TS.string('post', 'jobsEmailTitle', {
                jobName: application.jobRole
              }), 'resume', resume,
                post, user, application)

              // console.log('Email sent! Updating post application status to DONE');

              // update application that we just sent status to done

              const updatedApplicationStatus = post.applications.map((apl) => {

                if (apl.resumeId === application.resumeId && apl.status === application.status) {
                  apl.status = IPostApplicationStatus.Done
                }
                return apl

              })

              post.applications = updatedApplicationStatus;

              await post.save()

              console.log('Finished!');

              return

            }
            catch (error) {
              console.error(error);

            }

          }

        }

      }

    });
  }

  public static jobCrawlersCleaners = async () => {

    // once every day, check
    cron.schedule("0 1 * * *", async () => {

      console.log("🕒  JobsCron => Running post cleaner... 🕒");


      const posts = await Post.find({ active: true });

      // loop through all posts and check with ones are older than 30 days
      for (const post of posts) {

        const a = moment(new Date())
        const b = moment(post.createdAt)

        const diff = a.diff(b, 'days')

        if (diff >= 40) {
          console.log(`🤖: Deactivating post ${post.title} - diff: ${diff}`);
          // this is just a SOFT delete! The post remains on database for research purposes.
          post.active = false;
          await post.save();
        }

      }


    });
  }

  public static initializeJobCrawlers = () => {

    // at 6am UTC = 5am Brasilia (Vagas para 8am Brasilia)
    cron.schedule("0 6 * * *", async () => {
      JobsCron._executeCrawlers()
    });

    // at 12pm UTC = 9am Brasilia (Vagas para 15pm Brasilia)
    cron.schedule("0 12 * * *", async () => {
      JobsCron._executeCrawlers()
    });

    // at 6pm UTC = 3pm Brasilia (Vagas para 7pm Brasilia)
    cron.schedule("0 18 * * *", async () => {
      JobsCron._executeCrawlers()
    });


  }

  public static generateJobReports = async () => {

    // at 9am UTC = 6am Brasilia = 2am Vancouver
    cron.schedule("0 9 * * *", async () => {
      console.log("🕒  JobsCron: generateJobReports() 🕒");

      await NotificationHelper.generateJobReport()
    });


  }

  public static whatsAppBotPoster = () => {
    // UTC 11 (8 am Brasilia)
    // UTC 15 (12pm Brasilia)
    // UTC 19 (4pm Brasilia)
    // UTC 22 (7pm Brasilia)
    // UTC 01 (22pm Brasilia)


    cron.schedule("0 11 * * *", async () => {
      await WhatsAppBotHelper.postOnGroups()
    })
    cron.schedule("0 13 * * *", async () => {
      await WhatsAppBotHelper.postOnGroups()
    })
    cron.schedule("0 15 * * *", async () => {
      await WhatsAppBotHelper.postOnGroups()
    })
    cron.schedule("0 17 * * *", async () => {
      await WhatsAppBotHelper.postOnGroups()
    })
    cron.schedule("0 19 * * *", async () => {
      await WhatsAppBotHelper.postOnGroups()
    })
    cron.schedule("0 22 * * *", async () => {
      await WhatsAppBotHelper.postOnGroups()
    })
    cron.schedule("0 01 * * *", async () => {
      await WhatsAppBotHelper.postOnGroups()
    })
  }

  public static telegramBotPoster = () => {

    // UTC 11 (8 am Brasilia)
    // UTC 15 (12pm Brasilia)
    // UTC 19 (4pm Brasilia)


    cron.schedule("0 11 * * *", async () => {
      await TelegramBotHelper.postOnGroups()
    })
    cron.schedule("0 15 * * *", async () => {
      await TelegramBotHelper.postOnGroups()
    })
    cron.schedule("0 19 * * *", async () => {
      await TelegramBotHelper.postOnGroups()
    })




  }

  // public static initPostersBot = () => {

  //   cron.schedule("0 */4 * * *", async () => {
  //     await PosterFacebook.triggerMarketingPost()
  //   });


  // }

  // public static initializeJobPostSchedulers = () => {
  //   cron.schedule("0 */4 * * *", async () => {

  //     // const randomPostMG = await PuppeteerBot.getRandomPost("MG")
  //     // if (randomPostMG) {
  //     //   await RecurPostSocialSchedulerBot.schedulePost("MG", RECURPOST_CREDENTIALS_MG, randomPostMG);
  //     // }

  //     // await GenericHelper.sleep(60 * 1000 * 3)

  //     // RECURPOST SP

  //     const randomPostSP = await PuppeteerBot.getRandomPost("SP")
  //     if (randomPostSP) {
  //       await RecurPostSocialSchedulerBot.schedulePost("SP", RECURPOST_CREDENTIALS_SP, randomPostSP);
  //     }

  //     // ZOHOSOCIAL SP

  //     // const randomPostSP = await PuppeteerBot.getRandomPost("SP")
  //     // if (randomPostSP) {
  //     //   await ZohoSocialSchedulerBot.schedulePost("SP", ZOHO_SOCIAL_SP_CREDENTIALS, randomPostSP);
  //     // }



  //     await GenericHelper.sleep(60 * 1000 * 3)

  //     // ZOHOSOCIAL ES

  //     const randomPostES = await PuppeteerBot.getRandomPost("ES")
  //     if (randomPostES) {
  //       await ZohoSocialSchedulerBot.schedulePost("ES", ZOHO_SOCIAL_ES_CREDENTIALS, randomPostES);
  //     }

  //     // RECURPOST ES
  //     // const randomPostES = await PuppeteerBot.getRandomPost("ES")
  //     // if (randomPostES) {
  //     //   await RecurPostSocialSchedulerBot.schedulePost("ES", RECURPOST_CREDENTIALS_ES, randomPostES);
  //     // }


  //   })
  // }

}
