import mongoose, { Document, Model, model } from 'mongoose';

import { ITrade, TradeDirection, TradeStatus, TradeType } from './trade.types';




export interface ITradeModel extends ITrade, Document {
  // insert functions here if needed.
}

const tradeSchema = new mongoose.Schema({
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
  systemId: String,
  backTestId: String,
  symbol: String,
  riskR: Number,
  quantity: Number,
  allocatedCapital: Number,
  entryPrice: Number,
  entryDate: Date,
  exitPrice: Number,
  exitDate: Date,
  currentStop: Number,
  profitLoss: Number,
  daysDuration: Number,
  commission: Number,
  slippage: Number,
})



export const Trade: Model<ITradeModel> = model<ITradeModel>('Trade', tradeSchema)