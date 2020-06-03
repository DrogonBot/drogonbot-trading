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

      if (allEmails.length) {
        console.log(`Submitting ${MAX_JOB_NOTIFICATIONS_PER_MINUTE_INTERVAL} job-notifications emails on ${new Date()}`);
      }

      // select only 3 emails per minute

      const emailsToSubmit = _.slice(allEmails, 0, MAX_JOB_NOTIFICATIONS_PER_MINUTE_INTERVAL - 1);

      for (const email of emailsToSubmit) {

        const accountEmail = new AccountEmailManager()
        await accountEmail.smartSend(email.to, email.from, email.subject, email.htmlEmail, email.textEmail)

        // clean our db
        await email.remove()
      }


      // send and set status equals to false

    });

  }
}