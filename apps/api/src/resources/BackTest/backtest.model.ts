import { IBackTest } from '@drogonbot/types';
import { ObjectId } from 'mongodb';
import mongoose, { Document, Model, model } from 'mongoose';

export interface IBackTestModel extends IBackTest, Document {
  // insert functions here if needed.
}

const backTestSchema = new mongoose.Schema({
  assets: [String],
  trades: [{
    type: ObjectId,
    ref: "Trade"
  }],
  initialCapital: Number,
  currentCapital: Number,
  buyAndHoldROI: Number,
  buyAndHoldROIPerYear: Number,
  buyAndHoldROIPerDay: Number,
  ROI: Number,
  ROIPerYear: Number,
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
  sharpeRatio: Number,
  // profitFactor: Number,
  // outlierAdjustedProfitFactor: Number,
  // maxConsecutiveWinners: Number,
  // maxConsecutiveLosers: Number,
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
    variation: Number
  }]
})



export const BackTest: Model<IBackTestModel> = model<IBackTestModel>('BackTest', backTestSchema)