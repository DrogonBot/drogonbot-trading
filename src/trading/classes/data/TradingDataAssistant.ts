import { MinutesInterval } from '../../../resources/Trade/trade.types';
import { ConsoleColor, ConsoleHelper } from '../../../utils/ConsoleHelper';
import { intervalNamingShortcuts, TradingDataInterval, TradingDataUpdateType } from '../../constant/tradingdata.constant';
import { AlphaVantageDataAssistant } from './AlphaVantageDataAssistant';
import { YahooFinanceDataAssistant } from './YahooFinanceDataAssistant';



export class TradingDataAssistant {

  public updatePriceData = async (symbol: string, type: TradingDataUpdateType, interval: TradingDataInterval, minutesInterval?: MinutesInterval) => {

    ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `🤖 Updating ${symbol} quotes`)

    try {
      switch (interval) {
        case TradingDataInterval.IntraDay:
          console.log(`🤖 Using AlphaVantage provider for ${interval} data!`);
          const alphaVantageData = new AlphaVantageDataAssistant()
          return alphaVantageData.updatePriceData(symbol, type, interval, minutesInterval)


        default:
          // if its not intraday data, lets rely upon Yahoo Finance, because data takes slips into consideration, being more precise
          const yahooFinancesData = new YahooFinanceDataAssistant()
          console.log(`🤖 Using YahooFinances provider for ${interval} data!`);
          return yahooFinancesData.updatePriceData(symbol, intervalNamingShortcuts[interval], type)
      }
    }
    catch (error) {
      throw new Error(error)
    }
  }
}