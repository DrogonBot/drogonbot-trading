import moment from 'moment';

import {
  DEFAULT_ATR_MULTIPLE,
  DEFAULT_BROKER_COMISSION,
  DEFAULT_INITIAL_CAPITAL,
  DEFAULT_MAX_RISK_PER_TRADE,
} from '../constants/backtest.constant';
import { INDICATOR_DATE_FORMAT } from '../constants/indicator.constant';
import { DataInterval, IAssetPrice, IndicatorSeriesType } from '../resources/Asset/asset.types';
import { AssetPrice } from '../resources/AssetPrice/assetprice.model';
import { BackTest, IBackTestModel } from '../resources/BackTest/backtest.model';
import { ITrade } from '../resources/Trade/trade.types';
import { TradingDirection } from '../typescript/trading.types';
import { ConsoleColor, ConsoleHelper } from '../utils/ConsoleHelper';
import { ATRHelper } from '../utils/Indicators/ATRHelper';
import { MovingAverageHelper } from '../utils/Indicators/MovingAverageHelper';
import { PositionSizingHelper } from '../utils/PositionSizingHelper';
import { TradingSystem } from './TradingSystem';



export class OliverTradingSystem extends TradingSystem {
  private _systemName: string;
  private _priceData: IAssetPrice[]
  private _symbol: string;
  private _interval: DataInterval
  private _tradingDirection: TradingDirection | null;
  private _currentBackTest: IBackTestModel | null
  private _currentActiveTrade: ITrade | null

  constructor(symbol: string, interval: DataInterval) {
    super()
    this._priceData = []
    this._systemName = "Oliver Trading System"
    this._symbol = symbol;
    this._interval = interval;
    this._tradingDirection = null
    this._currentBackTest = null
    this._currentActiveTrade = null;
  }


  public init = async () => {

    console.log(`🤖 Initializing ${this._systemName}...`);

    try {
      this._priceData = await AssetPrice.find({ symbol: this._symbol, interval: this._interval }).sort({ "date": "asc" })

      if (this._priceData.length === 0) {
        throw new Error("Asset price not found")
      }

    }
    catch (error) {
      console.error(error);
    }

    console.log(`Running system on ${this._priceData.length} assets`);

    const shorterSMAData = await MovingAverageHelper.calculateSMA(this._symbol, this._interval, 20, IndicatorSeriesType.Close)
    const longerSMAData = await MovingAverageHelper.calculateSMA(this._symbol, this._interval, 200, IndicatorSeriesType.Close)
    const ATR = await ATRHelper.calculate(this._symbol, this._interval, 14)


    // create backtest entry


    try {
      const newBackTest = new BackTest({
        initialCapital: DEFAULT_INITIAL_CAPITAL,
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


        // check for entry

        if (this.isEntrySignal(this._tradingDirection, priceToday, sSMA, lSMA, ATRToday) && !this._currentActiveTrade) {

          // calculate position sizing
          if (this._currentBackTest) {

            ConsoleHelper.coloredLog(ConsoleColor.BgGreen, ConsoleColor.FgWhite, `ENTRY: Adding entry at ${priceToday.date} - ${priceToday.close}`)

            const { maxAllocation,
              units,
              initialStop } = PositionSizingHelper.ATRPositionSizing(this._currentBackTest.initialCapital, DEFAULT_MAX_RISK_PER_TRADE, priceToday.close, ATRToday, DEFAULT_ATR_MULTIPLE)

            const newTrade: ITrade = {
              symbol: this._symbol,
              riskR: DEFAULT_MAX_RISK_PER_TRADE,
              quantity: units,
              allocatedCapital: maxAllocation,
              entryPrice: priceToday.close,
              entryDate: priceToday.date,
              // exitPrice: Number,
              // exitDate: Number,
              currentStop: initialStop,
              commission: DEFAULT_BROKER_COMISSION,

            }

            this._currentBackTest.trades = [
              ...this._currentBackTest.trades,
              newTrade
            ]
            await this._currentBackTest.save();

            this._currentActiveTrade = newTrade;

          } else {
            console.log("Backtest entry not found");
            return false
          }
        }
      }
      i++
    }

  }

  public isExitSignal = (tradingDirection: TradingDirection, price: IAssetPrice, shorterMA: number) => {

    switch (tradingDirection) {
      case TradingDirection.Long:
        return price.close < shorterMA;
      case TradingDirection.Short:
        return price.close > shorterMA;
    }

  }

  public isEntrySignal = (tradingDirection: TradingDirection, price: IAssetPrice, sSMA: number, lSMA: number, ATRToday: number) => {
    switch (tradingDirection) {
      case TradingDirection.Long:
        if (this.pictureOfPower(sSMA, lSMA, price.close) === TradingDirection.Long) {
          if (this.isPriceNearMA(TradingDirection.Long, price.close, sSMA, ATRToday)) {
            return true
          }
        }
        break;
      case TradingDirection.Short:
        if (this.pictureOfPower(sSMA, lSMA, price.close) === TradingDirection.Short) {
          if (this.isPriceNearMA(TradingDirection.Short, price.close, sSMA, ATRToday)) {
            return true
          }
        }
        break;
    }
    return false;
  }


  public pictureOfPower = (shorterMA: number, longerMA: number, closePrice: number) => {
    if ((shorterMA < longerMA) && (closePrice < shorterMA)) {
      return TradingDirection.Short
    }
    if ((shorterMA > longerMA) && (closePrice > shorterMA)) {
      return TradingDirection.Long
    }

    return TradingDirection.Lateral
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