import { Asset } from '../../resources/Asset/asset.model';
import { PriceInterval } from '../../resources/Asset/asset.types';
import { ConsoleColor, ConsoleHelper } from '../../utils/ConsoleHelper';
import { TS } from '../../utils/TS';
import { TimeSeriesUpdateType } from './../../resources/Asset/asset.types';
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

  private _getTimeSeries = async (symbol: string, type: string, updateType: TimeSeriesUpdateType) => {


    const updateSizeString = updateType === TimeSeriesUpdateType.Full ? `&outputsize=${updateType}` : ''

    try {
      const response = await this.dataApiRequest("GET", `query?function=${type}&symbol=${symbol}${updateSizeString}`)

      return response;

    }
    catch (error) {
      console.error(error);

    }
  }

  public updateTimeSeries = async (symbol: string, interval: PriceInterval, updateType: TimeSeriesUpdateType) => {

    try {
      // find asset
      const asset = await Asset.findOne({ symbol })

      if (!asset) {
        throw new Error(TS.string("asset", "assetNotFound"))
      }

      // request data
      const response = await this._getTimeSeries(symbol, `TIME_SERIES_${interval.toUpperCase()}`, updateType);

      if (response && asset) {

        const dataObj = response.data

        asset.lastRefreshed = new Date();
        asset.timeZone = dataObj["Meta Data"]["5. Time Zone"]
        await asset.save();

        const timeSeries = Object.entries(dataObj[`Time Series (${interval})`]).map(([key, value]) => ({ key, value }))

        for (const apiPriceData of timeSeries) {


          // check if price is not already in our model
          const isPriceDataSaved = asset.pricesData[interval.toLowerCase()].some((data) => new Date(data.date).toISOString() === new Date(apiPriceData.key).toISOString())

          if (!isPriceDataSaved) {

            ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `🤖: Updating asset data (${symbol}) for date ${apiPriceData.key} (${interval})`)

            const priceValue = Object(apiPriceData.value)

            asset.pricesData[interval.toLowerCase()].push({
              date: new Date(apiPriceData.key),
              open: priceValue["1. open"],
              high: priceValue["2. high"],
              low: priceValue["3. low"],
              close: priceValue["4. close"],
              volume: priceValue["5. volume"]
            })

            await asset.save();
          }








        }








      }

      return true



      // update model

    }
    catch (error) {
      console.log(error);
    }



  }




}