import mongoose, { Document, Model, model } from 'mongoose';

import { TradingDataInterval } from '../../trading/constant/tradingdata.constant';
import { IAssetPrice } from '../Asset/asset.types';




export interface IAssetPriceModel extends IAssetPrice, Document {
  // insert functions here if needed.
}

const assetPriceSchema = new mongoose.Schema({
  symbol: String,
  interval: {
    type: String,
    enum: Object.values(TradingDataInterval)
  },
  date: Date,
  open: Number,
  high: Number,
  low: Number,
  close: Number,
  volume: Number

})



export const AssetPrice: Model<IAssetPriceModel> = model<IAssetPriceModel>('AssetPrice', assetPriceSchema)