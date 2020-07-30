import { ObjectId } from 'mongodb';
import mongoose, { Document, Model, model } from 'mongoose';

import { ITrade, TradeDirection, TradeStatus, TradeType } from './trade.types';




export interface ITradeModel extends ITrade, Document {
  // insert functions here if needed.
}

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