import _ from 'lodash';

import { Asset } from '../../resources/Asset/asset.model';
import { DataInterval, DataUpdateType, IndicatorSeriesType } from '../../resources/Asset/asset.types';
import { AssetIndicator } from '../../resources/AssetIndicator/assetindicator.model';
import { AssetPrice } from '../../resources/AssetPrice/assetprice.model';
import { ConsoleColor, ConsoleHelper } from '../../utils/ConsoleHelper';
import { TS } from '../../utils/TS';
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

  private _getPriceData = async (symbol: string, type: string, updateType: DataUpdateType) => {


    const updateSizeString = updateType === DataUpdateType.Full ? `&outputsize=${updateType}` : ''

    try {
      const response = await this.dataApiRequest("GET", `query?function=${type}&symbol=${symbol}${updateSizeString}`)

      return response;

    }
    catch (error) {
      console.error(error);

    }
  }

  public updatePriceData = async (symbol: string, interval: DataInterval, updateType: DataUpdateType) => {

    try {
      // find asset
      const asset = await Asset.findOne({ symbol })

      if (!asset) {
        throw new Error(TS.string("asset", "assetNotFound"))
      }

      // request data
      const response = await this._getPriceData(symbol, `TIME_SERIES_${interval.toUpperCase()}`, updateType);

      if (response && asset) {

        const dataObj = response.data



        let timeSeries = Object.entries(dataObj[`Time Series (${interval})`]).map(([key, value]) => ({ key, value }))

        timeSeries = (updateType === DataUpdateType.Latest ? _.slice(timeSeries, 0, 1) : timeSeries)


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

            ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `🤖: Updating price data for ${symbol}  for date ${date}`)
          }
        }

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

  // INDICATORS ========================================

  private _getIndicatorSeries = async (symbol: string, indicatorName: string, interval: DataInterval, timePeriod: number, seriesType: "close" | "open" | "high" | "low") => {

    try {
      const response = await this.dataApiRequest("GET", `query?function=${indicatorName}&symbol=${symbol}&interval=${interval.toLowerCase()}&time_period=${timePeriod}&series_type=${seriesType}`)

      return response;
    }
    catch (error) {
      console.error(error);

    }
  }

  public updateIndicator = async (symbol: string, indicatorName: string, interval: DataInterval, timePeriod: number, seriesType: IndicatorSeriesType, updateType: DataUpdateType) => {

    try {
      // find asset
      const asset = await Asset.findOne({ symbol })

      if (!asset) {
        throw new Error(TS.string("asset", "assetNotFound"))
      }

      // request data
      const response = await this._getIndicatorSeries(symbol, indicatorName, interval, timePeriod, seriesType);

      if (response && asset) {

        let indicatorKV = Object.entries(response.data[`Technical Analysis: ${indicatorName}`]).map(([key, value]) => ({ key, value }))

        indicatorKV = (updateType === DataUpdateType.Latest ? _.slice(indicatorKV, 0, 1) : indicatorKV)

        for (const kv of indicatorKV) {
          const date = kv.key;
          const value = Object(kv.value)[indicatorName]

          const doesIndicatorDataAlreadyExists = await AssetIndicator.exists({
            symbol,
            interval,
            seriesType,
            period: timePeriod,
            name: indicatorName,
            date
          })

          if (!doesIndicatorDataAlreadyExists) {

            const newIndicatorData = new AssetIndicator({
              symbol, interval,
              seriesType,
              period: timePeriod,
              name: indicatorName, date, value
            })
            await newIndicatorData.save()

            ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `🤖: Updating indicator ${indicatorName}(${interval}) data for ${symbol}  for date ${date}`)


          }

        }



        await asset.save();
        return true;

      }
    }
    catch (error) {
      console.error(error);

    }
    return false
  }



}