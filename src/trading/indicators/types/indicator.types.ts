import { TradingDataInterval } from '../../constant/tradingdata.constant';



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
}

export interface IIndicatorDonchianChannel extends IAssetIndicator {
  high: number,
  mid: number,
  low: number,
}