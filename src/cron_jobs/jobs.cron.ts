import moment = require('moment');
import cron from 'node-cron';

import { JobsEmailManager } from '../emails/jobs.email';
import { IPostApplication, IPostApplicationStatus, Post } from '../resources/Post/post.model';
import { Resume } from '../resources/Resume/resume.model';
import { User } from '../resources/User/user.model';
import { PagePattern, ScrapperHelper } from '../scrappers/helpers/ScrapperHelper';
import { ScrapperFacebook } from '../scrappers/scrappers/ScrapperFacebook';
import { ScrapperOLXES } from '../scrappers/scrappers/ScrapperOLXES';
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

    // once every month
    cron.schedule("0 0 1 * *", async () => {


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
    });
  }

  public static initializeJobCrawlers = () => {


    cron.schedule("*/2 * * * *", async () => {

      // OLX => ES
      await ScrapperHelper.init('ScrapperOLXES', {
        crawlLinksFunction: ScrapperOLXES.crawlLinks,
        crawlPageDataFunction: ScrapperOLXES.crawlPageData
      }, PagePattern.ListAndInternalPosts)


      // Facebook => Empregos ES
      await ScrapperHelper.init('Empregos ES', {
        crawlFeedFunction: ScrapperFacebook.crawlPageFeed
      }, PagePattern.Feed, 'https://www.facebook.com/groups/empregoses/', {
        country: "Brazil",
        stateCode: "ES",
        city: "Vitória",
      })

      await GenericHelper.sleep(1000 * 60 * 5)

      // Facebook => Emprego Urgente ES
      await ScrapperHelper.init('Emprego Urgente ES', {
        crawlFeedFunction: ScrapperFacebook.crawlPageFeed
      }, PagePattern.Feed, 'https://www.facebook.com/groups/255725088176388', {
        country: "Brazil",
        stateCode: "ES",
        city: "Vitória",
      })

      // Facebook => Vagas e Oportunidades ES
      await ScrapperHelper.init('Vagas e Oportunidades ES', {
        crawlFeedFunction: ScrapperFacebook.crawlPageFeed
      }, PagePattern.Feed, 'https://www.facebook.com/groups/jo.darc.13/', {
        country: "Brazil",
        stateCode: "ES",
        city: "Vitória",
      })

      // Facebook => Emprego ES
      await ScrapperHelper.init('Emprego ES', {
        crawlFeedFunction: ScrapperFacebook.crawlPageFeed
      }, PagePattern.Feed, 'https://www.facebook.com/groups/470386613006396/', {
        country: "Brazil",
        stateCode: "ES",
        city: "Vitória",
      })


      // Facebook => Empregos Vitoria ES
      await ScrapperHelper.init('Empregos Vitoria ES', {
        crawlFeedFunction: ScrapperFacebook.crawlPageFeed
      }, PagePattern.Feed, 'https://www.facebook.com/groups/462576003935602', {
        country: "Brazil",
        stateCode: "ES",
        city: "Vitória",
      })
      // Facebook => Agencia de Emprego Nacional Empregos Guarapari
      await ScrapperHelper.init('Empregos Guarapari', {
        crawlFeedFunction: ScrapperFacebook.crawlPageFeed
      }, PagePattern.Feed, 'https://www.facebook.com/groups/145238849184087/', {
        country: "Brazil",
        stateCode: "ES",
        city: "Guarapari",
      })






    })


  }
}
