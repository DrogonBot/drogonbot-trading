import _ from 'lodash';

import { Asset } from '../../resources/Asset/asset.model';
import { DataInterval, DataUpdateType, IIndicator, IPriceItem } from '../../resources/Asset/asset.types';
import { ConsoleColor, ConsoleHelper } from '../../utils/ConsoleHelper';
import { TS } from '../../utils/TS';
import { IIndicatorItem } from './../../resources/Asset/asset.types';
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

        const priceItems: IPriceItem[] = [];

        for (const apiPriceData of timeSeries) {

          // check if price is not already in our model
          const isPriceDataSaved = asset.pricesData[interval.toLowerCase()].some((data) => new Date(data.date).toISOString() === new Date(apiPriceData.key).toISOString())

          if (!isPriceDataSaved) {
            ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `🤖: Updating asset data (${symbol}) for date ${apiPriceData.key} (${interval})`)

            const priceValue = Object(apiPriceData.value)

            const pricePayload: IPriceItem = {
              date: new Date(apiPriceData.key),
              open: priceValue["1. open"],
              high: priceValue["2. high"],
              low: priceValue["3. low"],
              close: priceValue["4. close"],
              volume: priceValue["5. volume"]
            }

            priceItems.push(pricePayload)

          } else {
            ConsoleHelper.coloredLog(ConsoleColor.BgYellow, ConsoleColor.FgWhite, `🤖: Skipping asset data (${symbol}) for date ${apiPriceData.key} (${interval}), since its already saved!`)
          }
        }

        asset.pricesData[interval.toLowerCase()] = [
          ...priceItems, // new data to the top!
          ...asset.pricesData[interval.toLowerCase()],
        ]
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

  public updateIndicator = async (symbol: string, indicatorName: string, interval: DataInterval, timePeriod: number, seriesType: "close" | "open" | "high" | "low", updateType: DataUpdateType) => {

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

        // TODO: change 0,5 to full
        indicatorKV = (updateType === DataUpdateType.Latest ? _.slice(indicatorKV, 0, 1) : _.slice(indicatorKV, 0, 5))

        const indicator: IIndicator[] =
          asset.indicatorsData[interval.toLowerCase()]


        if (indicator.length === 0) {
          indicator.unshift({
            name: indicatorName,
            data: []
          })
        }

        const indicatorItems: IIndicatorItem[] = [];
        const targetIndicator = indicator.find((item) => item.name === indicatorName);


        for (const kv of indicatorKV) {

          ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `🤖: Updating Indicator(${indicatorName}) => (${symbol}) for date ${kv.key} (${interval})`)

          const indicatorDate = kv.key
          const indicatorValue = Object(kv.value)[indicatorName]

          console.log('adding');
          console.log(indicatorDate);
          console.log(indicatorValue);

          const isIndicatorDataAlreadyAdded = targetIndicator?.data.some((item) => item.date.toISOString() === new Date(indicatorDate).toISOString())

          if (!isIndicatorDataAlreadyAdded) {
            indicatorItems.push({
              date: new Date(indicatorDate),
              value: indicatorValue
            })
          } else {
            ConsoleHelper.coloredLog(ConsoleColor.BgYellow, ConsoleColor.FgWhite, `🤖: Skipping asset data (${symbol}) for indicator ${indicatorName} (${interval}), since its already saved!`)
          }


        }

        if (targetIndicator) {
          targetIndicator.data = [
            ...indicatorItems,
            ...targetIndicator.data
          ]

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