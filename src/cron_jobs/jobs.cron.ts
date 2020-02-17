import cron from 'node-cron';

import { IPostApplicationStatus, Post } from '../resources/Post/post.model';

export class JobsCron {
  public static submitApplications() {
    console.log("starting JobsCron...");

    // Send one resume every 10 minutes only (*/10 * * * *)

    cron.schedule("* * * * *", async () => {

      // find all posts with pending application status (email not submitted yet!)
      const jobPosts = await Post.find({
        'applications.status': IPostApplicationStatus.Pending
      });

      for (const post of jobPosts) {

        // get applications and send user resume







      }




    });
  }
}
