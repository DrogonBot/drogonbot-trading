import Promise from 'bluebird';
import _ from 'lodash';
import moment from 'moment';
import cron from 'node-cron';
import TelegramBot from 'node-telegram-bot-api';

import { ScrappingTargetHelper } from '../bots/helpers/ScrappingTargetHelper';
import { TargetPriority } from '../bots/types/bots.types';
import { JobsEmailManager } from '../emails/jobs.email';
import { Post } from '../resources/Post/post.model';
import { IPostApplication, IPostApplicationStatus } from '../resources/Post/post.types';
import { Resume } from '../resources/Resume/resume.model';
import { User } from '../resources/User/user.model';
import { ITelegramChannel } from '../typescript/telegrambot.types';
import { ConsoleColor, ConsoleHelper } from '../utils/ConsoleHelper';
import { GenericHelper } from '../utils/GenericHelper';
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

  private static _telegramBotPost = async () => {

    console.log("🕒  JobsCron: _telegramBotPost() 🕒");

    const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN || "", { polling: true });


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

            const msg = await bot.sendMessage(channel.chatId, `https://empregourgente.com/posts/${post.slug}`)
            console.log(msg);

          }
          post.isPostedOnTelegram = true;
          await post.save()

          await GenericHelper.sleep(3000);
        }
      }

      ConsoleHelper.coloredLog(ConsoleColor.BgGreen, ConsoleColor.FgWhite, '🤖: Saved!')

    }
    catch (error) {
      console.error(error);

    }


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
    // at 6pm UTC = 3pm Brasilia (Vagas para 7pm Brasilia)
    cron.schedule("0 18 * * *", async () => {
      JobsCron._executeCrawlers()
    });


  }

  public static generateJobReports = async () => {

    // at 5am UTC = 2am Brasilia = 10pm Vancouver
    cron.schedule("0 5 * * *", async () => {
      console.log("🕒  JobsCron: generateJobReports() 🕒");

      await NotificationHelper.generateJobReport()
    });


  }


  public static telegramBotPoster = () => {

    // UTC 11 (8 am Brasilia)
    // UTC 15 (12pm Brasilia)
    // UTC 19 (4pm Brasilia)
    // UTC 22 (7pm Brasilia)

    cron.schedule("0 11 * * *", async () => {
      await JobsCron._telegramBotPost()
    })
    cron.schedule("0 15 * * *", async () => {
      await JobsCron._telegramBotPost()
    })
    cron.schedule("0 19 * * *", async () => {
      await JobsCron._telegramBotPost()
    })
    cron.schedule("0 22 * * *", async () => {
      await JobsCron._telegramBotPost()
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
