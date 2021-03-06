import { emailProviders, IEmailProvider } from '@drogonbot/constants';
import { EncryptionHelper, TextHelper } from '@drogonbot/helpers';
import { readFileSync } from 'fs';
import moment from 'moment-timezone';

import { TS } from '../libs/TS';
import { Log } from '../resources/Log/log.model';
import { User } from '../resources/User/user.model';


export enum EmailType {
  Html = "Html",
  Text = "Text"
}


export class TransactionalEmailManager {
  public emailProviders: IEmailProvider[]

  constructor() {
    this.emailProviders = emailProviders
  }

  public async smartSend(to: string | undefined, from: string | undefined, subject: string, html: string, text: string): Promise<boolean> {

    const today = moment.tz(new Date(), process.env.TIMEZONE).format('YYYY-MM-DD[T00:00:00.000Z]');


    // loop through email providers and check which one has an unmet free tier threshold.
    for (const emailProvider of this.emailProviders) {


      try {
        const providerEmailsToday = await Log.find({
          action: `${emailProvider.key}_EMAIL_SUBMISSION`,
          createdAt: { "$gte": today }
        })


        if (providerEmailsToday.length < emailProvider.credits) {

          console.log('Smart sending email...');

          console.log(`Using ${emailProvider.key} to submit email...`);

          console.log(`Credits balance today: ${providerEmailsToday.length}/${emailProvider.credits}`);

          // Unsubscribed users: check if we should skip this user submission or not

          const user = await User.findOne({ email: to })

          if ((user?.unsubscribed === true)) {
            console.log(`Skipping email submission to unsubscribed user`);
            return true
          }

          // insert unsubscribe link into [Unsubscribe Link] tag
          let htmlWithUnsubscribeLink;

          if (!to) {
            console.log('You should provide a valid "to" email');
            return false
          }

          // here we encrypt the to email for security purposes
          const encryptionHelper = new EncryptionHelper();
          const encryptedEmail = encryptionHelper.encrypt(to);

          htmlWithUnsubscribeLink = html.replace('[Unsubscribe Link]', TS.string(null, 'unsubscribeLink', {
            unsubscribeUrl: `${process.env.API_URL}/unsubscribe?hashEmail=${encryptedEmail}&lang=${process.env.LANGUAGE}`
          }))



          await emailProvider.emailSendingFunction(
            to,
            process.env.ADMIN_EMAIL,
            subject,
            htmlWithUnsubscribeLink,
            text
          );

          // register submission in our logs, so we can keep track of whats being sent
          const newEmailProviderLog = new Log({
            action: `${emailProvider.key}_EMAIL_SUBMISSION`,
            emitter: from,
            target: to
          })
          await newEmailProviderLog.save()


          return true
        }



      }
      catch (error) {
        console.log(`Failed to submit email through ${emailProvider.key}`);
        console.error(error);
        return false;
      }

    }

    // if we reach this point, it means that there's no providers with credits left!



    return false
  }




  public loadTemplate(type: EmailType, template: string, customVars: object) {
    let extension;

    if (type === EmailType.Html) {
      extension = ".html";
    } else if (type === EmailType.Text) {
      extension = ".txt";
    }

    const data = readFileSync(
      `${process.env.TEMPLATES_FOLDER}/${template}/content${extension}`,
      "utf-8"
    ).toString();

    return this.replaceTemplateCustomVars(data, customVars);
  }

  private replaceTemplateCustomVars(html: string, customVars: object): string {
    const keys = Object.keys(customVars);

    const globalTemplateVars = {
      "Product Name": process.env.GLOBAL_VAR_PRODUCT_NAME,
      "Sender Name": process.env.GLOBAL_VAR_SENDER_NAME,
      "Company Name, LLC": process.env.GLOBAL_VAR_COMPANY_NAME_LLC,
      "Company Address": process.env.GLOBAL_VAR_COMPANY_ADDRESS,

    }


    const globalKeys = Object.keys(globalTemplateVars);

    if (keys) {
      for (const key of keys) {
        html = TextHelper.replaceAll(html, `{{${key}}}`, customVars[key]);
      }
    }

    if (globalKeys) {
      for (const globalKey of globalKeys) {

        html = TextHelper.replaceAll(
          html,
          `[${globalKey}]`,
          globalTemplateVars[globalKey]
        );
      }
    }

    return html;
  }
}
