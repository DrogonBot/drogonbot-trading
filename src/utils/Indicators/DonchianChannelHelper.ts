import _ from 'lodash';
import moment from 'moment';

import { INDICATOR_DATE_FORMAT } from '../../constants/indicator.constant';
import { AssetPrice } from '../../resources/AssetPrice/assetprice.model';

export class DonchianChannelHelper {

  public static calculate = async (symbol: string, period: number, interval, band: "high" | "low") => {

    // should be ascendant, full data
    const priceData = await AssetPrice.find({ symbol, interval }).sort({ "date": "asc" })

    const output = {}
    let start = 0;
    let end = period;

    while (priceData[end - 1] !== undefined) {

      const endPrice = priceData[end - 1]
      const dataInterval = _.slice(priceData, start, end)

      const direction = band === "high" ? "desc" : "asc"

      const maxMin = _.orderBy(dataInterval, [band], [direction])[0]
      const date = moment(endPrice.date).format(INDICATOR_DATE_FORMAT)
      output[date] = {
        name: "Donchian Channel",
        interval,
        period,
        value: maxMin[band],
        band
      }

      start++;
      end++;
    }

    return output

  }



}