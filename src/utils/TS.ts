import { globalStrings } from '../constants/global.lang';
import { TextHelper } from './TextHelper';


export class TS {


  public static replaceTemplateStrings = (str: string, customVars: object) => {
    const customVarsKeys = Object.keys(customVars);
    if (customVarsKeys) {
      for (const k of customVarsKeys) {
        str = str.replace(new RegExp(`{{${k}}}`, 'g'), customVars[k]);
      }
    }

    return str

  }

  public static string = (
    model: any = null,
    key: string,
    customVars: object = {}
  ) => {
    if (!model) {
      // pass only the global strings
      return TS.replaceTemplateStrings(globalStrings[key][process.env.LANGUAGE], customVars)

    }

    // load language strings for a specific model

    const {
      strings
    } = require(`../resources/${TextHelper.capitalizeFirstLetter(
      model
    )}/${model}.lang.ts`);

    // add our global generic strings
    const languageStrings = {
      ...strings,
      ...globalStrings
    };

    let string: string = languageStrings[key][process.env.LANGUAGE || 0];
    const customVarsKeys = Object.keys(customVars);
    if (customVarsKeys) {
      for (const k of customVarsKeys) {
        string = string.replace(new RegExp(`{{${k}}}`, 'g'), customVars[k]);
      }
    }

    return string;
  };
}
