import mongoose, { Document, Model, model } from 'mongoose';

import { IAffiliateProduct } from './affiliate.types';



export interface IAffiliateProductModel extends IAffiliateProduct, Document {
  // insert functions here if needed.
}

const affiliateProductSchema = new mongoose.Schema({
  platform: {
    type: String
  },
  name: {
    type: String
  },
  sector: {
    type: String
  },
  link: {
    type: String
  },
  image: {
    type: String
  },
  keywords: {
    type: [String]
  }
})

export const AffiliateProduct: Model<IAffiliateProductModel> = model<IAffiliateProductModel>('AffiliateProduct', affiliateProductSchema)