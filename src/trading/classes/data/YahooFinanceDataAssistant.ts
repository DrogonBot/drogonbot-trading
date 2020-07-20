import _ from 'lodash';
import moment from 'moment';
import yahooFinance from 'yahoo-finance';

import { AssetPrice } from '../../../resources/AssetPrice/assetprice.model';
import { ConsoleColor, ConsoleHelper } from '../../../utils/ConsoleHelper';
import { intervalNamingShortcuts, TradingDataUpdateType } from '../../constant/tradingdata.constant';


export class YahooFinanceDataAssistant {

  private _getYahooFromString = (type: TradingDataUpdateType) => {
    switch (type) {
      case TradingDataUpdateType.Full:
        return null
      case TradingDataUpdateType.Latest:
        return moment(new Date).subtract(1, 'day').format('YYYY-MM-DD')
      case TradingDataUpdateType.Partial:
        return moment(new Date).subtract(100, 'days').format('YYYY-MM-DD')
    }
  }

  private _getPriceData = async (symbol: string, period: string, type: TradingDataUpdateType) => {

    return new Promise((resolve, reject) => {
      try {
        yahooFinance.historical({
          symbol,
          from: this._getYahooFromString(type),
          to: moment(new Date).format("YYYY-MM-DD"),
          period  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
        }, function (err, quotes) {
          resolve(quotes)
          if (err) {
            reject(err);
          }
        });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    })
  }

  // PRICE DATA  ========================================

  public updatePriceData = async (symbol: string, period: string, updateType: TradingDataUpdateType) => {

    const quotes: any = await this._getPriceData(symbol, period, updateType)

    if (!quotes.length) {
      console.log(`🤖: I didn't find any new data regarding this asset! Please, double check!`);
      return
    }

    for (const quote of quotes) {

      const interval = _.findKey(intervalNamingShortcuts, (item) => (item.indexOf(period) !== -1));

      // check if exists

      const quoteExists = await AssetPrice.exists({
        symbol,
        interval: String(interval),
        date: quote.date,
        open: quote.open,
        high: quote.high,
        low: quote.low,
        close: quote.close,
        volume: quote.volume
      })

      if (!quoteExists && quote.open && quote.high && quote.low && quote.close && quote.volume) {
        const newQuote = new AssetPrice({
          symbol,
          interval: String(interval),
          date: quote.date,
          open: quote.open,
          high: quote.high,
          low: quote.low,
          close: quote.close,
          volume: quote.volume
        })
        await newQuote.save()
      }

    }
    ConsoleHelper.coloredLog(ConsoleColor.BgGreen, ConsoleColor.FgWhite, `🤖 Done!`)

  }

}