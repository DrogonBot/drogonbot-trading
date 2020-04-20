// @ts-ignore
import { AvailableLanguages, EnvironmentTypes } from '../types/Global.types';

export const ENV: string = EnvironmentTypes.Development; // set the current environment here

const defineServerUrl = () => {
  // Solution if fails to connect: https://stackoverflow.com/questions/33704130/react-native-android-fetch-failing-on-connection-to-local-api

  // You must use LAN on Expo developer tools settings, otherwise it won't map the docker container.

  switch (ENV) {
    case EnvironmentTypes.Production:
      // Next.JS will break on Router.push if we're not checking where specifically to submit our requests. Tricky issue, but only happens on development.
      // For more info, please check: https://github.com/apollographql/apollo-link/issues/375

      if (typeof window === "undefined") {
        return "http://app-api:3000"; // were running on server
      } else {
        return "http://localhost:3000"; // we're running on a browser
      }

    case EnvironmentTypes.Production:
      return "https://api.empregourgente.com";

    case EnvironmentTypes.Staging:
      return "https://staging.empregourgente.com";
  }
};

export const appEnv = {
  appName: "Emprego Urgente",
  appNameFull: "Emprego Urgente LLC",
  appPrivacyPolicyUrl: "https://empregourgente.com/privacy",
  appUrl: "https://empregourgente.com",
  appState: "ES",
  appAddress: "Av Hugo Musso",
  appCity: "Vila Velha",
  appCountry: "Brazil",
  appEmail: "admin@empregourgente.com",
  language: AvailableLanguages.ptBr,
  serverUrl: defineServerUrl(), // current serverUrl
  oauth: {
    // * REMEMBER: you should also configure app.json with proper ids
    google: {
      // * Docs: https://docs.expo.io/versions/latest/sdk/google/
      iosClientId:
        "1053239267142-p1ofcpk9lu4o3tom5lk29hf073dcstc3.apps.googleusercontent.com", // from GoogleService-Info.plist
      // from google developers console
      androidClientId:
        "1053239267142-a7cifhker3gn299guu0oer711g1go9r1.apps.googleusercontent.com",
      androidStandaloneAppClientId:
        "1053239267142-ejd570705r05ci422khsfsr5tt7qj2qs.apps.googleusercontent.com",
      iosStandaloneAppClientId:
        "1053239267142-ujhhl1gajisdavkp81qbtb16kfthabsn.apps.googleusercontent.com",
    },
    // * Docs: https://docs.expo.io/versions/latest/sdk/facebook/
    facebook: {
      appId: "635354810586069",
      appName: "Emprego Urgente",
    },
  },
  admob: {
    // * Docs: https://docs.expo.io/versions/latest/sdk/admob/
    // * REMEMBER: you should also configure app.json with proper ids
    enabled: true,
    adUnitID: "ca-app-pub-6892417234935549/5214954384",
  },
  onboarding: {
    // * Configure it at Onboarding.screen.tsx
    enabled: false,
  },
  monitoring: {
    sentry: {
      dns: "https://f71fae3a5cb8473a9d7e2c9f584e5de9@sentry.io/1887002",
      projectName: "emprego-urgente",
      organizationName: "emprego-urgente",
    },
    googleAnalytics: {
      UA: {
        mobile: "UA-156516010-1",
        web: "UA-156516010-2",
      },
    },
  },
};
