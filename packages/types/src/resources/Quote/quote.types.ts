import { TradingDataInterval } from '@drogonbot/constants';
import { Document } from 'mongoose';

export interface IQuote {
  ticker: string,
  interval: TradingDataInterval,
  date: Date,
  open: number,
  high: number,
  low: number,
  close: number,
  volume: number
}

export interface IQuoteModel extends IQuote, Document {
  // insert functions here if needed.
}
