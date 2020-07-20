import { DataInterval } from '../../../resources/Asset/asset.types';



export enum IndicatorSeriesType {
  Close = "close",
  Open = "open",
  High = "high",
  Low = "low"
}

export interface IAssetIndicator {
  name: string,
  interval: DataInterval,
  seriesType?: IndicatorSeriesType,
  period: number,
  value: number,
}

export interface IIndicatorDonchianChannel extends IAssetIndicator {
  high: number,
  mid: number,
  low: number,
}