import axios from 'axios';

export const dataApiAxios = axios.create({
  baseURL: "https://www.alphavantage.co/"
})

export enum TradingDataInterval {
  IntraDay = "IntraDay",
  Daily = "Daily",
  Weekly = "Weekly",
  Monthly = "Monthly"
}

export enum TradingDataUpdateType {
  Full = "full",
  Partial = "partial",
  Latest = "latest"
}

export const intervalNamingShortcuts = {
  [TradingDataInterval.Daily]: "d",
  [TradingDataInterval.Monthly]: "m",
  [TradingDataInterval.Weekly]: "w",
}
