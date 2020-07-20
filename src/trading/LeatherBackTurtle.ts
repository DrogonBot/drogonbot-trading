import moment from 'moment';

import { IAssetPrice } from '../resources/Asset/asset.types';
import { TradeDirection } from '../resources/Trade/trade.types';
import { ConsoleColor, ConsoleHelper } from '../utils/ConsoleHelper';
import { TradingSystem } from './classes/TradingSystem';
import { TradingDataInterval } from './constant/tradingdata.constant';
import { ATRHelper } from './indicators/ATRHelper';
import { INDICATOR_DATE_FORMAT } from './indicators/constant/indicator.constant';
import { DonchianChannelHelper } from './indicators/DonchianChannelHelper';
import { MovingAverageHelper } from './indicators/MovingAverageHelper';
import { IIndicatorDonchianChannel, IndicatorSeriesType } from './indicators/types/indicator.types';



export class LeatherBackTurtle extends TradingSystem {
  private _systemName: string;
  public symbol: string;
  public interval: TradingDataInterval;


  constructor(symbol: string, interval: TradingDataInterval) {
    super()
    this._systemName = "LeatherBack Turtle Trading"
    this.priceData = []
    this.symbol = symbol;
    this.interval = interval;
    this.marketDirection = null
    this.currentBackTest = null
    this.currentActiveTradeId = null;
    this.currentActiveTradeDirection = null
    this.currentStop = null;
    this.ATRStopMultiple = 3
    this.pyramidNextBuyTarget = 0
    this.pyramidCurrentLayer = 0;
    this.pyramidMaxLayers = 4 //  max entries to trend
  }


  public backTest = async () => {

    ConsoleHelper.coloredLog(ConsoleColor.BgMagenta, ConsoleColor.FgWhite, `🤖 Initializing ${this._systemName}...`)

    // fetch latest asset data and create backtest entry
    const startedBackTesting = await this.startBackTesting()

    if (startedBackTesting === false) {
      return
    }

    // Calculate indicators
    console.log("🤖: Calculating indicators...");
    const donchianChannel20Periods = await DonchianChannelHelper.calculate(this.symbol, 20, this.interval)
    const donchianChannel55Periods = await DonchianChannelHelper.calculate(this.symbol, 55, this.interval)
    const ATR = await ATRHelper.calculate(this.symbol!, this.interval!, 14)
    const MME200 = await MovingAverageHelper.calculateEMA(this.symbol, 200, IndicatorSeriesType.Close, this.interval)

    console.log(`🤖: Running system on ${this.priceData.length} asset prices`);


    // loop through asset data and calculate entry or exit points
    for (let i = 0; i < this.priceData.length; i++) {

      const price2PeriodsAgo = this.priceData[i - 2] || null
      const pricePrevious = this.priceData[i - 1] || null
      const priceNow = this.priceData[i]

      if (!pricePrevious || !price2PeriodsAgo) {
        continue;
      }

      const dateNow = moment(priceNow.date).format(INDICATOR_DATE_FORMAT)
      const previousDate = moment(pricePrevious.date).format(INDICATOR_DATE_FORMAT)
      const date2PeriodsAgo = moment(price2PeriodsAgo.date).format(INDICATOR_DATE_FORMAT)

      const MME200Now = MME200[dateNow]?.value || null
      const MME200Prev = MME200[previousDate]?.value || null
      const ATRNow = ATR[dateNow]?.value || null
      const donchianChannelNow20periods = priceNow ? donchianChannel20Periods[dateNow] : null

      const donchianChannelPrevious20periods = pricePrevious ? donchianChannel20Periods[previousDate] : null
      const donchianChannel2periodsAgo20periods = price2PeriodsAgo ? donchianChannel20Periods[date2PeriodsAgo] : null

      if (!donchianChannelNow20periods || !donchianChannelPrevious20periods || !donchianChannel2periodsAgo20periods || !ATRNow || !MME200Now || !MME200Prev) {
        // skip, because there's no way to analyse
        continue
      }

      this.calculateMainMarketDirection(priceNow, MME200Now, MME200Prev)

      if (!this.currentBackTest || !this.marketDirection) {
        continue;
      }


      // EXITS ========================================



      if (this.canStop(priceNow)) {
        console.log(`STOP=${this.currentStop} / LOW=${priceNow.low}`);
        console.log('ending trade');
        await this.endTrade(priceNow, this.currentStop!, this.currentActiveTradeId, this.currentBackTest._id)

      }


      if (this.isSellSignal(donchianChannelNow20periods, donchianChannelPrevious20periods)) {
        if (this.currentActiveTradeDirection === TradeDirection.Long) {
          this.currentStop = priceNow.low - 0.01
          console.log('exit signal triggered');
        }
      }

      if (this.isAdjustStopSignal(priceNow, donchianChannelNow20periods) && this.currentActiveTradeId) {
        if (this.currentActiveTradeDirection === TradeDirection.Long) {

          const potentialStop = priceNow.low - (ATRNow * this.ATRStopMultiple)

          if (this.currentStop === potentialStop) {
            continue // skip
          }

          if (this.currentStop) {
            if (potentialStop > this.currentStop) {
              this.currentStop = potentialStop

              console.log(`STOP set at ${this.currentStop}`);
            }
          } else {
            this.currentStop = priceNow.low - (ATRNow * this.ATRStopMultiple)

            console.log(`STOP set at ${this.currentStop}`);
          }

        }
      }

      // ENTRIES ========================================

      if (this.canAddPyramidLayer(priceNow)) {
        await this.addPyramidLayerToTrade(priceNow, ATRNow)
      }

      if (this.canStartTrade(priceNow)) {
        console.log('starting trade');
        await this.startTrade(this.symbol, priceNow, ATRNow, this.marketDirection, this.currentBackTest._id)


      }

      if (this.isBuySignal(donchianChannelNow20periods, donchianChannelPrevious20periods, donchianChannel2periodsAgo20periods)) {
        // set start
        this.currentStart = priceNow.high + 0.01
        console.log('entry signal triggered');
      }

    }

    // !Backtest Results!
    // calculate backtest results
    await this.calculateBackTestMetrics()

  }

  public isAdjustStopSignal = (priceNow: IAssetPrice, donchianChannelNow: IIndicatorDonchianChannel) => {

    if (this.currentActiveTradeDirection === TradeDirection.Long) {
      if (priceNow.low <= donchianChannelNow.mid) {
        return true;
      }
    }
    return false
  }


  public isSellSignal = (donchianChannelNow: IIndicatorDonchianChannel, donchianChannelPrevious: IIndicatorDonchianChannel) => {

    // here we will search for price breakouts (high today > high yesterday)
    // Long positions for now
    if (this.marketDirection === TradeDirection.Long && this.currentActiveTradeId) {

      if (donchianChannelNow.low < donchianChannelPrevious.low) {
        return true;
      }
    }
    return false
  }

  public isBuySignal = (donchianChannelNow: IIndicatorDonchianChannel, donchianChannelPrevious: IIndicatorDonchianChannel, donchianChannel2periodsAgo: IIndicatorDonchianChannel) => {

    // here we will search for price breakouts (high today > high yesterday)
    // Long positions for now
    if (this.marketDirection === TradeDirection.Long && !this.currentActiveTradeId) {
      if (donchianChannelNow.high > donchianChannelPrevious.high) {
        return true;
      }
    }
    return false
  }


  public calculateMainMarketDirection = (priceNow: IAssetPrice, MME200Now: number, MME200Prev: number) => {

    if (priceNow.low > MME200Now && (MME200Now > MME200Prev)) {
      return this.marketDirection = TradeDirection.Long;
    }

    if (priceNow.high < MME200Now && (MME200Now < MME200Prev)) {
      return this.marketDirection = TradeDirection.Short
    }

    return this.marketDirection = TradeDirection.Lateral



  }

}
