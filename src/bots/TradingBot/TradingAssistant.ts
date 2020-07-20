import moment from 'moment';
import yahooFinance from 'yahoo-finance';

import { AssetPrice } from '../../resources/AssetPrice/assetprice.model';
import { ConsoleColor, ConsoleHelper } from '../../utils/ConsoleHelper';


export class TradingAssistant {

  // PRICE DATA  ========================================

  public updatePriceData = async (symbol: string, period: "d" | "w" | "m" | "v") => {

    const quotes: any = await this.getPriceData(symbol, period)

    ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `🤖 Updating ${symbol} quotes`)
    for (const quote of quotes) {

      let interval
      if (period === "d") {
        interval = "Daily"
      }
      if (period === "w") {
        interval = "Weekly"
      }
      if (period === "m") {
        interval = "Monthly"
      }

      // check if exists

      const quoteExists = await AssetPrice.exists({
        symbol,
        interval,
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
          interval,
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

  public getPriceData = async (symbol: string, period: "d" | "w" | "m" | "v") => {

    return new Promise((resolve, reject) => {
      try {
        yahooFinance.historical({
          symbol,
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





}