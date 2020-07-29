import { ObjectId } from 'mongodb';

import { IOrderModel } from '../Order/order.model';


export interface ITrade {
  backTest: ObjectId,
  type: TradeType,
  direction: TradeDirection,
  status: TradeStatus,
  ticker: string,
  riskR: number,
  quantity: number,
  allocatedCapital: number,
  entryPrice: number,
  avgEntryPrice: number,
  exitPrice: number,
  startPrice: number,
  stopPrice: number,
  entryDate: Date,
  commission: number,
  exitDate: Date,
  wasStopped: boolean
  profitLoss: number,
  daysDuration: number,
  slippage?: number,
  orders: IOrderModel[]
}

export enum TradeType {
  BackTest = "BackTest",
  Real = "Real"
}

export enum TradeStatus {
  Active = "Active",
  Inactive = "Inactive"
}


export enum TradeDirection {
  Short = "Short",
  Long = "Long",
  Lateral = "Lateral"
}

export type MinutesInterval = "1min" | "5min" | "15min" | "30min" | "60min"

export enum TradeActions {
  BuyOrder = "BuyOrder",
  SellOrder = "SellOrder",
}

