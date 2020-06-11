export enum EnvironmentTypes {
  Production = "Production",
  Staging = "Staging",
  Development = "Development",
}

export enum AvailableLanguages {
  eng = "eng",
  ptBr = "ptBr",
}

const ENV: string = EnvironmentTypes.Production; // set the current environment here

const defineServerUrl = () => {
  // Solution if fails to connect: https://stackoverflow.com/questions/33704130/react-native-android-fetch-failing-on-connection-to-local-api

  // You must use LAN on Expo developer tools settings, otherwise it won't map the docker container.

  switch (ENV) {
    case EnvironmentTypes.Development:
      return "http://localhost:3000";

    case EnvironmentTypes.Production:
      return "https://admin.empregourgente.com/";

    case EnvironmentTypes.Staging:
      return "https://staging.empregourgente.com:3000";
  }
};

export const appEnv = {
  appName: "Emprego Urgente",
  appNameFull: "Emprego Urgente LLC",
  appPrivacyPolicyUrl: "https://empregourgente.com/privacy",
  appUrl: "https://empregourgente.com",
  appState: "British Columbia",
  appAddress: "18th Street",
  appCity: "North Vancouver",
  appCountry: "Canada",
  appEmail: "admin@empregourgente.com",
  language: AvailableLanguages.ptBr,
  serverUrl: defineServerUrl(), // current serverUrl
};
