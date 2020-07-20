import moment from 'moment';

import { INDICATOR_DATE_FORMAT } from '../constants/indicator.constant';
import { DataInterval, IAssetPrice } from '../resources/Asset/asset.types';
import { TradeDirection } from '../resources/Trade/trade.types';
import { ConsoleColor, ConsoleHelper } from '../utils/ConsoleHelper';
import { ATRHelper } from '../utils/Indicators/ATRHelper';
import { DonchianChannelHelper } from '../utils/Indicators/DonchianChannelHelper';
import { IIndicatorDonchianChannel } from './../utils/Indicators/types/indicator.types';
import { TradingSystem } from './TradingSystem';


export class LeatherBackTurtle extends TradingSystem {
  private _systemName: string;
  public symbol: string;
  public interval: DataInterval;


  constructor(symbol: string, interval: DataInterval) {
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
  }


  public init = async () => {

    ConsoleHelper.coloredLog(ConsoleColor.BgMagenta, ConsoleColor.FgWhite, `🤖 Initializing ${this._systemName}...`)

    // fetch latest asset data and create backtest entry
    const startedBackTesting = await this.startBackTesting()

    if (startedBackTesting === false) {
      return
    }

    // Calculate indicators
    console.log("🤖: Calculating indicators...");
    const donchianChannel = await DonchianChannelHelper.calculate(this.symbol, 20, this.interval)
    const ATR = await ATRHelper.calculate(this.symbol!, this.interval!, 14)


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

      const ATRNow = ATR[dateNow]?.value || null
      const donchianChannelNow = priceNow ? donchianChannel[dateNow] : null
      const donchianChannelPrevious = pricePrevious ? donchianChannel[previousDate] : null
      const donchianChannel2periodsAgo = price2PeriodsAgo ? donchianChannel[date2PeriodsAgo] : null

      if (!donchianChannelNow || !donchianChannelPrevious || !donchianChannel2periodsAgo || !ATRNow) {
        // skip, because there's no way to analyse
        continue
      }


      this.calculateMainMarketDirection(priceNow, donchianChannelNow)

      if (!this.currentBackTest || !this.marketDirection) {
        continue;
      }


      // EXITS ========================================
      if (this.currentStop && this.currentActiveTradeId) {
        if (priceNow.low <= this.currentStop) {
          console.log(`STOP=${this.currentStop} / LOW=${priceNow.low}`);
          console.log('ending trade');
          await this.endTrade(priceNow, this.currentStop, this.currentActiveTradeId, this.currentBackTest._id)
        }
      }


      if (this.isExitSignal(donchianChannelNow, donchianChannelPrevious)) {
        if (this.currentActiveTradeDirection === TradeDirection.Long) {
          this.currentStop = priceNow.low - 0.01
          console.log('exit signal triggered');
        }
      }

      if (this.isAdjustStopSignal(priceNow, donchianChannelNow) && this.currentActiveTradeId) {
        if (this.currentActiveTradeDirection === TradeDirection.Long) {

          const potentialStop = priceNow.low - (ATRNow * this.ATRStopMultiple)

          if (this.currentStop === potentialStop) {
            continue // skip
          }

          if (this.currentStop) {
            if (potentialStop > this.currentStop) {
              this.currentStop = potentialStop
            }
          } else {
            this.currentStop = priceNow.low - (ATRNow * this.ATRStopMultiple)
          }

          console.log(`STOP set at ${this.currentStop}`);
        }
      }





      // ENTRIES ========================================

      if (this.currentStart && !this.currentActiveTradeId && this.marketDirection !== TradeDirection.Lateral) {
        if (priceNow.high >= this.currentStart) {
          console.log('starting trade');
          await this.startTrade(this.symbol, priceNow, ATRNow, this.currentCapital, this.marketDirection, this.currentBackTest._id)

        }
      }

      if (this.isEntrySignal(donchianChannelNow, donchianChannelPrevious, donchianChannel2periodsAgo)) {
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


  public isExitSignal = (donchianChannelNow: IIndicatorDonchianChannel, donchianChannelPrevious: IIndicatorDonchianChannel) => {

    // here we will search for price breakouts (high today > high yesterday)
    // Long positions for now
    if (this.marketDirection === TradeDirection.Long && this.currentActiveTradeId) {

      if (donchianChannelNow.low < donchianChannelPrevious.low) {
        return true;
      }
    }
    return false
  }

  public isEntrySignal = (donchianChannelNow: IIndicatorDonchianChannel, donchianChannelPrevious: IIndicatorDonchianChannel, donchianChannel2periodsAgo: IIndicatorDonchianChannel) => {

    // here we will search for price breakouts (high today > high yesterday)
    // Long positions for now
    if (this.marketDirection === TradeDirection.Long && !this.currentActiveTradeId) {
      if (donchianChannelNow.high > donchianChannelPrevious.high) {
        return true;
      }
    }
    return false
  }


  public calculateMainMarketDirection = (priceNow: IAssetPrice, donchianChannelNow: IIndicatorDonchianChannel) => {

    if (priceNow.low > donchianChannelNow.mid!) {
      return this.marketDirection = TradeDirection.Long;
    }

    if (priceNow.high < donchianChannelNow.mid!) {
      return this.marketDirection = TradeDirection.Short
    }

    return this.marketDirection = TradeDirection.Lateral



  }

}
