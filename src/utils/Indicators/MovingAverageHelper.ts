import _ from 'lodash';
import moment from 'moment';

import { DataInterval, IAssetIndicator, IndicatorSeriesType } from '../../resources/Asset/asset.types';
import { AssetPrice } from '../../resources/AssetPrice/assetprice.model';


export class MovingAverageHelper {


  public static EMA = async (symbol: string, period: number, seriesType: IndicatorSeriesType, interval: DataInterval) => {

    // should be ascendant, full data
    const priceData = await AssetPrice.find({ symbol }).sort({ "date": "asc" }) // 3 years of data


    const firstData = _.slice(priceData, 0, period - 1)
    const firstDataSum = firstData.reduce((total, price) => total + price[seriesType], 0);
    const firstSMA = firstDataSum / period

    const k = 2 / (period + 1)
    const firstDate = moment(priceData[0].date).subtract(1, "day").toDate()

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
        date: priceData[i].date,
        value: EMA
      })
    }

    return output
  }




}