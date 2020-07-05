import mongoose, { Document, Model, model } from 'mongoose';

import { ICreditCardToken } from './creditcardtoken.types';

export interface ICreditCardModel extends ICreditCardToken, Document {
  // insert functions here if needed.
}

const creditCardTokenSchema = new mongoose.Schema({
  creditCardId: String,
  last4CardNumber: String,
  expirationMonth: String,
  expirationYear: String
}, {
  timestamps: true
})

export const CreditCardToken: Model<ICreditCardModel> = model<ICreditCardModel>('CreditCardToken', creditCardTokenSchema)