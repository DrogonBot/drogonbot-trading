import { Dictionary } from 'lodash';

import { IQuote } from '../Quote/quote.types';
import { ITradeModel, TradeStatus } from '../Trade/trade.types';

// More info: https://www.tradinggame.com.au/introduction-to-backtesting-metrics/


export interface ICapitalHistory {
  date: Date,
  currentCapital: number,
  variation: number
}

export interface IBackTest {
  assets: string[],
  trades: ITradeModel[],
  initialCapital: number,
  currentCapital: number,
  buyAndHoldROI: number,
  buyAndHoldROIPerDay: number,
  buyAndHoldROIPerYear: number,
  ROI: number,
  ROIPerDay: number,
  ROIPerYear: number
  expectancy: number, // most important factor!
  winnerTradesPercentage: number,
  loserTradesPercentage: number,
  avgWinnerProfit: number,
  avgLoserLoss: number,
  medianProfitPerTrade: number,
  largestSingleLosingTrade: number,
  largestSingleWinningTrade: number,
  maxDrawdown: number, // maximum drawdown is the largest peak-to-valley loss — in absolute Dollar terms — of the trading system’s historical profit.
  maxDrawdownPercentage: number,
  sharpeRatio: number,
  // profitFactor: number, // Profit factor is the system’s gross profit divided by gross loss. Look for systems that have a profit factor of 2.5, or higher.
  // outlierAdjustedProfitFactor: number,
  // maxConsecutiveWinners: number,
  // maxConsecutiveLosers: number,
  totalDays: number, // at least 4 years of data
  totalTradingDays: number,
  totalTrades: number, // at least 20-25 trades
  avgTradesPerDay: number,
  grossProfit: number, // is the sum of points generated by all profitable trades
  grossLoss: number, // is the sum of points generated by all loss making trades
  totalNetProfit: number, // is gross profit minus gross loss
  totalNetProfitPercentage: number,
  totalCommission: number,
  totalCommissionPercentageFinalCapital: number,
  capitalHistory: ICapitalHistory[]
}

export interface IBackTestTickerDictionary {
  [x: string]: {
    quotes: IQuote[],
    indicators: any,
    quotesDictionary?: Dictionary<IQuote>
  }
}

export interface IBackTestTradeDictionary {
  [ticker: string]: {
    tradeId: string,
    isTradeInProgress: boolean,
    startPrice?: number,
    stopPrice?: number,
    status?: TradeStatus
  }
}

export enum BackTestActions {
  UpdateBackTestData = "UpdateBackTestData",
  BuyOrder = "BuyOrder",
  SellOrder = "SellOrder",
  Skip = "Skip"
}

