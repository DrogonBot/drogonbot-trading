import moment from 'moment';

import { DEFAULT_BROKER_COMISSION, DEFAULT_INITIAL_CAPITAL } from '../constants/backtest.constant';
import { INDICATOR_DATE_FORMAT } from '../constants/indicator.constant';
import { DataInterval, IAssetPrice, IndicatorSeriesType } from '../resources/Asset/asset.types';
import { AssetPrice } from '../resources/AssetPrice/assetprice.model';
import { BackTest, IBackTestModel } from '../resources/BackTest/backtest.model';
import { Trade } from '../resources/Trade/trade.model';
import { TradeStatus } from '../resources/Trade/trade.types';
import { TradeDirection } from '../typescript/trading.types';
import { ConsoleColor, ConsoleHelper } from '../utils/ConsoleHelper';
import { ATRHelper } from '../utils/Indicators/ATRHelper';
import { MovingAverageHelper } from '../utils/Indicators/MovingAverageHelper';
import { TradingSystem } from './TradingSystem';



export class OliverTradingSystem extends TradingSystem {
  private _systemName: string;
  private _priceData: IAssetPrice[]
  private _symbol: string;
  private _interval: DataInterval
  private _tradingDirection: TradeDirection | null;
  private _currentBackTest: IBackTestModel | null
  private _currentActiveTradeId: string | null;
  private _currentActiveTradeDirection: TradeDirection | null
  private _currentStop: null | number;

  constructor(symbol: string, interval: DataInterval) {
    super()
    this._priceData = []
    this._systemName = "Oliver Trading System"
    this._symbol = symbol;
    this._interval = interval;
    this._tradingDirection = null
    this._currentBackTest = null
    this._currentActiveTradeId = null;
    this._currentActiveTradeDirection = null
    this._currentStop = null;
  }


  public init = async () => {
    ConsoleHelper.coloredLog(ConsoleColor.BgMagenta, ConsoleColor.FgWhite, `🤖 Initializing ${this._systemName}...`)


    try {
      this._priceData = await AssetPrice.find({ symbol: this._symbol, interval: this._interval }).sort({ "date": "asc" })

      if (this._priceData.length === 0) {
        throw new Error("Asset price not found")
      }

    }
    catch (error) {
      console.error(error);
    }

    console.log(`🤖: Running system on ${this._priceData.length} assets`);

    const shorterSMAData = await MovingAverageHelper.calculateSMA(this._symbol, this._interval, 20, IndicatorSeriesType.Close)
    const longerSMAData = await MovingAverageHelper.calculateSMA(this._symbol, this._interval, 200, IndicatorSeriesType.Close)
    const ATR = await ATRHelper.calculate(this._symbol, this._interval, 14)

    // create backtest entry
    try {
      console.log('Creating new backtest...');
      const newBackTest = new BackTest({
        initialCapital: DEFAULT_INITIAL_CAPITAL,
        finalCapital: DEFAULT_INITIAL_CAPITAL,
        totalTrades: 0,
      })
      await newBackTest.save()
      this._currentBackTest = newBackTest;
    }
    catch (error) {
      console.error(error);
    }


    let i = 0;
    while (this._priceData[i] !== undefined) {


      // Variables to be analyzed
      const priceToday = this._priceData[i]
      const dateToday = moment(this._priceData[i].date).format(INDICATOR_DATE_FORMAT)
      const sSMA = shorterSMAData[dateToday]?.value
      const lSMA = longerSMAData[dateToday]?.value
      const ATRToday = ATR[dateToday]?.value

      // Define trading direction (we'll use it to define order entries)
      this._tradingDirection = this.pictureOfPower(sSMA, lSMA, priceToday.close)

      if (sSMA && lSMA) {
        console.log(`Date: ${dateToday} - closing: ${priceToday.close} - SMA20: ${sSMA} - SMA200:${lSMA} - TradingDirection: ${this._tradingDirection}`);

        if (!this._currentBackTest) {
          console.log("Error: Backtest entry not found");
          return false
        }

        // check for entry

        if (this.isEntrySignal(this._tradingDirection, priceToday, sSMA, lSMA, ATRToday) && !this._currentActiveTradeId) {

          const newTrade = await this.startTrade(this._symbol, priceToday, ATRToday, this._currentBackTest.initialCapital, this._tradingDirection, this._currentBackTest._id)

          this._currentStop = newTrade.currentStop
          this._currentActiveTradeId = newTrade._id;
          this._currentActiveTradeDirection = newTrade.direction;

        } else {

          // check for exit, if there's a current active trade

          if (this._currentActiveTradeId && this._currentActiveTradeDirection) {

            if (this.isExitSignal(this._currentActiveTradeDirection, priceToday, this._currentStop, sSMA)) {

              const currentTrade = await Trade.findOne({ _id: this._currentActiveTradeId })

              if (!currentTrade) {
                console.log("Error: current trade not found");
                return
              }

              ConsoleHelper.coloredLog(ConsoleColor.BgRed, ConsoleColor.FgWhite, `EXIT: Adding exit at ${priceToday.date} - ${priceToday.close}`)

              // update current trade

              if (!currentTrade) {
                console.log("Error: current trade not found");
                return
              }

              currentTrade.status = TradeStatus.Inactive;
              currentTrade.exitDate = priceToday.date;
              currentTrade.exitPrice = priceToday.close;
              currentTrade.profitLoss = (currentTrade.exitPrice - currentTrade.entryPrice) * currentTrade.quantity
              currentTrade.daysDuration = moment(currentTrade.exitDate).diff(moment(currentTrade.entryDate, "days").days())
              currentTrade.commission += DEFAULT_BROKER_COMISSION;
              await currentTrade.save();

              this._currentActiveTradeId = null;

              // update backtest

              const currentBackTest = await BackTest.findOne({ _id: this._currentBackTest._id });

              if (currentBackTest) {
                currentBackTest.finalCapital += currentTrade.profitLoss
                currentBackTest.totalTrades++
                await currentBackTest.save()
              }

            }
          }

        }


      }
      i++
    }

    // now, calculate final backtest metrics

    // TODO: Calculate here
    ConsoleHelper.coloredLog(ConsoleColor.BgMagenta, ConsoleColor.FgWhite, `🤖 Finished backtest!`)


  }

  public isExitSignal = (tradingDirection: TradeDirection, price: IAssetPrice, stopPrice: number | null, shorterMA: number) => {

    switch (tradingDirection) {
      case TradeDirection.Long:

        if (stopPrice && price.low <= stopPrice) {
          return true
        }

        return price.low < shorterMA;
      case TradeDirection.Short:

        if (stopPrice && price.high >= stopPrice) {
          return true;
        }
        return price.high > shorterMA;
    }

  }

  public isEntrySignal = (tradingDirection: TradeDirection, price: IAssetPrice, sSMA: number, lSMA: number, ATRToday: number) => {
    switch (tradingDirection) {
      case TradeDirection.Long:
        if (this.pictureOfPower(sSMA, lSMA, price.close) === TradeDirection.Long) {
          if (this.isPriceNearMA(TradeDirection.Long, price.close, sSMA, ATRToday)) {
            return true
          }
        }
        break;
      case TradeDirection.Short:
        if (this.pictureOfPower(sSMA, lSMA, price.close) === TradeDirection.Short) {
          if (this.isPriceNearMA(TradeDirection.Short, price.close, sSMA, ATRToday)) {
            return true
          }
        }
        break;
    }
    return false;
  }


  public pictureOfPower = (shorterMA: number, longerMA: number, closePrice: number) => {
    if ((shorterMA < longerMA) && (closePrice < shorterMA)) {
      return TradeDirection.Short
    }
    if ((shorterMA > longerMA) && (closePrice > shorterMA)) {
      return TradeDirection.Long
    }

    return TradeDirection.Lateral
  }

}

/*
Trading Rules
- Use 20MA as shorterMA, 200MA as longerMA, by DEFAULT (optimize later)
- trade with the shortMA
- buy above the longMA
- short below the longMA
- all entries should be NEAR the 20MA
- must be actin in the picture of power


*/