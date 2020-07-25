import { IAssetPrice } from '../../resources/Asset/asset.types';
import { BackTestActions } from '../../resources/BackTest/backtest.types';
import { TradeDirection } from '../../resources/Trade/trade.types';
import { D } from '../../utils/DateTimeHelper';
import { N } from '../../utils/NumberHelper';
import { TradingDataInterval } from '../constant/tradingdata.constant';
import { IIndicatorDonchianChannel } from '../indicators/types/indicator.types';
import { TradingSystem } from './TradingSystem';


export class LeatherBackTurtle extends TradingSystem {
  private _systemName: string;
  public symbol: string;
  public interval: TradingDataInterval;
  public trailingStops: number[]

  constructor(symbol: string, interval: TradingDataInterval) {
    super()
    this._systemName = "LeatherBack Turtle Trading"
    this.symbol = symbol;
    this.interval = interval;
    this.marketDirection = null
    this.currentActiveTradeId = null;
    this.currentActiveTradeDirection = null
    this.ATRStopMultiple = 3
    this.currentBackTest = null
    // this.backTestPriceData = []
    this.currentBackTestStop = null;
    this.backTestPyramidNextBuyTarget = 0
    this.backTestPyramidCurrentLayer = 0;
    this.pyramidMaxLayers = 4 //  max entries to trend
    this.trailingStops = []
  }


  // public backTest = async () => {

  //   ConsoleHelper.coloredLog(ConsoleColor.BgMagenta, ConsoleColor.FgWhite, `🤖 Initializing ${this._systemName}...`)

  //   const backTest = new BackTestingSystem()

  //   // fetch latest asset data and create backtest entry
  //   const startBackTest = await backTest.startBackTesting(this.symbol, this.interval)
  //   this.backTestPriceData = startBackTest?.priceData!;
  //   this.currentBackTest = startBackTest?.currentBackTest!

  //   if (!this.backTestPriceData || !this.currentBackTest) {
  //     console.log("Error: failure to initialize BackTest");
  //     return
  //   }


  //   // Calculate indicators
  //   console.log("🤖: Calculating indicators...");

  //   const donchianChannel20Periods = await DonchianChannelHelper.calculate(this.symbol, 20, this.interval)
  //   const ATR = await ATRHelper.calculate(this.symbol, this.interval, 14)
  //   const MME200 = await MovingAverageHelper.calculateEMA(this.symbol, 200, IndicatorSeriesType.Close, this.interval)

  //   console.log(`🤖: Running system on ${this.backTestPriceData.length} asset prices`);

  //   // loop through asset data and calculate entry or exit points
  //   for (let i = 0; i < this.backTestPriceData.length; i++) {

  //     const price2PeriodsAgo = this.backTestPriceData[i - 2] || null
  //     const pricePrevious = this.backTestPriceData[i - 1] || null
  //     const priceNow = this.backTestPriceData[i]

  //     const indicators = {
  //       MME200,
  //       ATR,
  //       donchianChannel20Periods
  //     }

  //     const nextSteps = await this.decideNextSteps(priceNow, pricePrevious, price2PeriodsAgo, indicators)

  //     if (!nextSteps) {
  //       continue
  //     }

  //     switch (nextSteps) {
  //       case BackTestActions.UpdateBackTestData:
  //         await backTest.updateBackTestAfterTrade(this.currentBackTestCapital, this.currentBackTest!._id, this.currentActiveTradeId!)
  //         break;

  //       case BackTestActions.BuyOrder:
  //         const ATRNow = ATR[D.indicatorDateFormat(priceNow.date)].value
  //         const startedTrade = await backTest.startBackTestingTrade(this.currentBackTestCapital, this.symbol, this.currentBackTestStart!, priceNow, ATRNow, this.marketDirection!, this.currentBackTest!._id)

  //         this.currentBackTestStop = startedTrade.stopPrice
  //         this.trailingStops = [this.currentBackTestStop]
  //         console.log(`🛑 initial STOP set at ${N.format(startedTrade.stopPrice)}`);
  //         this.currentActiveTradeId = startedTrade._id;
  //         this.currentActiveTradeDirection = startedTrade.direction;
  //         this.currentBackTestStart = null;
  //         this.backTestPyramidNextBuyTarget = priceNow.close + ATRNow
  //         console.log(`Adding pyramidNextBuyTarget: ${this.backTestPyramidNextBuyTarget}`);



  //         break;
  //       case BackTestActions.SellOrder:
  //         const currentTrade = await backTest.endBackTestingTrade(this.currentBackTestCapital, this.currentBackTestStop!, priceNow, this.currentBackTestStop!, this.currentActiveTradeId)

  //         if (!currentTrade) {
  //           console.log("Error while finishing trade and processing results...");
  //           return
  //         }
  //         // update backtest
  //         await backTest.updateBackTestAfterTrade(this.currentBackTestCapital, this.currentBackTest._id, currentTrade._id)
  //         this.resetVariablesAfterTrading(currentTrade.profitLoss)
  //         break;

  //     }
  //   }

  //   // !Backtest Results!
  //   // calculate backtest results, to finish
  //   await backTest.calculateBackTestMetrics(this.backTestPriceData, this.currentBackTest!._id)
  // }

  // !Most important system function. Here we define how the bot should "think"
  public decideNextSteps = async (priceNow: IAssetPrice, pricePrevious: IAssetPrice, price2PeriodsAgo: IAssetPrice, indicators) => {


    if (!pricePrevious || !price2PeriodsAgo) {
      return false;
    }

    const dateNow = D.indicatorFormat(priceNow.date)
    const previousDate = D.indicatorFormat(pricePrevious.date)
    const date2PeriodsAgo = D.indicatorFormat(price2PeriodsAgo.date)

    const MME200Now = indicators.MME200[dateNow]?.value || null
    const MME200Prev = indicators.MME200[previousDate]?.value || null
    const ATRNow = indicators.ATR[dateNow]?.value || null

    const donchianChannelNow20periods = priceNow ? indicators.donchianChannel20Periods[dateNow] : null
    const donchianChannelPrevious20periods = pricePrevious ? indicators.donchianChannel20Periods[previousDate] : null
    const donchianChannel2periodsAgo20periods = price2PeriodsAgo ? indicators.donchianChannel20Periods[date2PeriodsAgo] : null

    if (!donchianChannelNow20periods || !donchianChannelPrevious20periods || !donchianChannel2periodsAgo20periods || !ATRNow || !MME200Now || !MME200Prev) {
      // skip, because there's no way to analyse
      return false
    }

    this.calculateMainMarketDirection(priceNow, MME200Now, MME200Prev)

    if (!this.currentBackTest || !this.marketDirection) {
      return false;
    }

    // EXITS ========================================

    if (this.canStop(priceNow)) {
      console.log(`STOP=${N.format(this.currentBackTestStop!)} / LOW=${N.format(priceNow.low)}`);
      console.log(`SELL signal EXECUTED on date: ${priceNow.date} - PRICE=${N.format(this.currentBackTestStop!)}`);
      return BackTestActions.SellOrder
    }


    if (this.isSellSignal(donchianChannelNow20periods, donchianChannelPrevious20periods)) {
      if (this.currentActiveTradeDirection === TradeDirection.Long) {
        this.currentBackTestStop = priceNow.low - 0.01
        console.log(`SELL signal PLACED on date: ${D.format(priceNow.date)} - STOP=${N.format(this.currentBackTestStop!)}`);
        console.log(`🛑 exit STOP set to ${N.format(this.currentBackTestStop)} on date: ${D.format(priceNow.date)}`);
      }
    }

    if (this.isAdjustStopSignal(priceNow, donchianChannelNow20periods) && this.currentActiveTradeId) {
      if (this.currentActiveTradeDirection === TradeDirection.Long) {

        const potentialStop = priceNow.low - (ATRNow * this.ATRStopMultiple)

        if (this.currentBackTestStop === potentialStop) {
          return false // skip
        }

        if (this.currentBackTestStop) {
          if (potentialStop > this.currentBackTestStop) {
            this.currentBackTestStop = potentialStop

            console.log(`🛑 STOP increased to ${N.format(this.currentBackTestStop)} on date: ${D.format(priceNow.date)}`);
          }
        } else {
          this.currentBackTestStop = priceNow.low - (ATRNow * this.ATRStopMultiple)

          console.log(`🛑 STOP set at ${N.format(this.currentBackTestStop)} on date: ${D.format(priceNow.date)}`);
        }

      }
    }

    // ENTRIES ========================================

    if (this.canAddPyramidLayer(priceNow)) {
      await this.addPyramidLayerToTrade(this.currentActiveTradeId!, priceNow, ATRNow)
      return BackTestActions.UpdateBackTestData
    }

    if (this.canStartTrade(priceNow)) {
      console.log(`BUY signal EXECUTED on date ${priceNow.date} - EXECUTED=${N.format(this.currentBackTestStart!)}`);
      return BackTestActions.BuyOrder
    }

    if (this.isBuySignal(donchianChannelNow20periods, donchianChannelPrevious20periods, donchianChannel2periodsAgo20periods)) {
      // set start
      this.currentBackTestStart = priceNow.high + 0.01
      console.log(`BUY signal PLACED on date: ${priceNow.date} - START=${N.format(this.currentBackTestStart)}`);
    }
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
