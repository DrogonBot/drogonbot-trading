import { ObjectId } from 'mongodb';
import mongoose, { Document, Model, model } from 'mongoose';

import { ITransaction } from './transaction.types';

export interface ITransactionModel extends ITransaction, Document {
  // insert functions here if needed.
}

const transactionSchema = new mongoose.Schema({
  orderId: String,
  userId: ObjectId,
  code: String,
  status: String,
  amount: Number,
  boletoLink: String,
  dueDate: Date,
}, {
  timestamps: true
})

export const Transaction: Model<ITransactionModel> = model<ITransactionModel>('Transaction', transactionSchema)