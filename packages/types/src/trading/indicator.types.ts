import { TradingDataInterval } from '@drogonbot/constants';



export enum IndicatorSeriesType {
  Close = "close",
  Open = "open",
  High = "high",
  Low = "low"
}

export interface IAssetIndicator {
  name: string,
  interval: TradingDataInterval,
  seriesType?: IndicatorSeriesType,
  period: number,
  value: number,
  date?: string
}

export interface IIndicatorDonchianChannel extends IAssetIndicator {
  high: number,
  mid: number,
  low: number,
}

export interface IATR {
  name: string;
  interval: TradingDataInterval;
  period: number;
  date?: Date;
  value: number;

}