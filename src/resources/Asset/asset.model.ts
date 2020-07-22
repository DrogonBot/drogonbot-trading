import mongoose, { Document, Model, model } from 'mongoose';

import { IAsset, Market, Sector } from './asset.types';



export interface IAssetModel extends IAsset, Document {
  // insert functions here if needed.
}

const assetSchema = new mongoose.Schema({
  name: String,
  symbol: { type: String, unique: true },
  isETF: Boolean,
  lastRefreshed: Date,
  timeZone: String,
  market: {
    type: String,
    enum: Object.values(Market)
  },
  sector: {
    type: String,
    enum: Object.values(Sector)
  }
})



export const Asset: Model<IAssetModel> = model<IAssetModel>('Asset', assetSchema)