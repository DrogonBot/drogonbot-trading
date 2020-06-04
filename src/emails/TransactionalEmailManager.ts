import { readFileSync } from 'fs';
import moment from 'moment-timezone';

import { emailProviders, IEmailProvider } from '../constants/emailProviders.constant';
import { Lead } from '../resources/Lead/lead.model';
import { Log } from '../resources/Log/log.model';
import { User } from '../resources/User/user.model';
import { ConsoleColor, ConsoleHelper } from '../utils/ConsoleHelper';
import { EncryptionHelper } from '../utils/EncryptionHelper';
import { LanguageHelper } from '../utils/LanguageHelper';
import { TextHelper } from '../utils/TextHelper';

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

          // Unsubscribed users: check if we should skip this user submission or not

          const user = await User.findOne({ email: to })
          const lead = await Lead.findOne({ email: to })

          if ((user?.emailSubscriptionStatus.transactional === false) || (!lead?.emailSubscriptionStatus.transactional === false)) {
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


          return true
        }

        // if we reach this point, it means that there's no providers with credits left!


        ConsoleHelper.coloredLog(ConsoleColor.BgRed, ConsoleColor.FgWhite, `🤖: No email providers credits left! All e-mails will be left on queue`)



        return false;


      }
      catch (error) {
        console.log(`Failed to submit email through ${emailProvider.key}`);
        console.error(error);
        return false;
      }

    }
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
