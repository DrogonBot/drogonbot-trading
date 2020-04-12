import { appEnv } from '../constants/Env.constant';
import { globalStrings } from '../languages/global.lang';

export class TS {
  public static replaceTemplateStrings = (str: string, customVars: object) => {
    const customVarsKeys = Object.keys(customVars);
    if (customVarsKeys) {
      for (const k of customVarsKeys) {
        str = str.replace(new RegExp(`{{${k}}}`, "g"), customVars[k]);
      }
    }

    return str;
  };

  public static string = (
    model: any = null,
    key: string,
    customVars: object = {}
  ) => {
    if (!model) {
      // pass only the global strings
      return TS.replaceTemplateStrings(
        globalStrings[key][appEnv.language],
        customVars
      );
    }

    // load language strings for a specific model

    const { strings } = require(`../languages/${model}.lang.ts`);

    // add our global generic strings
    const languageStrings = {
      ...strings,
      ...globalStrings
    };

    let string: string = languageStrings[key][appEnv.language];
    const customVarsKeys = Object.keys(customVars);
    if (customVarsKeys) {
      for (const k of customVarsKeys) {
        string = string.replace(new RegExp(`{{${k}}}`, "g"), customVars[k]);
      }
    }

    return string;
  };
}
