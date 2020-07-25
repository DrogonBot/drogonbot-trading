import moment from 'moment';

import { DEFAULT_INITIAL_CAPITAL } from '../../resources/BackTest/backtest.constant';
import { BackTestActions, IQuote } from '../../resources/BackTest/backtest.types';
import { TradeDirection } from '../../resources/Trade/trade.types';
import { ConsoleColor, ConsoleHelper } from '../../utils/ConsoleHelper';
import { D } from '../../utils/DateTimeHelper';
import { TradingDataInterval } from '../constant/tradingdata.constant';
import { ATRHelper } from '../indicators/ATRHelper';
import { SidewaysMarketHelper } from '../indicators/ChoppyFilterHelper';
import { MovingAverageHelper } from '../indicators/MovingAverageHelper';
import { IndicatorSeriesType } from '../indicators/types/indicator.types';
import { BackTestingSystem } from './BackTestingSystem';

export class ThreeDragons extends BackTestingSystem {
  private _systemName: string;
  public symbols: string[];
  public interval: TradingDataInterval;


  constructor(symbols: string[], interval: TradingDataInterval, ATRStopMultiple: number = 3, initialCapital: number = DEFAULT_INITIAL_CAPITAL) {
    super()
    this._systemName = "Three Dragons"
    this.symbols = symbols;
    this.interval = interval;
    this.ATRStopMultiple = ATRStopMultiple
    this.initialCapital = initialCapital
  }

  public backTest = async () => {
    // initialize backtest (load assets data, etc)
    ConsoleHelper.coloredLog(ConsoleColor.BgMagenta, ConsoleColor.FgWhite, `🤖 Initializing ${this._systemName} strategy backtest with the following symbols: ${this.symbols}`)

    await this.startBackTesting(this.symbols, this.interval, this.initialCapital)

    // calculate indicators
    await this.calculateIndicators()

    console.log('🤖 Running backtest!');

    // Starting analytical loop

    const backtestStartingTime = moment(new Date()) // just to measure performance
    const startingPeriod = (this.getStartingDate(this.symbols))
    let periodNow = D.indicatorFormat(startingPeriod)

    let stopBackTesting = false;
    let finishedSymbols = 0
    const totalSymbols = this.symbols.length



    while (!stopBackTesting) {

      if (finishedSymbols === totalSymbols) {
        stopBackTesting = true
        return
      }

      for (const symbol of this.symbols) {

        const dataEntries = this.backTestSymbolsData[symbol].quotes
        const lastDataEntry = dataEntries[dataEntries.length - 1]
        const isLastDataEntry = D.indicatorFormat(lastDataEntry.date) === periodNow
        if (isLastDataEntry) {
          ConsoleHelper.coloredLog(ConsoleColor.BgYellow, ConsoleColor.FgBlack, `🤖: Finished backtest for ${symbol} on ${periodNow}!`)
          finishedSymbols++
        }

        const dateKeyQuotes = this.backTestSymbolsData[symbol].quotesDateKey
        if (!dateKeyQuotes) {
          throw new Error(`Failed to find DateKey data for ${symbol}`)
        }


        const prevPeriod = D.indicatorFormat(moment(periodNow).subtract(1, D.convertIntervalToMomentInterval(this.interval)).toDate())

        const nextSteps = this.defineNextSteps(symbol, dateKeyQuotes, periodNow, prevPeriod)

        switch (nextSteps) {
          case BackTestActions.Skip:
            // if data point calculation is invalid, just skip actions on this date for this symbol
            continue;
        }

        // await GenericHelper.sleep(1000)

      }

      // increase one period
      periodNow = D.indicatorFormat(moment(periodNow).add(1, D.convertIntervalToMomentInterval(this.interval)).toDate())
    }


    const backtestFinishingTime = moment(new Date())

    const elapsedTime = backtestFinishingTime.diff(backtestStartingTime, 'seconds')
    ConsoleHelper.coloredLog(ConsoleColor.BgGreen, ConsoleColor.FgWhite, `🤖: Finished after ${elapsedTime}!`)

  }

  public defineNextSteps = (symbol: string, dateKeyQuotes: IQuote, periodNow: string, prevPeriod: string | null) => {

    const indicators = this.backTestSymbolsData[symbol].indicators!

    if (!indicators) {
      throw new Error(`BackTest: Failed to calculate indicators for ${symbol}`)
    }

    if (!prevPeriod || !periodNow) {
      return BackTestActions.Skip
    }

    const SMA50Now = indicators["SMA50"][periodNow]?.value || null
    const SMA200Now = indicators["SMA200"][periodNow]?.value || null
    const SMA200Prev = indicators["SMA200"][prevPeriod]?.value || null
    const ATRNow = indicators["ATR"][periodNow]?.value || null
    const quoteNow = dateKeyQuotes[periodNow] || null

    if (!SMA50Now || !SMA200Now || !SMA200Prev || !ATRNow || !quoteNow) {
      return BackTestActions.Skip
    }

    console.log(`Defining next steps for ${symbol} on date ${periodNow}`);
    console.log(`Debugging:
      periodNow=${periodNow} / prevPeriod=${prevPeriod}
      high=${quoteNow?.high} / low=${quoteNow?.low} / close=${quoteNow?.close}
      SMA50Now=${SMA50Now}
      SMA200Now=${SMA200Now} / SMA200Prev=${SMA200Prev}
      ATRNow=${ATRNow}
    `);




  }

  public calculateIndicators = async () => {

    for (const symbol of this.symbols) {

      console.log(`🤖: Calculating indicators for ${symbol} (${this.interval})`);

      const ATR = await ATRHelper.calculate(symbol, this.interval, 14)
      const SMA200 = await MovingAverageHelper.calculateSMA(symbol, this.interval, 200, IndicatorSeriesType.Close)
      const SMA50 = await MovingAverageHelper.calculateSMA(symbol, this.interval, 50, IndicatorSeriesType.Close)

      this.backTestSymbolsData[symbol] = {
        ...this.backTestSymbolsData[symbol],
        indicators: {
          ATR,
          SMA200,
          SMA50
        }
      }
    }
  }

  public calculateCurrentMarketDirection = async (SMA200Now, SMA200Prev, SMA50Now, ATRNow) => {
    if ((SMA200Now > SMA200Prev) && (SMA50Now > SMA200Now) && !SidewaysMarketHelper.isMarketSideways(SMA50Now, SMA200Now, ATRNow)) {
      return TradeDirection.Long
    }

    if (SMA200Now < SMA200Prev && SMA200Now > SMA50Now) {
      return TradeDirection.Short
    }

    return TradeDirection.Lateral
  }




}