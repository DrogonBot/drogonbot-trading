import { LANGUAGE } from '../constants/env';
import { globalStrings } from '../lang/global.lang';
import { TextHelper } from '../utils/TextHelper';

// load proper language strings, accordingly to the server language settings

export class LanguageHelper {


  public static replaceTemplateStrings = (str: string, customVars: object) => {
    const customVarsKeys = Object.keys(customVars);
    if (customVarsKeys) {
      for (const k of customVarsKeys) {
        str = str.replace(new RegExp(`{{${k}}}`, 'g'), customVars[k]);
      }
    }

    return str

  }

  public static getLanguageString = (
    model: any = null,
    key: string,
    customVars: object = {}
  ) => {
    if (!model) {
      // pass only the global strings
      return LanguageHelper.replaceTemplateStrings(globalStrings[key][LANGUAGE], customVars)

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

    let string: string = languageStrings[key][LANGUAGE];
    const customVarsKeys = Object.keys(customVars);
    if (customVarsKeys) {
      for (const k of customVarsKeys) {
        string = string.replace(new RegExp(`{{${k}}}`, 'g'), customVars[k]);
      }
    }

    return string;
  };
}
