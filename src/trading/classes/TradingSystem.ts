import * as mathjs from 'mathjs';

import { IAssetPrice } from '../../resources/Asset/asset.types';
import { AssetPrice, IAssetPriceModel } from '../../resources/AssetPrice/assetprice.model';
import {
  DEFAULT_ATR_MULTIPLE,
  DEFAULT_BROKER_COMMISSION,
  DEFAULT_INITIAL_CAPITAL,
  DEFAULT_LEVERAGE_MULTIPLE,
  DEFAULT_MAX_RISK_PER_TRADE,
} from '../../resources/BackTest/backtest.constant';
import { IBackTestModel } from '../../resources/BackTest/backtest.model';
import { Trade } from '../../resources/Trade/trade.model';
import { TradeDirection } from '../../resources/Trade/trade.types';
import { D } from '../../utils/DateTimeHelper';
import { N } from '../../utils/NumberHelper';
import { PositionSizingHelper } from '../../utils/PositionSizingHelper';
import { TradingDataInterval } from '../constant/tradingdata.constant';

export class TradingSystem {
  public backTestPriceData: IAssetPriceModel[] | null
  public symbol: string | null;
  public interval: TradingDataInterval | null
  public marketDirection: TradeDirection | null;
  public currentBackTest: IBackTestModel | undefined | null
  public currentActiveTradeId: string | null;
  public currentActiveTradeDirection: TradeDirection | null
  public backTestStop: number | null;
  public currentStart: number | null;
  public currentCapital: number;
  public ATRStopMultiple: number;
  public backTestPyramidNextBuyTarget: number;
  public pyramidMaxLayers: number;
  public backTestPyramidCurrentLayer: number;
  public leverageMultiple: number;
  public trailingStops: number[];
  public riskPerTradeR: number

  constructor() {
    this.backTestPriceData = []
    this.symbol = null
    this.interval = null;
    this.marketDirection = null;
    this.currentBackTest = null;
    this.currentActiveTradeId = null;
    this.currentActiveTradeDirection = null;
    this.backTestStop = null;
    this.currentStart = null
    this.currentCapital = DEFAULT_INITIAL_CAPITAL
    this.leverageMultiple = DEFAULT_LEVERAGE_MULTIPLE

    this.ATRStopMultiple = 0;
    this.backTestPyramidNextBuyTarget = 0
    this.backTestPyramidCurrentLayer = 0;
    this.pyramidMaxLayers = 0 //  max entries to trend
    this.trailingStops = []
    this.riskPerTradeR = DEFAULT_MAX_RISK_PER_TRADE
  }

  public fetchPriceData = async (symbol: string, interval: TradingDataInterval) => {
    try {
      const priceData = await AssetPrice.find({ symbol, interval }).sort({ "date": "asc" })

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
  public addPyramidLayerToTrade = async (tradeId: string, priceNow: IAssetPrice, ATRNow: number) => {

    try {
      const currentTrade = await Trade.findOne({ _id: tradeId })

      if (!currentTrade) {
        console.log("addToPosition: Error while trying to fetch current trade");
        return
      }

      // calculate new positions
      const { maxAllocation,
        units,
        initialStop } = PositionSizingHelper.ATRPositionSizing(this.currentCapital - currentTrade.allocatedCapital, this.riskPerTradeR, priceNow.close, ATRNow, DEFAULT_ATR_MULTIPLE)

      const avgPrice = currentTrade.allocatedCapital / currentTrade.quantity

      currentTrade.quantity += units
      currentTrade.allocatedCapital += maxAllocation
      currentTrade.avgEntryPrice = avgPrice
      currentTrade.stopPrice = initialStop
      currentTrade.commission += DEFAULT_BROKER_COMMISSION;
      this.riskPerTradeR += 1
      this.backTestStop = initialStop;
      this.backTestPyramidCurrentLayer++;

      console.log(`🔺: Adding ${units} units ($${maxAllocation}) to position! Total capital $${N.format(this.currentCapital)} - Available capital: ${N.format(this.currentCapital - currentTrade.allocatedCapital)}`)

      console.log(`🛑 pyramid STOP set to ${N.format(initialStop)} on date: ${D.format(priceNow.date)}`);

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

  public setTrailingStop = (priceNow: IAssetPrice, ATRNow: number) => {
    const potentialStop = priceNow.low - (ATRNow * this.ATRStopMultiple)

    if (this.backTestStop) {

      const newTrailingStop = mathjs.median([...this.trailingStops, potentialStop])

      if (this.backTestStop < newTrailingStop) {

        this.backTestStop = newTrailingStop
        console.log(`🛑 ATR trailing STOP set at ${N.format(this.backTestStop!)} on date: ${D.format(priceNow.date)}`);

      }
    }
  }

  public resetVariablesAfterTrading = (profitLoss: number) => {
    this.currentActiveTradeId = null;
    this.currentCapital += profitLoss
    this.backTestStop = null;
    this.currentStart = null;
    this.backTestPyramidCurrentLayer = 0
    this.riskPerTradeR = DEFAULT_MAX_RISK_PER_TRADE
  }

  public canStop = (priceNow: IAssetPrice) => {
    if (this.backTestStop && this.currentActiveTradeId) {
      if (this.currentActiveTradeDirection === TradeDirection.Long) {
        if (priceNow.low <= this.backTestStop) {
          return true
        }
      }
      if (this.currentActiveTradeDirection === TradeDirection.Short) {
        if (priceNow.high >= this.backTestStop) {
          return true
        }
      }

    }
    return false
  }

  public canAddPyramidLayer = (priceNow: IAssetPrice) => {

    if (this.currentActiveTradeDirection === TradeDirection.Long) {
      if (this.currentActiveTradeId && priceNow.high >= this.backTestPyramidNextBuyTarget) {
        if (this.backTestPyramidCurrentLayer < this.pyramidMaxLayers) {
          return true
        }

      }
    }

    return false

  }

  public canStartTrade = (priceNow: IAssetPrice) => {

    if (this.currentStart && !this.currentActiveTradeId && this.marketDirection !== TradeDirection.Lateral) {

      if (this.marketDirection === TradeDirection.Long) {
        if (priceNow.high >= this.currentStart) {
          return true
        }
      }

      if (this.marketDirection === TradeDirection.Short) {
        if (priceNow.low <= this.currentStart) {
          return true
        }
      }
    }
  }
}