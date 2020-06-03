import mongoose, { Document, Model, model } from 'mongoose';

import { IEmailQueue } from './emailqueue.types';

export interface IEmailQueueModel extends IEmailQueue, Document {
  // insert functions here if needed.
}

const emailQueueSchema = new mongoose.Schema({

  subject: {
    type: String
  },
  htmlEmail: {
    type: String
  },
  textEmail: {
    type: String
  },
  from: {
    type: String
  },
  to: {
    type: String
  }
}, {
  timestamps: true
})

export const EmailQueue: Model<IEmailQueueModel> = model<IEmailQueueModel>('EmailQueue', emailQueueSchema)

