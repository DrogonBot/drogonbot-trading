import moment, { Moment } from 'moment';

import { DEFAULT_INITIAL_CAPITAL } from '../../resources/BackTest/backtest.constant';
import { BackTestActions } from '../../resources/BackTest/backtest.types';
import { TradeDirection } from '../../resources/Trade/trade.types';
import { ConsoleColor, ConsoleHelper } from '../../utils/ConsoleHelper';
import { D } from '../../utils/DateTimeHelper';
import { TradingDataInterval } from '../constant/tradingdata.constant';
import { ATRHelper } from '../indicators/ATRHelper';
import { SidewaysMarketHelper } from '../indicators/ChoppyFilterHelper';
import { INDICATOR_DATE_FORMAT } from '../indicators/constant/indicator.constant';
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

    const startingTime = moment(new Date())
    let stopBackTesting = false
    let symbolsWithStoppedBackTest = 0
    let currentPeriod = moment(this.getStartingDate(this.symbols))
    const totalSymbols = Object.entries(this.backTestSymbolsData).map(([key, value]) => ({ key, value })).length

    while (!stopBackTesting) {

      if (symbolsWithStoppedBackTest === totalSymbols) {
        stopBackTesting = true;
      }

      for (const symbol of this.symbols) {

        const nextSteps = await this.defineNextSteps(symbol, currentPeriod, this.interval)

        switch (nextSteps) {
          case BackTestActions.Skip:
            continue;
          case BackTestActions.Stop:
            symbolsWithStoppedBackTest++;
            break
        }

      }
      const momentPeriod = D.convertIntervalToMomentInterval(this.interval)
      currentPeriod = moment(currentPeriod).add(1, momentPeriod) // evaluate next available period


    }
    const finishingTime = moment(new Date())

    const elapsedTime = finishingTime.diff(startingTime, 'seconds')
    ConsoleHelper.coloredLog(ConsoleColor.BgGreen, ConsoleColor.FgWhite, `🤖: Finished after ${elapsedTime}!`)

  }

  public defineNextSteps = async (symbol: string, currentPeriod: Moment, interval: TradingDataInterval) => {

    const quotes = this.backTestSymbolsData[symbol].quotes!
    const lastQuoteDate = D.indicatorDateFormat(quotes[quotes.length - 1].date)

    const indicators = this.backTestSymbolsData[symbol].indicators!
    const momentPeriod = D.convertIntervalToMomentInterval(interval)


    const periodNow = D.indicatorDateFormat(currentPeriod.toDate())
    const prevPeriod = moment(periodNow).subtract(1, momentPeriod).format(INDICATOR_DATE_FORMAT) || null

    if (!prevPeriod || !periodNow) {
      return BackTestActions.Skip
    }

    if (periodNow === lastQuoteDate) {
      return BackTestActions.Stop
    }

    const SMA50Now = indicators["SMA50"][periodNow]?.value || null
    const SMA200Now = indicators["SMA200"][periodNow]?.value || null
    const SMA200Prev = indicators["SMA200"][prevPeriod]?.value || null
    const ATRNow = indicators["ATR"][periodNow]?.value || null

    if (!SMA50Now || !SMA200Now || !SMA200Prev || !ATRNow) {
      return BackTestActions.Skip
    }


    // console.log(`prevPeriod=${prevPeriod}`);
    // console.log(`periodNow=${periodNow}`);

    // console.log(`Defining next steps for ${symbol} on date ${periodNow}`);
    // console.log(`Debugging:
    //   SMA50Now=${SMA50Now}
    //   SMA200Now=${SMA200Now}
    //   SMA200Prev=${SMA200Prev}
    //   ATRNow=${ATRNow}
    // `);



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