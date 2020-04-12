import 'moment/locale/pt-br';

import moment from 'moment';

import { appEnv } from '../constants/Env.constant';
import { AvailableLanguages } from '../types/Global.types';

export class DateHelper {
  public static displayHumanDate = (date: string) => {
    switch (appEnv.language) {
      case AvailableLanguages.ptBr:
        return moment(date)
          .locale("pt-br")
          .format("ddd, DD MMM YY");

      case AvailableLanguages.eng:
        return moment(date)
          .locale("en")
          .format("ddd, MMM Do YY");

      default:
        return moment(date)
          .locale("en")
          .format("ddd, MMM Do YY");
    }
  };

  private static _analyzeDate = (inputFormat, separator) => {
    const splittedData = inputFormat.split(separator);

    const dataComponentsPosition = {
      month: {
        index: 0,
        characters: 0
      },
      year: {
        index: 0,
        characters: 0
      },
      day: {
        index: 0,
        characters: 0
      }
    };

    // tslint:disable-next-line: forin
    for (const index in splittedData) {
      if (splittedData[index].includes("D")) {
        dataComponentsPosition.day.index = parseInt(index);
        dataComponentsPosition.day.characters = splittedData[index].length;
      }
      if (splittedData[index].includes("M")) {
        dataComponentsPosition.month.index = parseInt(index);
        dataComponentsPosition.month.characters = splittedData[index].length;
      }

      if (splittedData[index].includes("Y")) {
        dataComponentsPosition.year.index = parseInt(index);
        dataComponentsPosition.year.characters = splittedData[index].length;
      }
    }

    return dataComponentsPosition;
  };

  public static parseDataToServerFormat = (rawData, inputFormat, separator) => {
    const splittedRawData = rawData.split(separator);

    const analyzedInputFormat = DateHelper._analyzeDate(inputFormat, separator);

    const month = splittedRawData[analyzedInputFormat.month.index];
    const day = splittedRawData[analyzedInputFormat.day.index];
    const year = splittedRawData[analyzedInputFormat.year.index];

    // this function will always output to this format: MM/DD/YYYY (server accepted format)

    return `${month}${separator}${day}${separator}${year}`;
  };
}
