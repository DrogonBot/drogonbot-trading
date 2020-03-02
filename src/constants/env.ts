import { devServerConfig } from './serverConfig.dev';
import { prodServerConfig } from './serverConfig.prod';
import { stagServerConfig } from './serverConfig.stag';
import { AvailableLanguages, EnvType, IServerConfig } from './types/env.types';


/*#############################################################|
|  >>> SERVER CONFIGURATION DEFINITION
*##############################################################*/

let serverConfig: IServerConfig;

// ! SELECT WHICH SERVER ENVIRONMENT TO USE (Development, Production, Staging)
export const ENV: string = EnvType.Development; // Select which environment to use here

export const APP_NAME = "Emprego Urgente";
export const SUPPORT_EMAIL = "admin@empregourgente.com";
export const ADMIN_EMAIL = "admin@empregourgente.com";
export const LANGUAGE = AvailableLanguages.ptBr

switch (ENV) {
  case EnvType.Development:
    serverConfig = devServerConfig;
    break;
  case EnvType.Production:
    serverConfig = prodServerConfig;
    break;
  case EnvType.Staging:
    serverConfig = stagServerConfig;
    break;
}

export { serverConfig };
