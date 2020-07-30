import { Dictionary } from 'lodash';

import { DEFAULT_MAX_RISK_PER_TRADE } from '../../resources/BackTest/backtest.constant';
import { BackTestActions } from '../../resources/BackTest/backtest.types';
import { OrderExecutionType, OrderType } from '../../resources/Order/order.types';
import { IQuote } from '../../resources/Quote/quote.types';
import { TradeDirection } from '../../resources/Trade/trade.types';
import { ConsoleColor, ConsoleHelper } from '../../utils/ConsoleHelper';
import { DateHelper } from '../../utils/DateTimeHelper';
import { TradingDataInterval } from '../constant/tradingdata.constant';
import { ATRHelper } from '../indicators/ATRHelper';
import { SidewaysMarketHelper } from '../indicators/ChoppyFilterHelper';
import { MovingAverageHelper } from '../indicators/MovingAverageHelper';
import { IndicatorSeriesType } from '../indicators/types/indicator.types';
import { BackTestingSystem } from './BackTestingSystem';

export class ThreeDragons extends BackTestingSystem {
  private _systemName: string;
  public tickers: string[];
  public interval: TradingDataInterval;
  public maxRiskPerTrade: number = DEFAULT_MAX_RISK_PER_TRADE;


  constructor(tickers: string[], interval: TradingDataInterval, ATRStopMultiple: number = 3) {
    super()
    this._systemName = "Three Dragons"
    this.tickers = tickers;
    this.interval = interval;
    this.ATRStopMultiple = ATRStopMultiple
  }

  public backTest = async () => {
    // initialize backtest (load assets data, etc)
    ConsoleHelper.coloredLog(ConsoleColor.BgMagenta, ConsoleColor.FgWhite, `🤖 Initializing ${this._systemName} strategy backtest with the following symbols: ${this.tickers}`)

    await this.startBackTesting(this.tickers, this.interval)

    // calculate indicators
    await this.calculateIndicators()

    console.log('🤖 Running backtest!');

    // Starting analytical loop

    await this.runBackTesting(this.tickers, this.interval, this.defineNextSteps)


  }

  public defineNextSteps = async (ticker: string, quotesDictionary: Dictionary<IQuote>, periodNow: string, prevPeriod: string | null) => {

    const indicators = this.backTestTickerDictionary[ticker].indicators

    if (!indicators) {
      throw new Error(`BackTest: Failed to calculate indicators for ${ticker}`)
    }

    if (!prevPeriod || !periodNow) {
      return BackTestActions.Skip
    }

    const SMA50Now: number = indicators["SMA50"][periodNow]?.value || null
    const SMA200Now: number = indicators["SMA200"][periodNow]?.value || null
    const SMA200Prev: number = indicators["SMA200"][prevPeriod]?.value || null
    const ATRNow: number = indicators["ATR"][periodNow]?.value || null
    const quoteNow = quotesDictionary[periodNow] || null

    if (!SMA50Now || !SMA200Now || !SMA200Prev || !ATRNow || !quoteNow) {
      return BackTestActions.Skip
    }

    if (await this.canExecuteBuyOrder(ticker, quoteNow)) {

      const currentStart = this.backTestTradeDictionary[ticker]?.startPrice!

      await this.placeBackTestOrder(ticker, OrderType.Buy, OrderExecutionType.Market, currentStart, quoteNow.date, this.maxRiskPerTrade, ATRNow)


      // ! DEBUG ONLY
      this.isBackTestRunning = false; // stop backtest just for debugging
    }

    if (this.canSetStartOrder(ticker, quoteNow, SMA200Now, SMA200Prev, SMA50Now, ATRNow)) {

      const orderPrice = quoteNow.high + 0.01

      ConsoleHelper.coloredLog(ConsoleColor.BgGreen, ConsoleColor.FgWhite, `🏁: Adding START order to ${ticker} on ${DateHelper.format(quoteNow.date)} at ${orderPrice}!`);

      // check if there's already an active trade with this current asset for this current backtest. If so, fetch it. If not, create a new one
      await this.placeBackTestOrder(ticker, OrderType.Buy, OrderExecutionType.Start, orderPrice, quoteNow.date, this.maxRiskPerTrade, ATRNow)
    }

    console.log(`Defining next steps for ${ticker} on date ${periodNow}`);
    console.log(`Debugging:
      periodNow=${periodNow} / prevPeriod=${prevPeriod}
      high=${quoteNow?.high} / low=${quoteNow?.low} / close=${quoteNow?.close}
      SMA50Now=${SMA50Now}
      SMA200Now=${SMA200Now} / SMA200Prev=${SMA200Prev}
      ATRNow=${ATRNow}
    `);
  }

  public canSetStartOrder = (ticker: string, quoteNow: IQuote, SMA200Now: number, SMA200Prev: number, SMA50Now: number, ATRNow: number) => {

    // first, we should check if there's no buy or

    const isTradeInProgress = this.backTestTradeDictionary[ticker]?.isTradeInProgress || null

    if (isTradeInProgress) {
      return false
    }


    const marketDirection = this.calculateCurrentMarketDirection(SMA200Now, SMA200Prev, SMA50Now, ATRNow)


    if (marketDirection === TradeDirection.Long) {
      if (quoteNow.low <= (SMA50Now + ATRNow)) {
        return true
      }
    }
  }

  public canExecuteBuyOrder = async (ticker: string, quoteNow: IQuote) => {

    const currentStart = this.backTestTradeDictionary[ticker]?.startPrice || null
    const isTradeInProgress = this.backTestTradeDictionary[ticker]?.isTradeInProgress || null

    if (currentStart && !isTradeInProgress) {
      if (quoteNow.high >= currentStart && quoteNow.low <= currentStart) {
        return true
      }
    }
    return false;
  }

  public calculateIndicators = async () => {

    for (const ticker of this.tickers) {

      console.log(`🤖: Calculating indicators for ${ticker} (${this.interval})`);

      const ATR = await ATRHelper.calculate(ticker, this.interval, 14)
      const SMA200 = await MovingAverageHelper.calculateSMA(ticker, this.interval, 200, IndicatorSeriesType.Close)
      const SMA50 = await MovingAverageHelper.calculateSMA(ticker, this.interval, 50, IndicatorSeriesType.Close)

      this.backTestTickerDictionary[ticker] = {
        ...this.backTestTickerDictionary[ticker],
        indicators: {
          ATR,
          SMA200,
          SMA50
        }
      }
    }
  }

  public calculateCurrentMarketDirection = (SMA200Now, SMA200Prev, SMA50Now, ATRNow) => {
    if ((SMA200Now > SMA200Prev) && (SMA50Now > SMA200Now) && !SidewaysMarketHelper.isMarketSideways(SMA50Now, SMA200Now, ATRNow)) {
      return TradeDirection.Long
    }

    if (SMA200Now < SMA200Prev && SMA200Now > SMA50Now) {
      return TradeDirection.Short
    }

    return TradeDirection.Lateral
  }




}