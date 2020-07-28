import _ from 'lodash';
import moment from 'moment';

import { Quote } from '../../resources/Quote/quote.model';
import { NumberHelper } from '../../utils/NumberHelper';
import { DATE_KEY_FORMAT } from './constant/indicator.constant';


export class DonchianChannelHelper {

  public static calculate = async (ticker: string, period: number, interval) => {

    // should be ascendant, full data
    const priceData = await Quote.find({ ticker, interval }).sort({ "date": "asc" })

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
        high: NumberHelper.format(highValue),
        mid: NumberHelper.format(midValue),
        low: NumberHelper.format(minValue)
      }

      start++;
      end++;
    }

    return output

  }



}