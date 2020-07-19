import moment from 'moment';

import {
  DEFAULT_ATR_MULTIPLE,
  DEFAULT_BROKER_COMISSION,
  DEFAULT_INITIAL_CAPITAL,
  DEFAULT_MAX_RISK_PER_TRADE,
} from '../constants/backtest.constant';
import { DataInterval, IAssetPrice } from '../resources/Asset/asset.types';
import { AssetPrice } from '../resources/AssetPrice/assetprice.model';
import { BackTest, IBackTestModel } from '../resources/BackTest/backtest.model';
import { Trade } from '../resources/Trade/trade.model';
import { TradeDirection, TradeStatus, TradeType } from '../resources/Trade/trade.types';
import { ConsoleColor, ConsoleHelper } from '../utils/ConsoleHelper';
import { PositionSizingHelper } from '../utils/PositionSizingHelper';


export class TradingSystem {
  public priceData: IAssetPrice[]
  public symbol: string | null;
  public interval: DataInterval | null
  public marketDirection: TradeDirection | null;
  public currentBackTest: IBackTestModel | undefined | null
  public currentActiveTradeId: string | null;
  public currentActiveTradeDirection: TradeDirection | null
  public currentStop: number | null;
  public currentStart: number | null;
  public currentCapital: number;
  constructor() {
    this.priceData = []
    this.symbol = null
    this.interval = null;
    this.marketDirection = null;
    this.currentBackTest = null;
    this.currentActiveTradeId = null;
    this.currentActiveTradeDirection = null;
    this.currentStop = null;
    this.currentStart = null
    this.currentCapital = DEFAULT_INITIAL_CAPITAL
  }

  public startBackTesting = async () => {

    // load price data

    try {
      this.priceData = await AssetPrice.find({ symbol: this.symbol, interval: this.interval }).sort({ "date": "asc" })

      if (this.priceData.length === 0) {
        throw new Error("Asset price not found")
      }

    }
    catch (error) {
      console.error(error);
    }

    try {
      console.log('Creating new backtest...');
      const newBackTest = new BackTest({
        initialCapital: DEFAULT_INITIAL_CAPITAL,
        finalCapital: DEFAULT_INITIAL_CAPITAL,
        totalTrades: 0,
      })
      await newBackTest.save()
      this.currentBackTest = newBackTest;
    }
    catch (error) {
      console.error(error);
    }



  }


  public startTrade = async (symbol: string, price: IAssetPrice, ATR: number, currentCapital: number, marketDirection: TradeDirection, backTestId: string) => {

    // calculate position sizing
    ConsoleHelper.coloredLog(ConsoleColor.BgGreen, ConsoleColor.FgWhite, `ENTRY: Adding entry at ${price.date} - ${price.close}`)

    const { maxAllocation,
      units,
      initialStop } = PositionSizingHelper.ATRPositionSizing(currentCapital, DEFAULT_MAX_RISK_PER_TRADE, price.close, ATR, DEFAULT_ATR_MULTIPLE)


    // Create new trade
    const newTrade = new Trade({
      type: TradeType.BackTest,
      direction: marketDirection,
      backTestId,
      symbol,
      riskR: DEFAULT_MAX_RISK_PER_TRADE,
      quantity: units,
      allocatedCapital: maxAllocation,
      entryPrice: price.close,
      entryDate: price.date,
      // exitPrice: Number,
      // exitDate: Number,
      currentStop: initialStop,
      commission: DEFAULT_BROKER_COMISSION,
    })
    await newTrade.save()

    this.currentStop = newTrade.currentStop
    this.currentActiveTradeId = newTrade._id;
    this.currentActiveTradeDirection = newTrade.direction;
    this.currentStart = null;

    return newTrade;


  }

  public endTrade = async (price: IAssetPrice, currentStop: number, currentActiveTradeId, currentBackTestId: string,) => {
    const currentTrade = await Trade.findOne({ _id: currentActiveTradeId })

    if (!currentTrade) {
      console.log("Error: current trade not found");
      return
    }

    ConsoleHelper.coloredLog(ConsoleColor.BgRed, ConsoleColor.FgWhite, `EXIT: Adding exit at ${price.date} - ${price.close}`)

    // update current trade

    if (!currentTrade) {
      console.log("Error: current trade not found");
      return
    }


    currentTrade.currentStop = currentStop;
    currentTrade.status = TradeStatus.Inactive;
    currentTrade.exitDate = price.date;
    currentTrade.exitPrice = price.close;
    currentTrade.wasStopped = currentTrade.exitPrice === currentStop
    currentTrade.profitLoss = (currentTrade.exitPrice - currentTrade.entryPrice) * currentTrade.quantity

    const a = moment(currentTrade.exitDate);
    const b = moment(currentTrade.entryDate);
    const diff = a.diff(b, 'days')   // =1

    currentTrade.daysDuration = diff;
    currentTrade.commission += DEFAULT_BROKER_COMISSION;
    await currentTrade.save();

    this.currentActiveTradeId = null;
    this.currentCapital += currentTrade.profitLoss
    this.currentStop = null;
    this.currentStart = null;

    // update backtest

    const currentBackTest = await BackTest.findOne({ _id: currentBackTestId });

    if (currentBackTest) {
      currentBackTest.finalCapital += currentTrade.profitLoss
      currentBackTest.totalTrades++
      await currentBackTest.save()
    }
    return currentTrade;
  }

  public isPriceNearMA = (tradingDirection: TradeDirection, price: number, MA: number, ATR: number) => {

    switch (tradingDirection) {
      case TradeDirection.Long:
        return price > MA && price < (MA + ATR)

      case TradeDirection.Short:
        return price < MA && price > (MA - ATR)
    }
  }



}