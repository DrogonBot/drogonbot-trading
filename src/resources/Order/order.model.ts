import { ObjectId } from 'mongodb';
import mongoose, { Document, Model, model } from 'mongoose';

import { IOrder, OrderStatus, OrderTypes } from './order.types';



export interface IOrderModel extends IOrder, Document {
  // insert functions here if needed.
}

const orderSchema = new mongoose.Schema({
  trade: {
    type: ObjectId,
    ref: "Trade"
  },
  type: {
    type: String,
    enum: Object.values(OrderTypes)
  },
  price: Number,
  status: {
    type: String,
    enum: Object.values(OrderStatus)
  }
}, {
  timestamps: true
})

export const Order: Model<IOrderModel> = model<IOrderModel>('Order', orderSchema)