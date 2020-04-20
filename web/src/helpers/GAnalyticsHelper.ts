import ReactGA from 'react-ga';

import { appEnv, ENV } from '../constants/Env.constant';
import { EnvironmentTypes } from '../types/Global.types';

export class GAnalyticsHelper {
  public static initGA = () => {
    if (ENV === EnvironmentTypes.Development) {
      console.log("📈 GA: Skipping initialization on development mode");
      return;
    }

    ReactGA.initialize(appEnv.monitoring.googleAnalytics.UA.web); // EmpregoUrgenteWeb property
  };

  public static logPageView = () => {
    if (ENV === EnvironmentTypes.Development) {
      console.log(
        `📈 Skipping logging pageview for ${window.location.pathname} - we're running on development mode!`
      );
      return;
    }

    console.log(`📈 Logging pageview for ${window.location.pathname}`);
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  };

  public static logEvent = (category: string = "", action: string = "") => {
    if (ENV === EnvironmentTypes.Development) {
      console.log(
        `📈 GA: Skipping Logging event: category - ${category} | action: ${action} - we're on development mode`
      );
      return;
    }

    if (category && action) {
      console.log(
        `📈 Logging event: category - ${category} | action: ${action}`
      );
      ReactGA.event({ category, action });
    }
  };

  public static logException = (
    description: string = "",
    fatal: boolean = false
  ) => {
    if (description) {
      if (ENV === EnvironmentTypes.Development) {
        console.log(
          `📈 GA: Skipping exception logging. We're on development mode`
        );
        return;
      }

      ReactGA.exception({ description, fatal });
    }
  };
}
