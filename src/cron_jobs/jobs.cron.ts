import moment from 'moment';
import cron from 'node-cron';

import { PuppeteerBot } from '../bots/classes/PuppeteerBot';
import {
  RECURPOST_CREDENTIALS_MG,
  ZOHO_SOCIAL_ES_CREDENTIALS,
  ZOHO_SOCIAL_SP_CREDENTIALS,
} from '../bots/data/loginCredentials';
import { PostScrapperHelper } from '../bots/helpers/PostScrapperHelper';
import { ScrappingTargetHelper } from '../bots/helpers/ScrappingTargetHelper';
import { PosterFacebook } from '../bots/posters/PosterFacebook';
import { RecurPostSocialSchedulerBot } from '../bots/schedulers/RecurPostSocialSchedulerBot';
import { ZohoSocialSchedulerBot } from '../bots/schedulers/ZohoSocialSchedulerBot';
import { TargetPriority } from '../bots/types/bots.types';
import { JobsEmailManager } from '../emails/jobs.email';
import { Post } from '../resources/Post/post.model';
import { IPostApplication, IPostApplicationStatus } from '../resources/Post/post.types';
import { Resume } from '../resources/Resume/resume.model';
import { User } from '../resources/User/user.model';
import { GenericHelper } from '../utils/GenericHelper';
import { LanguageHelper } from '../utils/LanguageHelper';


export class JobsCron {
  public static submitApplications() {
    console.log("🕒  JobsCron: Initializing... 🕒");

    // Send one resume every 10 minutes only (*/10 * * * *)

    cron.schedule("*/10 * * * *", async () => {

      // find all posts with pending application status (email not submitted yet!)
      const jobPosts = await Post.find({
        'applications.status': IPostApplicationStatus.Pending
      });

      for (const post of jobPosts) {

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

              await jobsEmailManager.sendResume(user.email, LanguageHelper.getLanguageString('post', 'jobsEmailTitle', {
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
    cron.schedule("0 0 * * *", async () => {

      console.log(`🤖: Running job cleaner bot...`);

      const posts = await Post.find({});

      // loop through all posts and check with ones are older than 30 days
      for (const post of posts) {

        const a = moment(new Date())
        const b = moment(post.createdAt)

        const diff = a.diff(b, 'days')

        if (diff >= 30) {
          console.log(`🤖: Cleaning post ${post.title} - diff: ${diff}`);
          await post.remove() // delete post!
        }

      }

      // Clean posts with forbidden keywords, that somehow ended up in our database
      try {
        const dbPosts = await Post.find({})

        for (const post of dbPosts) {
          if (PostScrapperHelper.checkForBannedWords(post.title) || PostScrapperHelper.checkForBannedWords(post.content)) {
            console.log(`🤖: Deleting post ${post.title}`);
            await post.remove();
          }
        }


      }
      catch (error) {
        console.error(error);

      }
    });
  }

  public static initializeJobCrawlers = () => {


    // HIGH PRIORITY GROUPS

    cron.schedule("0 */6 * * *", async () => {

      const results = [
        ...ScrappingTargetHelper.getScrappingTargetList(TargetPriority.High, true, "ES"),
        ...ScrappingTargetHelper.getScrappingTargetList(TargetPriority.High, true, "SP"),
        ...ScrappingTargetHelper.getScrappingTargetList(TargetPriority.High, true, "MG"),
      ];

      await ScrappingTargetHelper.startScrappers(results);

    });

    // MEDIUM PRIORITY GROUPS

    cron.schedule("0 */10 * * *", async () => {

      const results = [
        ...ScrappingTargetHelper.getScrappingTargetList(TargetPriority.Medium, true, "ES"),
        ...ScrappingTargetHelper.getScrappingTargetList(TargetPriority.Medium, true, "SP"),
        ...ScrappingTargetHelper.getScrappingTargetList(TargetPriority.Medium, true, "MG"),
      ];

      await ScrappingTargetHelper.startScrappers(results);

    });

    // LOW PRIORITY GROUPS

    cron.schedule("0 2 * * *", async () => {

      const results = [
        ...ScrappingTargetHelper.getScrappingTargetList(TargetPriority.Low, true, "ES"),
        ...ScrappingTargetHelper.getScrappingTargetList(TargetPriority.Low, true, "SP"),
        ...ScrappingTargetHelper.getScrappingTargetList(TargetPriority.Low, true, "MG"),
      ];

      await ScrappingTargetHelper.startScrappers(results);

    });



  }

  public static initPostersBot = () => {
    cron.schedule("0 */3 * * *", async () => {

      await PosterFacebook.triggerMarketingPost()

    });


  }

  public static initializeJobPostSchedulers = () => {
    cron.schedule("0 */2 * * *", async () => {

      const randomPostMG = await PuppeteerBot.getRandomPost("MG")
      if (randomPostMG) {
        await RecurPostSocialSchedulerBot.schedulePost("MG", RECURPOST_CREDENTIALS_MG, randomPostMG);
      }

      await GenericHelper.sleep(60 * 1000 * 3)

      const randomPostSP = await PuppeteerBot.getRandomPost("SP")
      if (randomPostSP) {
        await ZohoSocialSchedulerBot.schedulePost("SP", ZOHO_SOCIAL_SP_CREDENTIALS, randomPostSP)
      }

      await GenericHelper.sleep(60 * 1000 * 3)

      const randomPostES = await PuppeteerBot.getRandomPost("ES")
      if (randomPostES) {
        await ZohoSocialSchedulerBot.schedulePost("ES", ZOHO_SOCIAL_ES_CREDENTIALS, randomPostES);
      }


    })
  }

}
