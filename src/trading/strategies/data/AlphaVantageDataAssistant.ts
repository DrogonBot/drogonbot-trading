import _ from 'lodash';

import { Asset } from '../../../resources/Asset/asset.model';
import { AssetPrice } from '../../../resources/AssetPrice/assetprice.model';
import { MinutesInterval } from '../../../resources/Trade/trade.types';
import { ConsoleColor, ConsoleHelper } from '../../../utils/ConsoleHelper';
import { TS } from '../../../utils/TS';
import { dataApiAxios, TradingDataInterval, TradingDataUpdateType } from '../../constant/tradingdata.constant';



export class AlphaVantageDataAssistant {

  public dataApiKey: string

  constructor() {
    this.dataApiKey = process.env.ALPHAVANTAGE_KEY!
  }

  public dataApiRequest = async (method, endpoint: string, data?: object | null) => {

    const url = `${endpoint}&apikey=${this.dataApiKey}`

    try {
      const response = await dataApiAxios({
        method,
        url,
        data
      })
      return response;
    }
    catch (error) {
      console.error(error);
    }
  }

  // PRICE DATA (TIME SERIES) ========================================

  private _getPriceData = async (symbol: string, functionType: string, updateType: TradingDataUpdateType, interval, minutesInterval?: MinutesInterval | null) => {

    const urlParams = `function=${functionType}&symbol=${symbol}${`&interval=${minutesInterval || interval}`}`

    try {
      const response = await this.dataApiRequest("GET", `query?${urlParams}`)
      return response;
    }
    catch (error) {
      console.error(error);
    }
  }

  public updatePriceData = async (symbol: string, type: TradingDataUpdateType, interval: TradingDataInterval, minutesInterval?: MinutesInterval | null) => {

    try {
      // find asset
      const asset = await Asset.findOne({ symbol })

      if (!asset) {
        throw new Error(TS.string("asset", "assetNotFound"))
      }

      const timeSeriesString = `TIME_SERIES_${interval.toUpperCase()}`

      // request data
      const response = await this._getPriceData(symbol, timeSeriesString, type, interval, minutesInterval);

      if (response && asset) {

        const dataObj = response.data


        if (dataObj["Error Message"]) {
          console.log(dataObj["Error Message"]);
          throw new Error(dataObj["Error Message"])
        }


        let timeSeries = Object.entries(dataObj[`Time Series (${minutesInterval ? minutesInterval : interval})`]).map(([key, value]) => ({ key, value }))


        timeSeries = (type === TradingDataUpdateType.Latest ? _.slice(timeSeries, 0, 1) : timeSeries)

        for (const priceData of timeSeries) {

          const date = new Date(priceData.key)
          const priceValue = Object(priceData.value)
          const isPriceSaved = await AssetPrice.exists({ symbol, interval, date })

          if (!isPriceSaved) {
            const newPrice = new AssetPrice({
              symbol, interval,
              date,
              open: priceValue["1. open"],
              high: priceValue["2. high"],
              low: priceValue["3. low"],
              close: priceValue["4. close"],
              volume: priceValue["5. volume"]
            })
            await newPrice.save()
          }
        }


        ConsoleHelper.coloredLog(ConsoleColor.BgGreen, ConsoleColor.FgWhite, `🤖: Done!`)

        asset.lastRefreshed = new Date();
        asset.timeZone = dataObj["Meta Data"]["5. Time Zone"]
        await asset.save();
        return true
      }

    }
    catch (error) {
      throw new Error(error)
    }

    return false


  }

}