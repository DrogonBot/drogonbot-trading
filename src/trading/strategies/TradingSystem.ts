import { DEFAULT_ATR_MULTIPLE } from '../../resources/BackTest/backtest.constant';
import { Quote } from '../../resources/Quote/quote.model';
import { TradingDataInterval } from '../constant/tradingdata.constant';

export class TradingSystem {
  public ATRStopMultiple: number;

  constructor() {
    this.ATRStopMultiple = DEFAULT_ATR_MULTIPLE
  }

  public fetchPriceData = async (ticker: string, interval: TradingDataInterval) => {
    try {
      const priceData = await Quote.find({ ticker, interval }).sort({ "date": "asc" })

      if (!priceData.length) {
        throw new Error(`Failed to fetch data for ${ticker}. Make sure you have available quotes in our database.`)
      }

      console.log(`debug: first data for symbol ${ticker} is ${priceData[0].date}`);

      if (priceData.length === 0) {
        console.log(`Error: No price data found for ${ticker}!`);
        return null
      }

      return priceData

    }
    catch (error) {
      console.error(error);
      return null
    }

  }




}