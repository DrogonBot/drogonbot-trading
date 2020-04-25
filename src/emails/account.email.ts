import { EnvType } from '../constants/types/env.types';
import { EmailType, TransactionalEmailManager } from './TransactionalEmailManager';


export class AccountEmailManager extends TransactionalEmailManager {

  public newAccount(
    to: string,
    subject: string,
    template: string,
    customVars: object
  ): void {

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

    this.sendGrid.send({
      to,
      from: process.env.ADMIN_EMAIL,
      subject,
      html: htmlEmail,
      text: textEmail
    });

  }
  public postEmailNotification(to: string,
    subject: string,
    template: string,
    customVars: object) {

    // if (process.env.ENV === EnvType.Development) {
    //   console.log(
    //     "Skipping sending notification email... Option only available in production."
    //   );
    //   return
    // }

    console.log("Sending job notification email...");
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

    this.sendGrid.send({
      to,
      from: process.env.ADMIN_EMAIL,
      subject,
      html: htmlEmail,
      text: textEmail
    });



  }
}
