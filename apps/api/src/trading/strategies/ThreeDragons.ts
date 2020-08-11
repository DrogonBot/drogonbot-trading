import { DEFAULT_MAX_RISK_PER_TRADE, TradingDataInterval } from '@drogonbot/constants';
import { ConsoleColor, ConsoleHelper } from '@drogonbot/helpers';
import {
  BackTestActions,
  IndicatorSeriesType,
  IQuote,
  OrderExecutionType,
  OrderType,
  TradeDirection,
} from '@drogonbot/types';
import { Dictionary } from 'lodash';

import { ATRHelper } from '../indicators/ATRHelper';
import { SidewaysMarketHelper } from '../indicators/ChoppyFilterHelper';
import { MovingAverageHelper } from '../indicators/MovingAverageHelper';
import { BackTestingSystem } from './BackTestingSystem';

export class ThreeDragons extends BackTestingSystem {
  private _systemName: string;
  public tickers: string[];
  public interval: TradingDataInterval;
  public maxRiskPerTrade: number

  constructor(tickers: string[], interval: TradingDataInterval, ATRStopMultiple: number = 3) {
    super()
    this._systemName = "Three Dragons"
    this.tickers = tickers;
    this.interval = interval;
    this.ATRStopMultiple = ATRStopMultiple
    this.maxRiskPerTrade = DEFAULT_MAX_RISK_PER_TRADE;
  }

  public backTest = async () => {
    // initialize backtest (load assets data, etc)
    ConsoleHelper.coloredLog(ConsoleColor.BgMagenta, ConsoleColor.FgWhite, `🤖 Initializing ${this._systemName} strategy backtest with the following symbols: ${this.tickers}`)

    await this.startBackTesting(this.tickers, this.interval)

    // calculate indicators
    await this._calculateIndicators()

    console.log('🤖 Running backtest!');

    // Starting analytical loop

    await this.runBackTesting(this.tickers, this.interval, this._defineNextSteps)
  }

  private _defineNextSteps = async (ticker: string, quotesDictionary: Dictionary<IQuote>, periodNow: string, prevPeriod: string | null) => {

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


    // STOP / SELL ========================================

    if (await this._canExecuteSellOrder(ticker, quoteNow)) {

      const stopPrice = this.backTestTradeDictionary[ticker]?.stopPrice!

      await this.placeBackTestOrder(ticker, OrderType.Sell, OrderExecutionType.Market, stopPrice, quoteNow.date)

      // ! DEBUG ONLY
      this.isBackTestRunning = false; // stop backtest just for debugging
    }


    if (await this._canSetStopOrder(ticker, quoteNow, SMA200Now, SMA200Prev, SMA50Now, ATRNow)) {

      const stopPrice = quoteNow.low - 0.01

      await this.placeBackTestOrder(ticker, OrderType.Sell, OrderExecutionType.StopLoss, stopPrice, quoteNow.date)

    }

    // START / BUY ========================================

    if (await this._canExecuteBuyOrder(ticker, quoteNow)) {

      const startPrice = this.backTestTradeDictionary[ticker]?.startPrice!

      await this.placeBackTestOrder(ticker, OrderType.Buy, OrderExecutionType.Market, startPrice, quoteNow.date, ATRNow)


    }



    if (this._canSetStartOrder(ticker, quoteNow, SMA200Now, SMA200Prev, SMA50Now, ATRNow)) {

      const orderPrice = quoteNow.high + 0.01



      await this.placeBackTestOrder(ticker, OrderType.Buy, OrderExecutionType.Start, orderPrice, quoteNow.date, ATRNow)
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

  private _canSetStopOrder = async (ticker: string, quoteNow: IQuote, SMA200Now: number, SMA200Prev: number, SMA50Now: number, ATRNow: number) => {

    const marketDirection = this._calculateMarketDirection(SMA200Now, SMA200Prev, SMA50Now, ATRNow)

    if (marketDirection === TradeDirection.Long) {
      if (quoteNow.low <= SMA200Now) {

        return true


      }
    }

  }

  private _canSetStartOrder = (ticker: string, quoteNow: IQuote, SMA200Now: number, SMA200Prev: number, SMA50Now: number, ATRNow: number) => {

    // first, we should check if there's no buy or

    const isTradeInProgress = this.backTestTradeDictionary[ticker]?.isTradeInProgress || null

    if (isTradeInProgress) {
      return false
    }


    const marketDirection = this._calculateMarketDirection(SMA200Now, SMA200Prev, SMA50Now, ATRNow)


    if (marketDirection === TradeDirection.Long) {
      if (quoteNow.low <= (SMA50Now + ATRNow)) {
        return true
      }
    }
  }

  private _canExecuteSellOrder = async (ticker: string, quoteNow: IQuote) => {

    const currentStopPrice = this.backTestTradeDictionary[ticker]?.stopPrice || null
    const isTradeInProgress = this.backTestTradeDictionary[ticker]?.isTradeInProgress || null

    if (currentStopPrice && isTradeInProgress) {
      if (quoteNow.low <= currentStopPrice) {
        return true
      }
    }
  }


  private _canExecuteBuyOrder = async (ticker: string, quoteNow: IQuote) => {

    const currentStartPrice = this.backTestTradeDictionary[ticker]?.startPrice || null
    const isTradeInProgress = this.backTestTradeDictionary[ticker]?.isTradeInProgress || null

    if (currentStartPrice && !isTradeInProgress) {
      if (quoteNow.high >= currentStartPrice && quoteNow.low <= currentStartPrice) {
        return true
      }
    }
    return false;
  }

  private _calculateIndicators = async () => {

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

  private _calculateMarketDirection = (SMA200Now, SMA200Prev, SMA50Now, ATRNow) => {
    if ((SMA200Now > SMA200Prev) && (SMA50Now > SMA200Now) && !SidewaysMarketHelper.isMarketSideways(SMA50Now, SMA200Now, ATRNow)) {
      return TradeDirection.Long
    }

    if (SMA200Now < SMA200Prev && SMA200Now > SMA50Now) {
      return TradeDirection.Short
    }

    return TradeDirection.Lateral
  }


}