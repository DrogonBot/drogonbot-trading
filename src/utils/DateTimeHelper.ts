import moment = require('moment');

import { DEFAULT_FORMATTED_DATE } from '../constants/global.constant';
import { TradingDataInterval } from '../trading/constant/tradingdata.constant';
import { DATE_KEY_FORMAT } from '../trading/indicators/constant/indicator.constant';




export class D {

  public static convertNodeTSToDate = (nodeTimestamp: Date, format: string) => {
    return moment(nodeTimestamp).format(format)
  }

  public static format = (date: Date) => moment(date).format(DEFAULT_FORMATTED_DATE)
  public static indicatorFormat = (date: Date) => moment(date).format(DATE_KEY_FORMAT)


  public static convertIntervalToMomentInterval = (interval: TradingDataInterval) => {

    switch (interval) {
      case TradingDataInterval.Daily:
        return "day"
      case TradingDataInterval.Monthly:
        return "month"
      case TradingDataInterval.Weekly:
        return "week"
      case TradingDataInterval.IntraDay:
        return "hour"
    }


  }


}
