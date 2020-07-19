import _ from 'lodash';
import moment from 'moment';

import { INDICATOR_DATE_FORMAT } from '../../constants/indicator.constant';
import { DataInterval, IndicatorSeriesType } from '../../resources/Asset/asset.types';
import { AssetPrice } from '../../resources/AssetPrice/assetprice.model';


export class MovingAverageHelper {


  public static calculateEMA = async (symbol: string, period: number, seriesType: IndicatorSeriesType, interval: DataInterval) => {

    // should be ascendant, full data
    const priceData = await AssetPrice.find({ symbol, interval }).sort({ "date": "asc" })


    const firstData = _.slice(priceData, 0, period - 1)
    const firstDataSum = firstData.reduce((total, price) => total + price[seriesType], 0);
    const firstSMA = firstDataSum / period

    const k = 2 / (period + 1)
    const firstDate = moment(priceData[0].date).format(INDICATOR_DATE_FORMAT)

    const output = [
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
        date: moment(priceData[i].date).format(INDICATOR_DATE_FORMAT),
        value: EMA
      })
    }

    // parse it to support date as key
    const parsedOutput = {}

    for (let i = 0; i < output.length; i++) {
      const date = output[i].date;
      delete output[i].date;
      parsedOutput[date] = output[i]
    }

    return parsedOutput
  }

  public static calculateSMA = async (symbol: string, interval: DataInterval, period: number, seriesType) => {

    const priceData = await AssetPrice.find({ symbol, interval }).sort({ "date": "asc" })

    let start = 0;
    let end = period;

    const output = {};

    while (priceData[end - 1] !== undefined) {

      const dataSlice = _.slice(priceData, start, end)

      const dataSliceSum = _.sumBy(dataSlice, (data) => data[seriesType])

      const SMA = dataSliceSum / period

      const date = moment(priceData[end - 1].date).format(INDICATOR_DATE_FORMAT)

      output[date] = {
        name: "SMA",
        interval,
        seriesType,
        period,
        date,
        value: parseFloat(SMA.toFixed(2))
      }

      start++;
      end++;
    }



    return output;

  }




}