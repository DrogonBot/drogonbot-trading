import mongoose, { Document, Model, model } from 'mongoose';

import { ITrade } from './trade.types';




export interface ITradeModel extends ITrade, Document {
  // insert functions here if needed.
}

const tradeSchema = new mongoose.Schema({
  systemId: String,
  symbol: String,
  riskR: Number,
  quantity: Number,
  allocatedCapital: Number,
  entryPrice: Number,
  entryDate: Date,
  exitPrice: Number,
  exitDate: Number,
  currentStop: Number,
  profitLoss: Number,
  daysDuration: Number,
  comission: Number,
  slippage: Number,


})



export const Trade: Model<ITradeModel> = model<ITradeModel>('Trade', tradeSchema)