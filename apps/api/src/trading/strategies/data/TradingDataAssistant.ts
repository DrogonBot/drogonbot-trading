import { intervalNamingShortcuts, TradingDataInterval, TradingDataUpdateType } from '@drogonbot/constants';
import { MinutesInterval } from '@drogonbot/types';

import { ConsoleColor, ConsoleHelper } from '../../../utils/ConsoleHelper';
import { AlphaVantageDataAssistant } from './AlphaVantageDataAssistant';
import { YahooFinanceDataAssistant } from './YahooFinanceDataAssistant';



export class TradingDataAssistant {

  public updatePriceData = async (ticker: string, type: TradingDataUpdateType, interval: TradingDataInterval, minutesInterval?: MinutesInterval) => {

    ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `🤖 Updating ${ticker} quotes`)

    try {
      switch (interval) {
        case TradingDataInterval.IntraDay:
          console.log(`🤖 Using AlphaVantage provider for ${interval} data!`);
          const alphaVantageData = new AlphaVantageDataAssistant()
          return alphaVantageData.updatePriceData(ticker, type, interval, minutesInterval)


        default:
          // if its not intraday data, lets rely upon Yahoo Finance, because data takes slips into consideration, being more precise
          const yahooFinancesData = new YahooFinanceDataAssistant()
          console.log(`🤖 Using YahooFinances provider for ${interval} data!`);
          return yahooFinancesData.updatePriceData(ticker, intervalNamingShortcuts[interval], type)
      }
    }
    catch (error) {
      throw new Error(error)
    }
  }
}