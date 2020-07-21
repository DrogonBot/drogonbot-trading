import moment = require('moment');

import { DEFAULT_FORMATTED_DATE } from '../constants/global.constant';
import { INDICATOR_DATE_FORMAT } from '../trading/indicators/constant/indicator.constant';




export class D {

  public static convertNodeTSToDate = (nodeTimestamp: Date, format: string) => {
    return moment(nodeTimestamp).format(format)
  }

  public static format = (date: Date) => moment(date).format(DEFAULT_FORMATTED_DATE)
  public static indicatorDateFormat = (date: Date) => moment(date).format(INDICATOR_DATE_FORMAT)


}
