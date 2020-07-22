import _ from 'lodash';
import * as mathjs from 'mathjs';
import moment from 'moment';

import { IAssetPrice } from '../../resources/Asset/asset.types';
import {
  DEFAULT_ATR_MULTIPLE,
  DEFAULT_BROKER_COMMISSION,
  DEFAULT_INITIAL_CAPITAL,
  DEFAULT_MAX_RISK_PER_TRADE,
  RISK_FREE_RETURN,
} from '../../resources/BackTest/backtest.constant';
import { BackTest } from '../../resources/BackTest/backtest.model';
import { IBackTestSymbolData } from '../../resources/BackTest/backtest.types';
import { Trade } from '../../resources/Trade/trade.model';
import { TradeDirection, TradeStatus, TradeType } from '../../resources/Trade/trade.types';
import { ConsoleColor, ConsoleHelper } from '../../utils/ConsoleHelper';
import { N } from '../../utils/NumberHelper';
import { PositionSizingHelper } from '../../utils/PositionSizingHelper';
import { TradingDataInterval } from '../constant/tradingdata.constant';
import { TradingSystem } from './TradingSystem';



export class BackTestingSystem extends TradingSystem {
  public backTestSymbolsData: IBackTestSymbolData
  public symbolsMarketDirections: object | null
  public currentBackTestId: string | null


  constructor() {
    super();
    this.symbolsMarketDirections = null
    this.backTestSymbolsData = {}
    this.currentBackTestId = null
  }

  public startBackTesting = async (symbols: string[], interval: TradingDataInterval) => {


    // load price data
    // const priceData = await this.fetchPriceData(symbol, interval)

    for (const symbol of symbols) {
      console.log(`BackTest: Fetching data for ${symbol}. Please wait...`);
      let quotes = await this.fetchPriceData(symbol, interval)


      quotes = _.slice(quotes, 0, 1)

      if (!quotes) {
        throw new Error(`BackTest: failed to fetch data for ${symbol}. Please, make sure you have data for it, first!`)
      }

      this.backTestSymbolsData = {
        [symbol]: {
          indicators: {},
          quotes,
          marketDirection: null
        }
      }
    }

    try {
      console.log('Creating new backtest...');
      const newBackTest = new BackTest({
        assets: symbols,
        initialCapital: DEFAULT_INITIAL_CAPITAL,
        finalCapital: DEFAULT_INITIAL_CAPITAL,
        totalTrades: 0,
        totalCommission: 0,
        totalTradingDays: 0
      })
      await newBackTest.save()

      this.currentBackTestId = newBackTest._id

      if (!this.backTestSymbolsData || !this.currentBackTestId) {
        throw new Error("BackTest: failed to initialize backtest!")
      }

    }
    catch (error) {
      console.error(error);
      return null
    }
  }

  public startBackTestingTrade = async (currentCapital: number, symbol: string, executionPrice: number, price: IAssetPrice, ATR: number, marketDirection: TradeDirection, backTestId: string) => {

    // calculate position sizing
    ConsoleHelper.coloredLog(ConsoleColor.BgGreen, ConsoleColor.FgWhite, `🤖: BUY: Adding entry at ${price.date} - ${N.format(executionPrice)}`)

    const { maxAllocation,
      units,
      initialStop } = PositionSizingHelper.ATRPositionSizing(currentCapital, DEFAULT_MAX_RISK_PER_TRADE, executionPrice, ATR, DEFAULT_ATR_MULTIPLE)


    // Create new trade
    const newTrade = new Trade({
      type: TradeType.BackTest,
      direction: marketDirection,
      backTestId,
      symbol,
      riskR: DEFAULT_MAX_RISK_PER_TRADE,
      quantity: units,
      allocatedCapital: maxAllocation,
      startPrice: executionPrice,
      entryPrice: executionPrice,
      avgEntryPrice: executionPrice,
      entryDate: price.date,
      // exitPrice: Number,
      // exitDate: Number,
      stopPrice: initialStop,
      commission: DEFAULT_BROKER_COMMISSION,
      daysDuration: 0
    })
    await newTrade.save()

    return newTrade;


  }

  public endBackTestingTrade = async (currentCapital: number, executionPrice: number, price: IAssetPrice, currentStop: number, currentActiveTradeId) => {
    const currentTrade = await Trade.findOne({ _id: currentActiveTradeId })

    if (!currentTrade) {
      console.log("Error: current trade not found");
      return
    }

    ConsoleHelper.coloredLog(ConsoleColor.BgRed, ConsoleColor.FgWhite, `🤖: SELL: Adding exit at ${price.date} - ${price.close}`)

    // update current trade

    if (!currentTrade) {
      console.log("Error: current trade not found");
      return
    }


    currentTrade.stopPrice = currentStop;
    currentTrade.status = TradeStatus.Inactive;
    currentTrade.exitDate = price.date;
    currentTrade.exitPrice = executionPrice;
    currentTrade.wasStopped = currentTrade.exitPrice === currentStop
    currentTrade.profitLoss = (currentTrade.exitPrice - currentTrade.avgEntryPrice) * currentTrade.quantity

    ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `${currentTrade.profitLoss > 0 ? `💰` : `😞`}: ProfitLoss: $${currentTrade.profitLoss} - Total available capital of $${currentCapital}.`)


    const a = moment(currentTrade.exitDate);
    const b = moment(currentTrade.entryDate);
    const diff = a.diff(b, 'days')
    currentTrade.daysDuration = diff;
    currentTrade.commission += DEFAULT_BROKER_COMMISSION;
    await currentTrade.save();

    return currentTrade;
  }

  public updateBackTestAfterTrade = async (currentCapital: number, currentBackTestId: string, currentTradeId: string) => {
    const currentTrade = await Trade.findOne({ _id: currentTradeId })
    const currentBackTest = await BackTest.findOne({ _id: currentBackTestId });

    if (currentBackTest && currentTrade) {
      currentBackTest.finalCapital = currentCapital
      currentBackTest.totalTrades++
      if (currentTrade.daysDuration > 0) {
        currentBackTest.totalTradingDays += currentTrade.daysDuration
      }

      const latestCapital = currentBackTest.capitalHistory[currentBackTest.capitalHistory.length - 1]?.currentCapital || currentCapital

      if (currentTrade.exitDate) {
        currentBackTest.capitalHistory = [
          ...currentBackTest.capitalHistory,
          {
            date: currentTrade.exitDate,
            currentCapital,
            variation: ((currentCapital / latestCapital) - 1) * 100
          }
        ]
      }

      currentBackTest.totalCommission += currentTrade.commission
      await currentBackTest.save()
    }
  }


  public calculateBackTestMetrics = async (priceData: IAssetPrice[], currentBackTestId: string) => {

    const winnerTrades = await Trade.find({
      profitLoss: {
        $gt: 0
      }
    })
    const loserTrades = await Trade.find({
      profitLoss: {
        $lte: 0
      }
    })
    const winnerTradesCount = winnerTrades.length
    const loserTradesCount = loserTrades.length
    const totalTradesCount = winnerTradesCount + loserTradesCount

    const winnerTradesSum = _.sumBy(winnerTrades, 'profitLoss')
    const loserTradesSum = _.sumBy(loserTrades, 'profitLoss')

    try {
      const backtest = await BackTest.findOne({
        _id: currentBackTestId
      })

      if (!backtest) {
        console.log('Failed to fetch BackTest from BackTestId');
        return
      }


      const firstPrice = priceData[0].close;
      const lastPrice = priceData[priceData.length - 1].close
      const firstDay = moment(priceData[0].date);
      const lastDay = moment(priceData[priceData.length - 1].date)
      const highestCapitalPoint = _.maxBy(backtest.capitalHistory, 'currentCapital')?.currentCapital
      const lowestCapitalPoint = _.minBy(backtest.capitalHistory, 'currentCapital')?.currentCapital


      backtest.maxDrawdown = (highestCapitalPoint! - lowestCapitalPoint!)
      backtest.maxDrawdownPercentage = N.format((backtest.maxDrawdown / highestCapitalPoint!) * 100)
      backtest.largestSingleLosingTrade = _.minBy(loserTrades, 'profitLoss')!.profitLoss
      backtest.largestSingleWinningTrade = _.maxBy(winnerTrades, 'profitLoss')!.profitLoss
      backtest.grossProfit = winnerTradesSum
      backtest.grossLoss = loserTradesSum;
      backtest.totalNetProfit = winnerTradesSum - loserTradesSum
      backtest.totalNetProfitPercentage = N.format((backtest.totalNetProfit / backtest.initialCapital) * 100)
      backtest.totalTrades = winnerTradesCount + loserTradesCount
      backtest.totalDays = lastDay.diff(firstDay, 'days')
      backtest.avgTradesPerDay = backtest.totalTrades / backtest.totalDays
      backtest.buyAndHoldROI = N.format(((lastPrice / firstPrice) - 1) * 100)
      backtest.buyAndHoldROIPerDay = (backtest.buyAndHoldROI / backtest.totalDays) * 100
      backtest.ROI = N.format((((backtest.finalCapital / backtest.initialCapital) - 1) * 100))
      backtest.buyAndHoldROIPerYear = backtest.buyAndHoldROI / (backtest.totalDays / 365)
      backtest.ROIPerDay = (backtest.ROI / backtest.totalTradingDays) * 100;
      backtest.ROIPerYear = backtest.ROI / (backtest.totalTradingDays / 365)
      backtest.winnerTradesPercentage = N.format(((winnerTradesCount / totalTradesCount) * 100))
      backtest.loserTradesPercentage = N.format(((loserTradesCount / totalTradesCount) * 100))
      backtest.avgWinnerProfit = N.format(winnerTradesSum / winnerTradesCount)
      backtest.avgLoserLoss = N.format(loserTradesSum / loserTradesCount)
      backtest.expectancy = N.format(((backtest.winnerTradesPercentage / 100 * Math.abs(backtest.avgWinnerProfit)) - (backtest.loserTradesPercentage / 100 * Math.abs(backtest.avgLoserLoss))))
      backtest.totalCommissionPercentageFinalCapital = N.format((backtest.totalCommission / backtest.finalCapital) * 100)


      // sharpe ratio
      const variationHistory = backtest.capitalHistory.map((data) => data.variation).filter((variation) => variation !== 0)
      const stdDevROI = mathjs.std(variationHistory)
      const ROIPerYearPercentual = (backtest.ROIPerYear / 100)
      backtest.sharpeRatio = (ROIPerYearPercentual - RISK_FREE_RETURN) / (stdDevROI / 100)

      await backtest.save()

    }
    catch (error) {
      console.error(error);

    }


  }


}