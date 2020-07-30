import { ObjectId } from 'mongodb';

export interface IOrder {
  ticker: string,
  trade: ObjectId,
  date: Date,
  executionType: OrderExecutionType,
  price: number,
  status: OrderStatus,
  riskR: number,
  allocatedCapital: number,
  quantity: number,
}

export enum OrderType {
  Buy = "Buy",
  Sell = "Sell"
}

export enum OrderExecutionType {
  Market = "Market", // execute right now, at market price
  Limit = "Limit", // wanna buy, but set a limit of how much I'd like to pay for it
  Start = "Start", // Buy stoplos and Start are the same thing, but lets use "start" if favour of better clarity
  StopLoss = "StopLoss",
  // StopLimit = "StopLimit"
}

export enum OrderStatus {
  Filled = "Filled",
  Pending = "Pending",
  PartiallyFilled = "PartiallyFilled",
  Cancelled = "Cancelled",
}