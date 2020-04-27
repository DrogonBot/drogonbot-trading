import moment = require('moment');
import cron from 'node-cron';

import { PuppeteerBot } from '../bots/classes/PuppeteerBot';
import { BotHelper } from '../bots/helpers/BotHelper';
import { PostScrapperHelper } from '../bots/helpers/PostScrapperHelper';
import { RecurPostSocialSchedulerBot } from '../bots/schedulers/RecurPostSocialSchedulerBot';
import { ZohoSocialSchedulerBot } from '../bots/schedulers/ZohoSocialSchedulerBot';
import { ScrapperFacebook } from '../bots/scrappers/ScrapperFacebook';
import { ScrapperOLX } from '../bots/scrappers/ScrapperOLX';
import { PagePattern } from '../bots/types/bots.types';
import { JobsEmailManager } from '../emails/jobs.email';
import { Post } from '../resources/Post/post.model';
import { IPostApplication, IPostApplicationStatus } from '../resources/Post/post.types';
import { Resume } from '../resources/Resume/resume.model';
import { User } from '../resources/User/user.model';
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
        const posts = await Post.find({})

        for (const post of posts) {
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

    cron.schedule("0 */12 * * *", async () => {

      try {
        /*#############################################################|
      |  >>> ESPIRITO SANTO
      *##############################################################*/


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
      }
      catch (error) {
        console.error(error);
        console.log('failed to run OLX scrappers');
      }

    });


    cron.schedule("0 */8 * * *", async () => {

      try {
        await BotHelper.initScrapper('Vagas e Oportunidades ES', {
          crawlFeedFunction: ScrapperFacebook.crawlPageFeed
        }, PagePattern.Feed, 'https://www.facebook.com/groups/jo.darc.13/', {
          country: "Brazil",
          stateCode: "ES",
          city: "Vitória",
        })


        await BotHelper.initScrapper('Facebook => Emprego ES', {
          crawlFeedFunction: ScrapperFacebook.crawlPageFeed
        }, PagePattern.Feed, 'https://www.facebook.com/groups/470386613006396/', {
          country: "Brazil",
          stateCode: "ES",
          city: "Vitória",
        })



        await BotHelper.initScrapper('Facebook => Empregos Vitoria ES', {
          crawlFeedFunction: ScrapperFacebook.crawlPageFeed
        }, PagePattern.Feed, 'https://www.facebook.com/groups/462576003935602', {
          country: "Brazil",
          stateCode: "ES",
          city: "Vitória",
        })

        await BotHelper.initScrapper('Facebook => Gazeta Empregos ES', {
          crawlFeedFunction: ScrapperFacebook.crawlPageFeed
        }, PagePattern.Feed, 'https://www.facebook.com/groups/2143865589172147/', {
          country: "Brazil",
          stateCode: "ES",
          city: "Vitória",
        })


        await BotHelper.initScrapper('Facebook => Empregos Vila Velha', {
          crawlFeedFunction: ScrapperFacebook.crawlPageFeed
        }, PagePattern.Feed, 'https://www.facebook.com/groups/1002682889820586/', {
          country: "Brazil",
          stateCode: "ES",
          city: "Vila Velha",
        })

        await BotHelper.initScrapper('Facebook => Empregos Guarapari', {
          crawlFeedFunction: ScrapperFacebook.crawlPageFeed
        }, PagePattern.Feed, 'https://www.facebook.com/groups/145238849184087/', {
          country: "Brazil",
          stateCode: "ES",
          city: "Guarapari",
        })

        /*#############################################################|
        |  >>> BELO HORIZONTE
        *##############################################################*/

        await BotHelper.initScrapper('Facebook => Vagas de Empregos BH', {
          crawlFeedFunction: ScrapperFacebook.crawlPageFeed
        }, PagePattern.Feed, 'https://www.facebook.com/groups/grupoempregosbh/', {
          country: "Brazil",
          stateCode: "MG",
          city: "Belo Horizonte",
        })

        await BotHelper.initScrapper('Facebook => Empregos BH', {
          crawlFeedFunction: ScrapperFacebook.crawlPageFeed
        }, PagePattern.Feed, 'https://www.facebook.com/groups/597673520276895/', {
          country: "Brazil",
          stateCode: "MG",
          city: "Belo Horizonte",
        })

        await BotHelper.initScrapper('Facebook => Empregos em Belo Horizonte', {
          crawlFeedFunction: ScrapperFacebook.crawlPageFeed
        }, PagePattern.Feed, 'https://www.facebook.com/groups/833818616764376/', {
          country: "Brazil",
          stateCode: "MG",
          city: "Belo Horizonte",
        })

        await BotHelper.initScrapper('Facebook => Empregos Urgentes BH', {
          crawlFeedFunction: ScrapperFacebook.crawlPageFeed
        }, PagePattern.Feed, 'https://www.facebook.com/groups/empregosbhmg/', {
          country: "Brazil",
          stateCode: "MG",
          city: "Belo Horizonte",
        })

        await BotHelper.initScrapper('Facebook => Emprego BH', {
          crawlFeedFunction: ScrapperFacebook.crawlPageFeed
        }, PagePattern.Feed, 'https://www.facebook.com/groups/557833854267297/', {
          country: "Brazil",
          stateCode: "MG",
          city: "Belo Horizonte",
        })

        await BotHelper.initScrapper('Facebook => Melhor Emprego BH', {
          crawlFeedFunction: ScrapperFacebook.crawlPageFeed
        }, PagePattern.Feed, 'https://www.facebook.com/groups/718029571552489/', {
          country: "Brazil",
          stateCode: "MG",
          city: "Belo Horizonte",
        })



        /*#############################################################|
        |  >>> SAO PAULO
        *##############################################################*/

        await BotHelper.initScrapper('Facebook => Empregos SP', {
          crawlFeedFunction: ScrapperFacebook.crawlPageFeed
        }, PagePattern.Feed, 'https://www.facebook.com/groups/empregosessp/', {
          country: "Brazil",
          stateCode: "SP",
          city: "São Paulo",
        })


        await BotHelper.initScrapper('Facebook => Vagas de Empregos SP', {
          crawlFeedFunction: ScrapperFacebook.crawlPageFeed
        }, PagePattern.Feed, 'https://www.facebook.com/groups/508765489527560/', {
          country: "Brazil",
          stateCode: "SP",
          city: "São Paulo",
        })


        await BotHelper.initScrapper('Facebook => Vagas de Empregos SP', {
          crawlFeedFunction: ScrapperFacebook.crawlPageFeed
        }, PagePattern.Feed, 'https://www.facebook.com/groups/508765489527560/', {
          country: "Brazil",
          stateCode: "SP",
          city: "São Paulo",
        })



        await BotHelper.initScrapper('Facebook => Empregos em Osasco', {
          crawlFeedFunction: ScrapperFacebook.crawlPageFeed
        }, PagePattern.Feed, 'https://www.facebook.com/groups/252483528524808/', {
          country: "Brazil",
          stateCode: "SP",
          city: "Osasco",
        })

        await BotHelper.initScrapper('Facebook => Empregos Marilia - SP', {
          crawlFeedFunction: ScrapperFacebook.crawlPageFeed
        }, PagePattern.Feed, 'https://www.facebook.com/groups/empregosmariliasp/', {
          country: "Brazil",
          stateCode: "SP",
          city: "Marília",
        })

        await BotHelper.initScrapper('Facebook => Empregos Marilia SP', {
          crawlFeedFunction: ScrapperFacebook.crawlPageFeed
        }, PagePattern.Feed, 'https://www.facebook.com/groups/901278506627755/', {
          country: "Brazil",
          stateCode: "SP",
          city: "Marília",
        })

        await BotHelper.initScrapper('Facebook => Ribeirao Preto', {
          crawlFeedFunction: ScrapperFacebook.crawlPageFeed
        }, PagePattern.Feed, 'https://www.facebook.com/groups/923149231033037/', {
          country: "Brazil",
          stateCode: "SP",
          city: "Ribeirão Preto",
        })
      }
      catch (error) {
        console.log('Failed to run standard scrappers');
        console.error(error);

      }

    })

    // highly active groups
    cron.schedule("0 */4 * * *", async () => {

      try {
        // SAO PAULO ========================================

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


      }
      catch (error) {
        console.log('Failed to run frequent scrappers');
        console.error(error);

      }




    });


  }

  // public static initializeJobPoster = () => {
  //   cron.schedule("0 */8 * * *", async () => {

  //     console.log(`🤖: Starting job poster bot - MARKETING POST`);


  //     PosterFacebook.triggerMarketingPost();



  //   })
  //   cron.schedule("0 0 * * *", async () => {

  //     // Random posts are useful to avoid a bot like behaviour in our account.
  //     console.log(`🤖: Starting job poster bot - RANDOM POST`);

  //     PosterFacebook.triggerRandomPostComments();




  //   })



  // }

  public static initializeJobPostSchedulers = () => {
    cron.schedule("0 */2 * * *", async () => {


      const randomPostSP = await PuppeteerBot.getRandomPost("SP")
      if (randomPostSP) {
        await RecurPostSocialSchedulerBot.schedulePost(randomPostSP);
      }

      const randomPostES = await PuppeteerBot.getRandomPost("ES")
      if (randomPostES) {
        await ZohoSocialSchedulerBot.schedulePost(randomPostES);
      }

    })
  }

}
