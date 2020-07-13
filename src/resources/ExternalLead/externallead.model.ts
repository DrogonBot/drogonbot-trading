import mongoose, { Document, Model, model } from 'mongoose';

import { IExternalLead } from './externallead.types';





export interface IExternalLeadModel extends IExternalLead, Document {
  // insert functions here if needed.
}

const externalLeadSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  phone: String,
  owner: String,
}, {
  timestamps: true
})

export const ExternalLead: Model<IExternalLeadModel> = model<IExternalLeadModel>('ExternalLead', externalLeadSchema)