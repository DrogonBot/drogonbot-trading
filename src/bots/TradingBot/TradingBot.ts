import _ from 'lodash';

import { Asset } from '../../resources/Asset/asset.model';
import { DataInterval, DataUpdateType } from '../../resources/Asset/asset.types';
import { AssetPrice } from '../../resources/AssetPrice/assetprice.model';
import { ConsoleColor, ConsoleHelper } from '../../utils/ConsoleHelper';
import { TS } from '../../utils/TS';
import { MinutesInterval } from './../../resources/Trade/trade.types';
import { dataApiAxios } from './tradingbot.constant';



export class TradingBot {

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

  private _getPriceData = async (symbol: string, type: string, updateType: DataUpdateType, minInterval?: MinutesInterval | null) => {


    const updateSizeString = updateType === DataUpdateType.Full ? `&outputsize=${updateType}` : ''

    const timeSeriesString = minInterval ? `&interval=${minInterval}` : ``

    const url = `query?function=${type}&symbol=${symbol}${updateSizeString}${timeSeriesString}`

    console.log(url);

    try {
      const response = await this.dataApiRequest("GET", url)

      return response;

    }
    catch (error) {
      console.error(error);

    }
  }

  public updatePriceData = async (symbol: string, updateType: DataUpdateType, interval: DataInterval, minInterval?: MinutesInterval | null) => {

    try {
      // find asset
      const asset = await Asset.findOne({ symbol })

      if (!asset) {
        throw new Error(TS.string("asset", "assetNotFound"))
      }

      // request data
      const response = await this._getPriceData(symbol, `TIME_SERIES_${interval.toUpperCase()}`, updateType, minInterval);

      if (response && asset) {

        const dataObj = response.data

        const timeSeriesString = interval === DataInterval.IntraDay ? minInterval : interval

        let timeSeries = Object.entries(dataObj[`Time Series (${timeSeriesString})`]).map(([key, value]) => ({ key, value }))

        timeSeries = (updateType === DataUpdateType.Latest ? _.slice(timeSeries, 0, 1) : timeSeries)

        ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `🤖: Updating price data for ${symbol}. Please wait...`)

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


        ConsoleHelper.coloredLog(ConsoleColor.BgGreen, ConsoleColor.FgWhite, `🤖: Price data updated for ${symbol}!`)

        asset.lastRefreshed = new Date();
        asset.timeZone = dataObj["Meta Data"]["5. Time Zone"]
        await asset.save();
        return true
      }

    }
    catch (error) {
      console.log(error);
    }

    return false


  }





}