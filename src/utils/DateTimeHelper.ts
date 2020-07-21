import moment = require('moment');

import { DEFAULT_FORMATTED_DATE } from '../constants/global.constant';




export class DateTimeHelper {

  public static convertNodeTSToDate = (nodeTimestamp: Date, format: string) => {
    return moment(nodeTimestamp).format(format)
  }

  public static formattedDate = (date: Date) => moment(date).format(DEFAULT_FORMATTED_DATE)


}