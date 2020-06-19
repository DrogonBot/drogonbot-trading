import cron from 'node-cron';

import { MAX_JOB_NOTIFICATIONS_PER_HOUR_INTERVAL } from '../constants/email.constants';
import { AccountEmailManager } from '../emails/account.email';
import { EmailQueue } from '../resources/EmailQueue/emailqueue.model';
import { GenericHelper } from '../utils/GenericHelper';


export class EmailQueueCron {
  public static submitQueueEmails() {

    // Once per hour
    cron.schedule("0 * * * *", async () => {

      console.log("🕒  EmailQueueCron: Initializing... 🕒");

      const allEmails = await EmailQueue.find({}).limit(MAX_JOB_NOTIFICATIONS_PER_HOUR_INTERVAL);


      for (const email of allEmails) {

        const accountEmail = new AccountEmailManager()

        // try to submit an email (it will depend it we have enough credits!)
        const submissionStatus = await accountEmail.smartSend(email.to, email.from, email.subject, email.htmlEmail, email.textEmail)

        if (submissionStatus === true) { // it means this email was submitted successfully!
          // clean our db
          await email.remove()


          await GenericHelper.sleep(1000 * ((60 / MAX_JOB_NOTIFICATIONS_PER_HOUR_INTERVAL) * 100)) // spread it between 1 hour

        }
      }


      // send and set status equals to false

    });

  }
}