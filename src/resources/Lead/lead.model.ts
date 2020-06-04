import mongoose, { Document, Model, model } from 'mongoose';

import { ILead } from './lead.types';

export interface ILeadModel extends ILead, Document {
  // insert functions here if needed.
}

const leadSchema = new mongoose.Schema({
  stateCode: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String
  },
  jobRoles: {
    type: [String],
    default: []
  },
  phone: {
    type: String
  },
  emailSubscriptionStatus: {
    transactional: Boolean,
    marketing: Boolean
  }
}, {
  timestamps: true
})

export const Lead: Model<ILeadModel> = model<ILeadModel>('Lead', leadSchema)