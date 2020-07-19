import moment from 'moment';

import { INDICATOR_DATE_FORMAT } from '../constants/indicator.constant';
import { DataInterval, IAssetPrice, IndicatorSeriesType } from '../resources/Asset/asset.types';
import { AssetPrice } from '../resources/AssetPrice/assetprice.model';
import { TradingDirection } from '../typescript/trading.types';
import { MovingAverageHelper } from '../utils/Indicators/MovingAverageHelper';



export class OliverTradingSystem {
  private _systemName: string;
  private _priceData: IAssetPrice[]
  private _symbol: string;
  private _interval: DataInterval

  constructor(symbol: string, interval: DataInterval) {
    this._priceData = []
    this._systemName = "Oliver Trading System"
    this._symbol = symbol;
    this._interval = interval;
  }


  public init = async () => {

    console.log(`🤖 Initializing ${this._systemName}...`);

    this._priceData = await AssetPrice.find({ symbol: this._symbol, interval: this._interval }).sort({ "date": "asc" })

    const shorterSMAData = await MovingAverageHelper.calculateSMA(this._symbol, this._interval, 20, IndicatorSeriesType.Close)
    const longerSMAData = await MovingAverageHelper.calculateSMA(this._symbol, this._interval, 200, IndicatorSeriesType.Close)

    let i = 0;
    while (this._priceData[i] !== undefined) {

      const priceToday = this._priceData[i]
      const dateToday = moment(this._priceData[i].date).format(INDICATOR_DATE_FORMAT)

      const sSMA = shorterSMAData[dateToday]?.value
      const lSMA = longerSMAData[dateToday]?.value

      if (sSMA && lSMA) {
        console.log(`Date: ${dateToday} - closing: ${priceToday.close} - SMA20: ${sSMA} - SMA200:${lSMA}`);


        // entry signal (LONG)

        if (this.pictureOfPower(sSMA, lSMA, priceToday.close) === "UP") {

          // if (this.isPriceNearShorterMA("LONG", priceToday.close, sSMA,0.5)) { }


        }




      }




      i++
    }



  }



  public isExitSignal = (tradingDirection: TradingDirection, closePrice: number, shorterMA: number) => {

    switch (tradingDirection) {
      case TradingDirection.Long:
        return closePrice < shorterMA;
      case TradingDirection.Short:
        return closePrice > shorterMA;
    }
  }


  public pictureOfPower = (shorterMA: number, longerMA: number, closePrice: number) => {

    if ((shorterMA < longerMA) && (closePrice < shorterMA)) {
      return "DOWN"
    }

    if ((shorterMA > longerMA) && (closePrice > shorterMA)) {
      return "UP"
    }

    return false
  }

  public isPriceNearShorterMA = (tradingDirection: TradingDirection, closePrice: number, shorterMA: number, ATR: number) => {

    switch (tradingDirection) {
      case TradingDirection.Long:
        return closePrice > shorterMA && closePrice < (shorterMA + ATR)

      case TradingDirection.Short:
        return closePrice < shorterMA && closePrice > (shorterMA - ATR)
    }
  }

  public isRedBarIgnored = (prevPrice, currentPrice, ATR: number) => {

    if (Math.abs((prevPrice.low - prevPrice.open)) < (ATR * 0.8) && Math.abs((prevPrice.high - prevPrice.close)) < (ATR * 0.8)) { // green bar

      if ((Math.abs(currentPrice.high - currentPrice.open) < (ATR * 0.8)) && currentPrice.close < currentPrice.high) { // ignored red bar
        return true
      }
    }

    return false

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