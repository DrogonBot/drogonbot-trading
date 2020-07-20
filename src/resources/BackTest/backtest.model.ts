import mongoose, { Document, Model, model } from 'mongoose';

import { IBackTest } from './backtest.types';

export interface IBackTestModel extends IBackTest, Document {
  // insert functions here if needed.
}

const backTestSchema = new mongoose.Schema({
  initialCapital: Number,
  finalCapital: Number,
  buyAndHoldROI: Number,
  ROI: Number,
  expectancy: Number, // most important factor!
  winnerTradesPercentage: Number,
  loserTradesPercentage: Number,
  avgWinnerProfit: Number,
  avgLoserLoss: Number,
  maxDrawdown: Number,
  maxDrawdownPercentage: Number,
  sharpRatio: Number,
  profitFactor: Number,
  outlierAdjustedProfitFactor: Number,
  maxConsecutiveWinners: Number,
  maxConsecutiveLosers: Number,
  totalDays: Number,
  totalTrades: Number,
  avgTradesPerDay: Number,
  grossProfit: Number,
  grossLoss: Number,
  totalNetProfit: Number,
  totalNetProfitPercentage: Number,
  averageProfitPerTrade: Number,
  medianProfitPerTrade: Number,
  largestSingleLosingTrade: Number,
  largestSingleWinningTrade: Number,
  totalCommission: Number,
  totalCommissionPercentageFinalCapital: Number

})



export const BackTest: Model<IBackTestModel> = model<IBackTestModel>('BackTest', backTestSchema)