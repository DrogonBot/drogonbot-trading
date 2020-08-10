import { IAssetModel, Market, Sector } from '@drogonbot/types';
import mongoose, { Model, model } from 'mongoose';

const assetSchema = new mongoose.Schema({
  name: String,
  ticker: { type: String, unique: true },
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