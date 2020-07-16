import mongoose, { Document, Model, model } from 'mongoose';

import { DataInterval, IAssetIndicator, IndicatorSeriesType } from '../Asset/asset.types';




export interface IAssetIndicatorModel extends IAssetIndicator, Document {
  // insert functions here if needed.
}

const assetIndicatorSchema = new mongoose.Schema({
  symbol: String,
  interval: {
    type: String,
    enum: Object.values(DataInterval)
  },
  seriesType: {
    type: String,
    enum: Object.values(IndicatorSeriesType)
  },
  name: String,
  period: Number,
  date: Date,
  value: Number


})



export const AssetIndicator: Model<IAssetIndicatorModel> = model<IAssetIndicatorModel>('AssetIndicator', assetIndicatorSchema)