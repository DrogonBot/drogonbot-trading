import { EnvType } from '@drogonbot/types';

import { EmailType, TransactionalEmailManager } from './TransactionalEmailManager';


export class GenericEmailManager extends TransactionalEmailManager {
  public sendEmail(
    to: string | undefined,
    subject: string,
    template: string,
    customVars: object
  ): void {
    switch (process.env.ENV) {
      case EnvType.Development:
      case EnvType.Staging:
        console.log(
          "Skipping sending new account email... Option only available in production."
        );
        break;

      case EnvType.Production:
        console.log(`Sending email to ${to} - ${subject}`);
        // console.log({
        //   to,
        //   subject,
        //   template,
        //   customVars
        // });
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
          process.env.SUPPORT_EMAIL,
          subject,
          htmlEmail,
          textEmail
        );

        break;
    }
  }
}
