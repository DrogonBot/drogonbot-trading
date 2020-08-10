import { TradingDataInterval } from '@drogonbot/constants';
import { IQuoteModel } from '@drogonbot/types';
import mongoose, { Model, model } from 'mongoose';

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