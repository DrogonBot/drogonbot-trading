import _ from 'lodash';
import moment from 'moment';

import { AssetPrice } from '../../resources/AssetPrice/assetprice.model';
import { TradingDataInterval } from '../constant/tradingdata.constant';
import { INDICATOR_DATE_FORMAT } from './constant/indicator.constant';



export class ATRHelper {

  public static calculate = async (symbol: string, interval: TradingDataInterval, period: number) => {

    const priceData = await AssetPrice.find({ symbol, interval }).sort({ "date": "asc" })

    // Start by calculating TR
    const TR: Array<{ date: Date, value: number }> = [];

    for (let x = 0; x < priceData.length; x++) {

      const currentPrice = priceData[x];
      const previousClose = priceData[x - 1] ? priceData[x - 1].close : 0

      const currentHighMinusCurrentLow = currentPrice.high - currentPrice.low
      const absCurrentHighMinusPrevClose = Math.abs(currentPrice.high - previousClose)
      const absCurrentLowMinusPrevClose = Math.abs(currentPrice.low - previousClose)

      const max = Math.max(currentHighMinusCurrentLow, absCurrentHighMinusPrevClose, absCurrentLowMinusPrevClose)

      TR.push({
        date: priceData[x].date,
        value: max
      })

    }

    const TRSlice = _.slice(TR, 0, period)
    const TRRemainder = _.slice(TR, period, TR.length)
    const TRSliceSum = TRSlice.reduce((total, element) => total + element.value, 0);
    const firstATR = TRSliceSum / period
    const firstATRDate = TRSlice[TRSlice.length - 1].date

    // insert first ATR calculation

    const ATR = [
      {
        name: "ATR",
        interval,
        period,
        date: firstATRDate,
        value: firstATR
      }
    ]

    let i = 0;
    while (TRRemainder[i] !== undefined) {

      const priorATR = ATR[ATR.length - 1].value
      const currentTR = TR.find((item) => item.date === TRRemainder[i].date)!.value

      const ATRcalc = ((priorATR * (period - 1)) + currentTR) / period

      ATR.push({
        name: "ATR",
        interval,
        period,
        date: TRRemainder[i].date,
        value: ATRcalc
      })

      i++;
    }



    // parse it to support date as key
    const parsedOutput = {}

    for (let x = 0; x < ATR.length; x++) {
      const date = moment(ATR[x].date).format(INDICATOR_DATE_FORMAT);
      delete ATR[x].date;
      parsedOutput[date] = ATR[x]
    }

    return parsedOutput


















  }



}