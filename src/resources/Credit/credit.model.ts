import mongoose, { Document, Model, model } from 'mongoose';

import { ICredit } from './credit.types';


export interface ICreditModel extends ICredit, Document {
  // insert functions here if needed.
}

const creditSchema = new mongoose.Schema({
  userId: String,
  payer: String,
  referralIP: String,
  value: Number,
  status: String,
  quantity: Number
}, {
  timestamps: true
})

export const Credit: Model<ICreditModel> = model<ICreditModel>('Credit', creditSchema)