import mongoose, { Document, Model, model } from 'mongoose';

import { DataInterval, IAssetPrice } from '../Asset/asset.types';




export interface IAssetPriceModel extends IAssetPrice, Document {
  // insert functions here if needed.
}

const assetPriceSchema = new mongoose.Schema({
  symbol: String,
  interval: {
    type: String,
    enum: Object.values(DataInterval)
  },
  date: Date,
  open: Number,
  high: Number,
  low: Number,
  close: Number,
  volume: Number

})



export const AssetPrice: Model<IAssetPriceModel> = model<IAssetPriceModel>('AssetPrice', assetPriceSchema)