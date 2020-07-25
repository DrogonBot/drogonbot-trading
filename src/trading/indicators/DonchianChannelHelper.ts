import _ from 'lodash';
import moment from 'moment';

import { AssetPrice } from '../../resources/AssetPrice/assetprice.model';
import { DATE_KEY_FORMAT } from './constant/indicator.constant';


export class DonchianChannelHelper {

  public static calculate = async (symbol: string, period: number, interval) => {

    // should be ascendant, full data
    const priceData = await AssetPrice.find({ symbol, interval }).sort({ "date": "asc" })

    const output = {}
    let start = 0;
    let end = period;

    while (priceData[end - 1] !== undefined) {

      const endPrice = priceData[end - 1]
      const dataInterval = _.slice(priceData, start, end)

      // const direction = band === "high" ? "desc" : "asc"
      // const maxMin = _.orderBy(dataInterval, [band], [direction])[0]

      const highValue = _.orderBy(dataInterval, ["high"], ["desc"])[0].high
      const minValue = _.orderBy(dataInterval, ["low"], ["asc"])[0].low
      const midValue = (highValue + minValue) / 2

      const date = moment(endPrice.date).format(DATE_KEY_FORMAT)
      output[date] = {
        name: "Donchian Channel",
        interval,
        period,
        // value: maxMin[band],
        // band
        high: parseFloat(highValue.toFixed(2)),
        mid: parseFloat(midValue.toFixed(2)),
        low: parseFloat(minValue.toFixed(2))
      }

      start++;
      end++;
    }

    return output

  }



}