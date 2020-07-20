import mongoose, { Document, Model, model } from 'mongoose';

import { IBackTest } from './backtest.types';

export interface IBackTestModel extends IBackTest, Document {
  // insert functions here if needed.
}

const backTestSchema = new mongoose.Schema({
  assets: [String],
  initialCapital: Number,
  finalCapital: Number,
  buyAndHoldROI: Number,
  buyAndHoldROIPerDay: Number,
  ROI: Number,
  ROIPerDay: Number,
  expectancy: Number, // most important factor!
  winnerTradesPercentage: Number,
  loserTradesPercentage: Number,
  avgWinnerProfit: Number,
  avgLoserLoss: Number,
  largestSingleLosingTrade: Number,
  largestSingleWinningTrade: Number,
  maxDrawdown: Number,
  maxDrawdownPercentage: Number,
  sharpRatio: Number,
  profitFactor: Number,
  outlierAdjustedProfitFactor: Number,
  maxConsecutiveWinners: Number,
  maxConsecutiveLosers: Number,
  totalDays: {
    type: Number,
    default: 0
  },
  totalTradingDays: {
    type: Number,
    default: 0
  },
  totalTrades: Number,
  avgTradesPerDay: Number,
  grossProfit: Number,
  grossLoss: Number,
  totalNetProfit: Number,
  totalNetProfitPercentage: Number,
  averageProfitPerTrade: Number,
  medianProfitPerTrade: Number,
  totalCommission: Number,
  totalCommissionPercentageFinalCapital: Number,
  capitalHistory: [{
    date: Date,
    currentCapital: Number,
  }]
})



export const BackTest: Model<IBackTestModel> = model<IBackTestModel>('BackTest', backTestSchema)