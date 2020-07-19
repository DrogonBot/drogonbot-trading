import moment from 'moment';

import { DEFAULT_INITIAL_CAPITAL } from '../constants/backtest.constant';
import { INDICATOR_DATE_FORMAT } from '../constants/indicator.constant';
import { DataInterval, IAssetPrice, IndicatorSeriesType } from '../resources/Asset/asset.types';
import { AssetPrice } from '../resources/AssetPrice/assetprice.model';
import { BackTest } from '../resources/BackTest/backtest.model';
import { TradeDirection } from '../resources/Trade/trade.types';
import { ConsoleColor, ConsoleHelper } from '../utils/ConsoleHelper';
import { ATRHelper } from '../utils/Indicators/ATRHelper';
import { MovingAverageHelper } from '../utils/Indicators/MovingAverageHelper';
import { TradingSystem } from './TradingSystem';


export class OliverTradingSystem extends TradingSystem {
  private _systemName: string;


  constructor(symbol: string, interval: DataInterval) {
    super()
    this._systemName = "Oliver Trading System"
    this.priceData = []
    this.symbol = symbol;
    this.interval = interval;
    this.tradingDirection = null
    this.currentBackTest = null
    this.currentActiveTradeId = null;
    this.currentActiveTradeDirection = null
    this.currentStop = null;
  }


  public init = async () => {
    ConsoleHelper.coloredLog(ConsoleColor.BgMagenta, ConsoleColor.FgWhite, `🤖 Initializing ${this._systemName}...`)


    try {
      this.priceData = await AssetPrice.find({ symbol: this.symbol, interval: this.interval }).sort({ "date": "asc" })

      if (this.priceData.length === 0) {
        throw new Error("Asset price not found")
      }

    }
    catch (error) {
      console.error(error);
    }

    console.log(`🤖: Running system on ${this.priceData.length} assets`);

    const shorterSMAData = await MovingAverageHelper.calculateSMA(this.symbol!, this.interval!, 20, IndicatorSeriesType.Close)
    const longerSMAData = await MovingAverageHelper.calculateSMA(this.symbol!, this.interval!, 200, IndicatorSeriesType.Close)
    const ATR = await ATRHelper.calculate(this.symbol!, this.interval!, 14)

    // create backtest entry
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


    let i = 0;
    while (this.priceData[i] !== undefined) {

      // Variables to be analyzed
      const priceToday = this.priceData[i]
      const dateToday = moment(this.priceData[i].date).format(INDICATOR_DATE_FORMAT)
      const sSMA = shorterSMAData[dateToday]?.value
      const lSMA = longerSMAData[dateToday]?.value
      const ATRToday = ATR[dateToday]?.value

      // Define trading direction (we'll use it to define order entries)
      this.tradingDirection = this.pictureOfPower(sSMA, lSMA, priceToday.close)

      if (sSMA && lSMA) {
        console.log(`Date: ${dateToday} - closing: ${priceToday.close} - SMA20: ${sSMA} - SMA200:${lSMA} - TradingDirection: ${this.tradingDirection}`);

        if (!this.currentBackTest) {
          console.log("Error: Backtest entry not found");
          return false
        }

        // check for entry

        if (this.isEntrySignal(this.tradingDirection, priceToday, sSMA, lSMA, ATRToday) && !this.currentActiveTradeId) {

          const newTrade = await this.startTrade(this.symbol!, priceToday, ATRToday, this.currentBackTest.initialCapital, this.tradingDirection, this.currentBackTest._id)

          this.currentStop = newTrade.currentStop
          this.currentActiveTradeId = newTrade._id;
          this.currentActiveTradeDirection = newTrade.direction;

        } else {

          // check for exit, if there's a current active trade

          if (this.currentActiveTradeId && this.currentActiveTradeDirection) {

            if (this.isExitSignal(this.currentActiveTradeDirection, priceToday, this.currentStop, sSMA)) {

              const finishedTrade = await this.endTrade(priceToday, this.currentBackTest._id)

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