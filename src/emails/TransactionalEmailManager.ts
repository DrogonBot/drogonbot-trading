import sgMail from '@sendgrid/mail';
import { readFileSync } from 'fs';
import mailjet from 'node-mailjet';

import { Log } from '../resources/Log/log.model';
import { TextHelper } from '../utils/TextHelper';


export enum EmailType {
  Html = "Html",
  Text = "Text"
}


export class TransactionalEmailManager {
  private _apiKey: string | undefined;
  public sendGrid: any;

  constructor() {
    this._apiKey = process.env.SENDGRID_API_KEY;
    this.sendGrid = sgMail;
    this.sendGrid.setApiKey(this._apiKey);
  }

  public async smartSend(to: string, from: string | undefined, subject: string, html: string, text: string) {

    console.log('Smart sending email...');


    try {
      // check how many submissions for sendgrid today
      const sendGridFreeTierThreshold = 1300; // We're under sendgrid free trial 40k emails month for now
      const sendGridEmailsToday = await Log.find({
        action: "SENDGRID_EMAIL_SUBMISSION",
        emitter: from,
        target: to
      })



      if (sendGridEmailsToday.length < sendGridFreeTierThreshold) {
        // use sendgrid
        console.log('Using sendgrid to submit email...');

        await this.sendGrid.send({
          to,
          from: process.env.ADMIN_EMAIL,
          subject,
          html,
          text
        });

        // register sendgrid submission in our logs!

        const newSendgridLog = new Log({
          action: "SENDGRID_EMAIL_SUBMISSION",
          emitter: from,
          target: to
        })
        await newSendgridLog.save()

        return
      }
    }
    catch (error) {
      console.log('Failed to submit email through SENDGRID');
      console.error(error);

    }

    // if sendgrid is not available for free anymore, lets try mailJet

    try {
      const mailJetFreeTierDailyThreshold = 200;
      const mailJetEmailsToday = await Log.find({
        action: "MAILJET_EMAIL_SUBMISSION",
        emitter: from,
        target: to
      })

      if (mailJetEmailsToday.length < mailJetFreeTierDailyThreshold) {

        console.log('Using mailjet to submit email...');

        const mailjetClient = mailjet.connect(
          process.env.MAILJET_API_KEY_PUBLIC,
          process.env.MAILJET_API_KEY_PRIVATE
        );

        try {
          await mailjetClient.post("send", { version: 'v3.1' }).request(
            {
              "Messages": [
                {
                  "From": {
                    "Email": from,
                  },
                  "To": [
                    {
                      "Email": to,
                    }
                  ],
                  "Subject": subject,
                  "TextPart": text,
                  "HTMLPart": html
                }
              ]
            }
          );
        }
        catch (error) {
          console.error(error);
        }

        // register mailjet submission in our logs!

        const newMailJetLog = new Log({
          action: "MAILJET_EMAIL_SUBMISSION",
          emitter: from,
          target: to
        })
        await newMailJetLog.save()

        return
      }
    }
    catch (error) {
      console.log('Failed to submit email through MailJet');
      console.error(error);

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
      "Company Address": process.env.GLOBAL_VAR_COMPANY_ADDRESS
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
