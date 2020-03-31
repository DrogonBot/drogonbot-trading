import Mixpanel from 'mixpanel';

import { EnvType } from '../constants/types/env.types';

export enum MixpanelEvent {
  USER_LOGIN = "USER_LOGIN",
  USER_REGISTER = "USER_REGISTER",
  USER_RESET_PASSWORD = "USER_RESET_PASSWORD",
  USER_RESET_PASSWORD_LINK = "USER_RESET_PASSWORD_LINK",
  USER_LOGOUT = "USER_LOGOUT",
  USER_CHANGE_PASSWORD = "USER_CHANGE_PASSWORD"
}



export class MixpanelHelper {

  public static mixpanel;

  public static init() {
    MixpanelHelper.mixpanel = Mixpanel.init(process.env.ANALYTICS_MIXPANEL_TOKEN || "")
  }

  public static track(event: MixpanelEvent, customData: object) {
    if (process.env.ENV === EnvType.Production) {
      console.log(`📈 Mixpanel: registered event ${event}`);
      MixpanelHelper.mixpanel.track(event, customData)
    } else {
      console.log(`📈 Mixpanel: Skipping event tracking of ${event}, since we are on Development mode`);
    }
  }

  public static peopleSet(userId: string, customData: object) {
    if (process.env.ENV === EnvType.Production) {
      console.log(`📈 Mixpanel: registering person...`);
      MixpanelHelper.mixpanel.people.set(userId, customData)
    } else {
      console.log(`📈 Mixpanel: Skipping registering person, since we are on development mode`);
    }
  }

}