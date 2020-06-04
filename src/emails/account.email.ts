import { EnvType } from '../constants/types/env.types';
import { EmailQueue } from '../resources/EmailQueue/emailqueue.model';
import { EmailType, TransactionalEmailManager } from './TransactionalEmailManager';


export class AccountEmailManager extends TransactionalEmailManager {

  public async newAccount(
    to: string,
    subject: string,
    template: string,
    customVars: object
  ) {

    if (process.env.ENV === EnvType.Development) {
      console.log(
        "Skipping sending new account email... Option only available in production."
      );
      return
    }

    console.log("Sending new account email...");
    const htmlEmail = this.loadTemplate(
      EmailType.Html,
      template,
      customVars
    );
    const textEmail = this.loadTemplate(
      EmailType.Text,
      template,
      customVars
    );

    this.smartSend(
      to,
      process.env.ADMIN_EMAIL,
      subject,
      htmlEmail,
      textEmail
    );

  }
  public async postEmailNotification(to: string,
    subject: string,
    template: string,
    customVars: object) {

    if (process.env.ENV === EnvType.Development) {
      console.log(
        "Skipping sending notification email... Option only available in production."
      );
      return
    }
    const htmlEmail = this.loadTemplate(
      EmailType.Html,
      template,
      customVars
    );
    const textEmail = this.loadTemplate(
      EmailType.Text,
      template,
      customVars
    );

    // if email is yahoo or outlook/hotmail (that are more restrictive in terms of email submission per hour), add to queue.

    if (to.includes('yahoo') || to.includes('hotmail') || to.includes('outlook')) {
      console.log(`💌 Adding job notification to email queue: ${to} => ${subject}`);
      // Add to queue, so we can submit it later
      const addEmailQueue = new EmailQueue({
        subject,
        htmlEmail,
        textEmail,
        from: process.env.ADMIN_EMAIL,
        to
      })
      await addEmailQueue.save();
      return
    }

    // if its gmail or other, send right away!

    await this.smartSend(
      to,
      process.env.ADMIN_EMAIL,
      subject,
      htmlEmail,
      textEmail
    );







  }
}
