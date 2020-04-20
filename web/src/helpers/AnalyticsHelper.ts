import ReactGA from 'react-ga';

export class AnalyticsHelper {
  public static initGA = () => {
    console.log("GA init");
    ReactGA.initialize("UA-156516010-2"); // EmpregoUrgenteWeb property
  };

  public static logPageView = () => {
    console.log(`Logging pageview for ${window.location.pathname}`);
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  };

  public static logEvent = (category: string = "", action: string = "") => {
    if (category && action) {
      console.log(`Logging event: category - ${category} | action: ${action}`);
      ReactGA.event({ category, action });
    }
  };

  public static logException = (
    description: string = "",
    fatal: boolean = false
  ) => {
    if (description) {
      ReactGA.exception({ description, fatal });
    }
  };
}
