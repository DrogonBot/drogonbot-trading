import mongoose, { Document, Model, model } from 'mongoose';

import { UserType } from '../User/user.types';
import { ILead } from './lead.types';

export interface ILeadModel extends ILead, Document {
  // insert functions here if needed.
}

const leadSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    default: UserType.JobSeeker
  },
  stateCode: {
    type: String,
    required: true
  },
  city: {
    type: String
  },
  country: {
    type: String,
    required: true,
  },
  email: {
    type: String
  },
  name: {
    type: String
  },
  jobRoles: {
    type: [String],
    default: []
  },
  phone: {
    type: String,

  },

  emailSubscriptionStatus: {
    transactional: Boolean,
    marketing: Boolean
  }
}, {
  timestamps: true
})

export const Lead: Model<ILeadModel> = model<ILeadModel>('Lead', leadSchema)