import { ENV, SUPPORT_EMAIL } from '../constants/env';
import { EnvType } from '../constants/types/env.types';
import { EmailType, TransactionalEmailManager } from './TransactionalEmailManager';

export class GenericEmailManager extends TransactionalEmailManager {
  public sendEmail(
    to: string,
    subject: string,
    template: string,
    customVars: object
  ): void {
    switch (ENV) {
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

        this.sendGrid.send({
          to,
          from: SUPPORT_EMAIL,
          subject,
          html: htmlEmail,
          text: textEmail
        });

        break;
    }
  }
}
