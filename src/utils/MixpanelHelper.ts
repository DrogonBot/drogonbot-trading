import Mixpanel from 'mixpanel';





export class MixpanelHelper {

  public static mixpanel;

  public static init() {
    MixpanelHelper.mixpanel = Mixpanel.init(process.env.ANALYTICS_MIXPANEL_TOKEN || "")


  }

}