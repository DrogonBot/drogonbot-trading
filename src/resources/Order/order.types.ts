import { ObjectId } from 'mongodb';

export interface IOrder {
  trade: ObjectId
  type: OrderTypes,
  price: number,
  status: OrderStatus
}

export enum OrderTypes {
  Market = "Market", // execute right now, at market price
  Limit = "Limit", // wanna buy, but set a limit of how much I'd like to pay for it
  StopLoss = "StopLoss", // buy stop loss = start order / sell stop loss = regular stop
  StopLimit = "StopLimit"
}

export enum OrderStatus {
  Filled = "Filled",
  Pending = "Pending",
  PartiallyFilled = "PartiallyFilled",
  Cancelled = "Cancelled",
}