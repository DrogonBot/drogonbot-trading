import { ObjectId } from 'mongodb';
import mongoose, { Document, Model, model } from 'mongoose';

import { IPayment } from './payment.types';

export interface IPaymentModel extends IPayment, Document {
  // insert functions here if needed.
}

const paymentSchema = new mongoose.Schema({
  userId: ObjectId,
  status: Boolean,
  creditsQuantity: Number

}, {
  timestamps: true
})

export const Lead: Model<IPaymentModel> = model<IPaymentModel>('Payment', paymentSchema)