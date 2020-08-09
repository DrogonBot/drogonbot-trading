import _ from 'lodash';
import moment from 'moment';

import { Quote } from '../../resources/Quote/quote.model';
import { NumberHelper } from '../../utils/NumberHelper';
import { TradingDataInterval } from '../constant/tradingdata.constant';
import { DATE_KEY_FORMAT } from './constant/indicator.constant';
import { IAssetIndicator, IndicatorSeriesType } from './types/indicator.types';




export class MovingAverageHelper {


  public static calculateEMA = async (ticker: string, period: number, seriesType: IndicatorSeriesType, interval: TradingDataInterval) => {

    // should be ascendant, full data
    const priceData = await Quote.find({ ticker, interval }).sort({ "date": "asc" })


    const firstData = _.slice(priceData, 0, period - 1)
    const firstDataSum = firstData.reduce((total, price) => total + price[seriesType], 0);
    const firstSMA = firstDataSum / period

    const k = 2 / (period + 1)
    const firstDate = moment(priceData[0].date).format(DATE_KEY_FORMAT)

    const output: IAssetIndicator[] = [
      {
        interval,
        seriesType,
        period,
        name: "EMA",
        date: firstDate,
        value: firstSMA
      }
    ];


    for (let i = 0; i < priceData.length; i++) {

      const latestEMA = output[output.length - 1].value
      const todayPrice = priceData[i][seriesType]

      const EMA = (todayPrice * k) + (latestEMA * (1 - k))

      output.push({
        interval,
        seriesType,
        period,
        name: "EMA",
        date: moment(priceData[i].date).format(DATE_KEY_FORMAT),
        value: NumberHelper.format(EMA)
      })
    }

    // parse it to support date as key
    const parsedOutput = {}

    for (let i = 0; i < output.length; i++) {
      const date = output[i].date;
      delete output[i].date;
      parsedOutput[date!] = output[i]
    }

    return parsedOutput
  }

  public static calculateSMA = async (ticker: string, interval: TradingDataInterval, period: number, seriesType) => {

    const priceData = await Quote.find({ ticker, interval }).sort({ "date": "asc" })

    let start = 0;
    let end = period;

    const output = {};

    while (priceData[end - 1] !== undefined) {

      const dataSlice = _.slice(priceData, start, end)

      const dataSliceSum = _.sumBy(dataSlice, (data) => data[seriesType])

      const SMA = dataSliceSum / period

      const date = moment(priceData[end - 1].date).format(DATE_KEY_FORMAT)

      output[date] = {
        name: "SMA",
        interval,
        seriesType,
        period,
        date,
        value: NumberHelper.format(SMA)
      }

      start++;
      end++;
    }



    return output;

  }

}