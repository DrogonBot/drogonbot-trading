import { ObjectId } from 'mongodb';
import mongoose, { Document, Model, model } from 'mongoose';

import { ITransaction } from './transaction.types';

export interface ITransactionModel extends ITransaction, Document {
  // insert functions here if needed.
}

const transactionSchema = new mongoose.Schema({
  userId: ObjectId,
  reference: String,
  status: Number,
  amount: Number,
}, {
  timestamps: true
})

export const Transaction: Model<ITransactionModel> = model<ITransactionModel>('Transaction', transactionSchema)