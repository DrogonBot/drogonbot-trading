import { EnvType } from '../constants/types/env.types';
import { EmailType, TransactionalEmailManager } from './TransactionalEmailManager';


export class AccountEmailManager extends TransactionalEmailManager {

  public async sendEmail(
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

    return this.smartSend(
      to,
      process.env.ADMIN_EMAIL,
      subject,
      htmlEmail,
      textEmail
    );

  }

}
