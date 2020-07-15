import mongoose, { Document, Model, model } from 'mongoose';

import { IAsset, Market, PriceInterval, Sector } from './asset.types';



export interface IAssetModel extends IAsset, Document {
  // insert functions here if needed.
}

const assetSchema = new mongoose.Schema({
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
  },
  priceInterval: {
    type: String,
    enum: Object.values(PriceInterval)
  },
  priceData: [{
    date: String,
    open: Number,
    high: Number,
    low: Number,
    close: Number,
    volume: Number
  }],
  indicators: [{
    name: String,
    data: [
      {
        date: Date,
        value: Number
      }
    ]
  }]
})



export const Asset: Model<IAssetModel> = model<IAssetModel>('Asset', assetSchema)