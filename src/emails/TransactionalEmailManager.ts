import { readFileSync } from 'fs';
import moment from 'moment-timezone';

import { Lead } from '../resources/Lead/lead.model';
import { Log } from '../resources/Log/log.model';
import { User } from '../resources/User/user.model';
import { EncryptionHelper } from '../utils/EncryptionHelper';
import { LanguageHelper } from '../utils/LanguageHelper';
import { TextHelper } from '../utils/TextHelper';
import { emailProviders } from './constants/emailProviders.constant';

export enum EmailType {
  Html = "Html",
  Text = "Text"
}

export interface IEmailProvider {
  key: string,
  freeTierThreshold: number
  emailSendingFunction: Function
}


export class TransactionalEmailManager {
  public emailProviders: IEmailProvider[]

  constructor() {
    this.emailProviders = emailProviders
  }

  public async smartSend(to: string | undefined, from: string | undefined, subject: string, html: string, text: string) {

    console.log('Smart sending email...');

    // loop through email providers and check which one has an unmet free tier threshold.
    for (const emailProvider of this.emailProviders) {

      const today = moment.tz(new Date(), process.env.TIMEZONE).format('YYYY-MM-DD[T00:00:00.000Z]');

      try {
        const providerEmailsToday = await Log.find({
          action: `${emailProvider.key}_EMAIL_SUBMISSION`,
          createdAt: { "$gte": today }
        })


        if (providerEmailsToday.length < emailProvider.freeTierThreshold) {

          console.log(`Using ${emailProvider.key} to submit email...`);

          console.log(`Free tier balance today: ${providerEmailsToday.length}/${emailProvider.freeTierThreshold}`);

          // check if we should skip this user submission or not

          const user = await User.findOne({ email: to })
          const lead = await Lead.findOne({ email: to })

          if ((user?.emailSubscriptionStatus.transactional === false) || (!lead?.emailSubscriptionStatus.transactional === false)) {
            console.log(`Skipping email submission to unsubscribed user`);
            return
          }

          // insert unsubscribe link

          let htmlWithUnsubscribeLink;

          if (!to) {
            console.log('You should provide a valid "to" email');
            return
          }

          // here we encrypt the to email for security purposes
          const encryptionHelper = new EncryptionHelper();
          const encryptedEmail = encryptionHelper.encrypt(to);

          htmlWithUnsubscribeLink = html.replace('[Unsubscribe Link]', LanguageHelper.getLanguageString(null, 'unsubscribeLink', {
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


          return
        }
      }
      catch (error) {
        console.log(`Failed to submit email through ${emailProvider.key}`);
        console.error(error);
      }
    }
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
