import mongoose, { Document, Model, model } from 'mongoose';

import { IBackTest } from './backtest.types';

export interface IBackTestModel extends IBackTest, Document {
  // insert functions here if needed.
}

const backTestSchema = new mongoose.Schema({
  expectancy: Number, // most important factor!
  winPercentage: Number,
  lossPercentage: Number,
  maxDrawdown: Number,
  maxDrawdownPercentage: Number,
  sharpRatio: Number,
  profitFactor: Number,
  outlierAdjustedProfitFactor: Number,
  maxConsecutiveWinners: Number,
  maxConsecutiveLosers: Number,
  totalDays: Number,
  totalTrades: Number,
  grossProfit: Number,
  grossLoss: Number,
  totalNetProfit: Number,
  totalNetProfitPercentage: Number,
  averageProfitPerTrade: Number,
  medianProfitPerTrade: Number,
  largestSingleLosingTrade: Number,
  largestSingleWinningTrade: Number,


})



export const BackTest: Model<IBackTestModel> = model<IBackTestModel>('BackTest', backTestSchema)