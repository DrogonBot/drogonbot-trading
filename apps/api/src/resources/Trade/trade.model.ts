import { ITradeModel, TradeDirection, TradeStatus, TradeType } from '@drogonbot/types';
import { ObjectId } from 'mongodb';
import mongoose, { Model, model } from 'mongoose';

const tradeSchema = new mongoose.Schema({
  ticker: String,
  backTest: {
    type: ObjectId,
    ref: "BackTest"
  },
  type: {
    type: String,
    enum: Object.values(TradeType)
  },
  status: {
    type: String,
    enum: Object.values(TradeStatus),
    default: TradeStatus.Active,
  },
  direction: {
    type: String,
    enum: Object.values(TradeDirection)
  },

  entryPrice: Number,
  avgEntryPrice: Number,
  entryDate: Date,
  exitPrice: Number,
  exitDate: Date,
  startPrice: Number,
  stopPrice: Number,
  wasStopped: Boolean,
  profitLoss: Number,
  daysDuration: Number,
  commission: Number,
  slippage: Number,
  orders: [{
    type: ObjectId,
    ref: "Order"
  }]
})

export const Trade: Model<ITradeModel> = model<ITradeModel>('Trade', tradeSchema)