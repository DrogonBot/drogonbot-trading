
export enum EnvType {
  Development = "Development",
  Production = "Production",
  Staging = "Staging"
}

export enum AvailableLanguages {
  eng = "eng",
  ptBr = "ptBr"
}

interface IServerConfigApp {
  name: string,
  port: number,
  url: string,
  apiUrl: string,
  mongodbConnectionUrl: string
}

interface IServerConfigOAuth {
  gmail: object
}

interface IServerConfigEmail {
  supportEmail: string,
  mailchimpAPIKey: string,
  mailchimpDefaultList: string,
  sendGridAPIKey: string,
  templatesFolder: string,
  globalTemplateVars: object,
  oAuth: IServerConfigOAuth
}

interface IServerConfigTracking {
  mixpanelToken: string
}

export interface IServerConfig {
  app: IServerConfigApp,
  email: IServerConfigEmail,
  tracking: IServerConfigTracking,
  maintenanceMode: boolean,

  jwtSecret: string

}