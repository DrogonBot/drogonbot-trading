import { IOrder, OrderExecutionType, OrderStatus, OrderType } from '@drogonbot/types';
import { ObjectId } from 'mongodb';
import mongoose, { Document, Model, model } from 'mongoose';



export interface IOrderModel extends IOrder, Document {
  // insert functions here if needed.
}

const orderSchema = new mongoose.Schema({
  ticker: {
    type: String
  },
  trade: {
    type: ObjectId,
    ref: "Trade"
  },
  date: {
    type: Date
  },
  type: {
    type: String,
    enum: Object.values(OrderType)
  },
  executionType: {
    type: String,
    enum: Object.values(OrderExecutionType)
  },
  price: Number,
  riskR: Number,
  quantity: Number,
  allocatedCapital: Number,
  status: {
    type: String,
    enum: Object.values(OrderStatus)
  }
})

export const Order: Model<IOrderModel> = model<IOrderModel>('Order', orderSchema)