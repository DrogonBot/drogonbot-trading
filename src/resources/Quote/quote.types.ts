import { TradingDataInterval } from '../../trading/constant/tradingdata.constant';

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