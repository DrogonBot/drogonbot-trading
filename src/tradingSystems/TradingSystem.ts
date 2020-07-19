import moment from 'moment';

import { DEFAULT_ATR_MULTIPLE, DEFAULT_BROKER_COMISSION, DEFAULT_MAX_RISK_PER_TRADE } from '../constants/backtest.constant';
import { DataInterval, IAssetPrice } from '../resources/Asset/asset.types';
import { BackTest, IBackTestModel } from '../resources/BackTest/backtest.model';
import { Trade } from '../resources/Trade/trade.model';
import { TradeStatus, TradeType } from '../resources/Trade/trade.types';
import { TradeDirection } from '../typescript/trading.types';
import { ConsoleColor, ConsoleHelper } from '../utils/ConsoleHelper';
import { PositionSizingHelper } from '../utils/PositionSizingHelper';


export class TradingSystem {
  public priceData: IAssetPrice[]
  public symbol: string | null;
  public interval: DataInterval | null
  public tradingDirection: TradeDirection | null;
  public currentBackTest: IBackTestModel | null
  public currentActiveTradeId: string | null;
  public currentActiveTradeDirection: TradeDirection | null
  public currentStop: null | number;

  constructor() {
    this.priceData = []
    this.symbol = null
    this.interval = null;
    this.tradingDirection = null;
    this.currentBackTest = null;
    this.currentActiveTradeId = null;
    this.currentActiveTradeDirection = null;
    this.currentStop = null;
  }


  public startTrade = async (symbol: string, price: IAssetPrice, ATR: number, initialCapital: number, tradeDirection: TradeDirection, backTestId: string) => {

    // calculate position sizing
    ConsoleHelper.coloredLog(ConsoleColor.BgGreen, ConsoleColor.FgWhite, `ENTRY: Adding entry at ${price.date} - ${price.close}`)

    const { maxAllocation,
      units,
      initialStop } = PositionSizingHelper.ATRPositionSizing(initialCapital, DEFAULT_MAX_RISK_PER_TRADE, price.close, ATR, DEFAULT_ATR_MULTIPLE)


    // Create new trade
    const newTrade = new Trade({
      type: TradeType.BackTest,
      direction: tradeDirection,
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

    return newTrade;


  }

  public endTrade = async (price: IAssetPrice, currentBackTestId: string,) => {
    const currentTrade = await Trade.findOne({ _id: this.currentActiveTradeId })

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

    currentTrade.status = TradeStatus.Inactive;
    currentTrade.exitDate = price.date;
    currentTrade.exitPrice = price.close;
    currentTrade.profitLoss = (currentTrade.exitPrice - currentTrade.entryPrice) * currentTrade.quantity

    const a = moment(currentTrade.exitDate);
    const b = moment(currentTrade.entryDate);
    const diff = a.diff(b, 'days')   // =1

    currentTrade.daysDuration = diff;
    currentTrade.commission += DEFAULT_BROKER_COMISSION;
    await currentTrade.save();

    this.currentActiveTradeId = null;

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