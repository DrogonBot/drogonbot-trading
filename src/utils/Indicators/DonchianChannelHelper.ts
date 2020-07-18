import _ from 'lodash';

import { IAssetIndicator } from '../../resources/Asset/asset.types';
import { AssetPrice } from '../../resources/AssetPrice/assetprice.model';

export class DonchianChannelHelper {

  public static calculate = async (symbol: string, period: number, interval, band: "high" | "low") => {

    // should be ascendant, full data
    const priceData = await AssetPrice.find({ symbol, interval }).sort({ "date": "asc" })

    let output: IAssetIndicator[] = []
    let start = 0;
    let end = period;

    while (priceData[end - 1] !== undefined) {

      const endPrice = priceData[end - 1]
      const dataInterval = _.slice(priceData, start, end)

      const direction = band === "high" ? "desc" : "asc"

      const maxMin = _.orderBy(dataInterval, [band], [direction])[0]

      output = [
        ...output,
        {
          name: "Donchian Channel",
          interval,
          period,
          date: endPrice.date,
          value: maxMin[band],
          band
        }
      ]
      start++;
      end++;
    }

    return output

  }



}