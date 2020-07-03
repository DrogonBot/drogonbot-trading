import { ObjectId } from 'mongodb';
import mongoose, { Document, Model, model } from 'mongoose';

import { ISubscription } from './subscription.types';

export interface ISubscriptionModel extends ISubscription, Document {
  // insert functions here if needed.
}

const subscriptionSchema = new mongoose.Schema({
  userId: ObjectId,
  subscriptionId: String,
  paymentType: String,
  dueDay: Number,
  status: {
    type: String,
    default: "INACTIVE"
  },
  startsOn: Date,
  nextBillingDate: Date,
}, {
  timestamps: true
})

export const Subscription: Model<ISubscriptionModel> = model<ISubscriptionModel>('Subscription', subscriptionSchema)