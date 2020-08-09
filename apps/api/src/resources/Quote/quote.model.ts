import { TradingDataInterval } from '@drogonbot/constants';
import { IQuote } from '@drogonbot/types';
import mongoose, { Document, Model, model } from 'mongoose';



export interface IQuoteModel extends IQuote, Document {
  // insert functions here if needed.
}

const quoteSchema = new mongoose.Schema({
  ticker: String,
  interval: {
    type: String,
    enum: Object.values(TradingDataInterval)
  },
  date: Date,
  open: Number,
  high: Number,
  low: Number,
  close: Number,
  volume: Number
})



export const Quote: Model<IQuoteModel> = model<IQuoteModel>('Quote', quoteSchema)