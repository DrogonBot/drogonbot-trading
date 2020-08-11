import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

import { IOrder } from '../Order/order.types';

export interface ITrade {
  backTest: ObjectId,
  type: TradeType,
  direction: TradeDirection,
  status: TradeStatus,
  ticker: string,
  riskR: number,
  allocatedCapital: number,
  quantity: number,
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
  orders: IOrder[]
}

export interface ITradeModel extends ITrade, Document {
  // insert functions here if needed.
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

