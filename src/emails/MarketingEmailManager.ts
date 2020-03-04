import Mailchimp from 'mailchimp-api-v3';

import { EnvType } from '../constants/types/env.types';

export interface ILists {
  default: string | undefined;
}

export class MarketingEmailManager {
  private _mailchimpApiKey: string | undefined;
  private lists: ILists;
  public mailchimp: any;
  constructor() {
    this._mailchimpApiKey = process.env.MAILCHIMP_API_KEY;
    this.mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY || "");
    this.lists = {
      default: process.env.MAILCHIMP_DEFAULT_LIST
    };
  }

  public async subscribe(
    email: string,
    callback?: () => any,
    listId: string | undefined = this.lists.default
  ) {
    switch (process.env.ENV) {
      case EnvType.Staging:
      case EnvType.Development:
        console.log(
          `Skipping adding new lead (${email}) to e-mail list (${listId}) under apiKey ${this._mailchimpApiKey}. Function only available in production`
        );
        break;
      case EnvType.Production:
        console.log(
          `adding new lead (${email}) to e-mail list (${listId}) under apiKey ${this._mailchimpApiKey}`
        );

        const payload = {
          members: [
            {
              email_address: email,
              email_type: "text",
              status: "subscribed"
            }
          ]
        };

        await this.mailchimp.post(`/lists/${listId}`, payload, () => {
          if (callback) {
            callback();
          }
        });
        break;
    }
  }
}
