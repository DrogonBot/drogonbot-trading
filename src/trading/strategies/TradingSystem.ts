import * as mathjs from 'mathjs';

import {
  DEFAULT_ATR_MULTIPLE,
  DEFAULT_BROKER_COMMISSION,
  DEFAULT_INITIAL_CAPITAL,
  DEFAULT_MAX_RISK_PER_TRADE,
} from '../../resources/BackTest/backtest.constant';
import { IBackTestModel } from '../../resources/BackTest/backtest.model';
import { Quote } from '../../resources/Quote/quote.model';
import { IQuote } from '../../resources/Quote/quote.types';
import { Trade } from '../../resources/Trade/trade.model';
import { TradeDirection } from '../../resources/Trade/trade.types';
import { D } from '../../utils/DateTimeHelper';
import { NumberHelper } from '../../utils/NumberHelper';
import { PositionSizingHelper } from '../../utils/PositionSizingHelper';
import { TradingDataInterval } from '../constant/tradingdata.constant';

export class TradingSystem {


  public interval: TradingDataInterval | null
  public marketDirection: TradeDirection | null;
  public currentBackTest: IBackTestModel | undefined | null
  public currentActiveTradeId: string | null;
  public currentActiveTradeDirection: TradeDirection | null
  public currentBackTestStop: number | null;
  public currentBackTestStart: number | null;
  public currentBackTestCapital: number;
  public ATRStopMultiple: number;
  public backTestPyramidNextBuyTarget: number;
  public pyramidMaxLayers: number;
  public backTestPyramidCurrentLayer: number;

  public trailingStops: number[];
  public backTestRiskPerTradeR: number

  constructor() {

    this.interval = null;
    this.marketDirection = null;
    this.currentBackTest = null;
    this.currentActiveTradeId = null;
    this.currentActiveTradeDirection = null;
    this.currentBackTestStop = null;
    this.currentBackTestStart = null
    this.currentBackTestCapital = DEFAULT_INITIAL_CAPITAL

    this.ATRStopMultiple = 0;
    this.backTestPyramidNextBuyTarget = 0
    this.backTestPyramidCurrentLayer = 0;
    this.pyramidMaxLayers = 0 //  max entries to trend
    this.trailingStops = []
    this.backTestRiskPerTradeR = DEFAULT_MAX_RISK_PER_TRADE
  }

  public fetchPriceData = async (symbol: string, interval: TradingDataInterval) => {
    try {
      const priceData = await Quote.find({ symbol, interval }).sort({ "date": "asc" })

      console.log(`debug: first data for symbol ${symbol} is ${priceData[0].date}`);

      if (priceData.length === 0) {
        console.log(`Error: No price data found for ${symbol}!`);
        return null
      }

      return priceData

    }
    catch (error) {
      console.error(error);
      return null
    }

  }


  // Pyramiding
  public addPyramidLayerToTrade = async (tradeId: string, priceNow: IQuote, ATRNow: number) => {

    try {
      const currentTrade = await Trade.findOne({ _id: tradeId })

      if (!currentTrade) {
        console.log("addToPosition: Error while trying to fetch current trade");
        return
      }

      // calculate new positions
      const { maxAllocation,
        units,
        initialStop } = PositionSizingHelper.ATRPositionSizing(this.currentBackTestCapital - currentTrade.allocatedCapital, this.backTestRiskPerTradeR, priceNow.close, ATRNow, DEFAULT_ATR_MULTIPLE)

      const avgPrice = currentTrade.allocatedCapital / currentTrade.quantity

      currentTrade.quantity += units
      currentTrade.allocatedCapital += maxAllocation
      currentTrade.avgEntryPrice = avgPrice
      currentTrade.stopPrice = initialStop
      currentTrade.commission += DEFAULT_BROKER_COMMISSION;
      this.currentBackTestStop = initialStop;
      this.backTestPyramidCurrentLayer++;
      this.backTestRiskPerTradeR += 1

      console.log(`🔺: Pyramid: Layer=${this.backTestPyramidCurrentLayer}) R=${this.backTestRiskPerTradeR}. Adding ${units} units ($${maxAllocation}) to position! Total capital $${NumberHelper.format(this.currentBackTestCapital)} - Available capital: ${NumberHelper.format(this.currentBackTestCapital - currentTrade.allocatedCapital)}`)

      console.log(`🛑 Pyramid: STOP set to ${NumberHelper.format(initialStop)} on date: ${D.format(priceNow.date)}`);

      await currentTrade.save()
    }
    catch (error) {
      console.error(error);
    }
  }



  public isPriceNearMA = (tradingDirection: TradeDirection, price: number, MA: number, ATR: number) => {

    switch (tradingDirection) {
      case TradeDirection.Long:
        return price > MA && price < (MA + ATR)

      case TradeDirection.Short:
        return price < MA && price > (MA - ATR)
    }
  }

  public setTrailingStop = (priceNow: IQuote, ATRNow: number) => {
    const potentialStop = priceNow.low - (ATRNow * this.ATRStopMultiple)

    if (this.currentBackTestStop) {

      const newTrailingStop = mathjs.median([...this.trailingStops, potentialStop])

      if (this.currentBackTestStop < newTrailingStop) {

        this.currentBackTestStop = newTrailingStop
        console.log(`🛑 ATR trailing STOP set at ${NumberHelper.format(this.currentBackTestStop!)} on date: ${D.format(priceNow.date)}`);

      }
    }
  }

  public resetVariablesAfterTrading = (profitLoss: number) => {
    this.currentActiveTradeId = null;
    this.currentBackTestCapital += profitLoss
    this.currentBackTestStop = null;
    this.currentBackTestStart = null;
    this.backTestPyramidCurrentLayer = 0
    this.backTestRiskPerTradeR = DEFAULT_MAX_RISK_PER_TRADE
  }

  public canStop = (priceNow: IQuote) => {
    if (this.currentBackTestStop && this.currentActiveTradeId) {
      if (this.currentActiveTradeDirection === TradeDirection.Long) {
        if (priceNow.low <= this.currentBackTestStop) {
          return true
        }
      }
      if (this.currentActiveTradeDirection === TradeDirection.Short) {
        if (priceNow.high >= this.currentBackTestStop) {
          return true
        }
      }

    }
    return false
  }

  public canAddPyramidLayer = (priceNow: IQuote) => {

    if (this.currentActiveTradeDirection === TradeDirection.Long) {
      if (this.currentActiveTradeId && priceNow.high >= this.backTestPyramidNextBuyTarget) {
        if (this.backTestPyramidCurrentLayer < this.pyramidMaxLayers) {
          return true
        }

      }
    }

    return false

  }

  public canStartTrade = (priceNow: IQuote) => {

    if (this.currentBackTestStart && !this.currentActiveTradeId && this.marketDirection !== TradeDirection.Lateral) {

      if (this.marketDirection === TradeDirection.Long) {
        if (priceNow.high >= this.currentBackTestStart) {
          return true
        }
      }

      if (this.marketDirection === TradeDirection.Short) {
        if (priceNow.low <= this.currentBackTestStart) {
          return true
        }
      }
    }
  }
}