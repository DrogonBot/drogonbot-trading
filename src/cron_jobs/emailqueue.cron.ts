import _ from 'lodash';
import cron from 'node-cron';

import { MAX_JOB_NOTIFICATIONS_PER_MINUTE_INTERVAL } from '../constants/email.constants';
import { AccountEmailManager } from '../emails/account.email';
import { EmailQueue } from '../resources/EmailQueue/emailqueue.model';


export class EmailQueueCron {
  public static submitQueueEmails() {

    console.log("🕒  EmailQueueCron: Initializing... 🕒");

    cron.schedule("* * * * *", async () => {

      const allEmails = await EmailQueue.find({});



      // select only 3 emails per minute

      const emailsToSubmit = _.slice(allEmails, 0, MAX_JOB_NOTIFICATIONS_PER_MINUTE_INTERVAL);

      for (const email of emailsToSubmit) {

        const accountEmail = new AccountEmailManager()
        const submissionStatus = await accountEmail.smartSend(email.to, email.from, email.subject, email.htmlEmail, email.textEmail)


        if (submissionStatus === true) { // it means this email was submitted successfully!
          // clean our db
          await email.remove()
        }
      }


      // send and set status equals to false

    });

  }
}