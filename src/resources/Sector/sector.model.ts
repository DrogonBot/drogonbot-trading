import mongoose, { Document, Model, model } from 'mongoose';


export interface ISector {
  country: string;
  name: string;
  keywords: string[];
}

export interface ISectorModel extends ISector, Document {

}

const sectorSchema = new mongoose.Schema({
  "country": {
    type: String,
    required: true
  },
  "name": {
    type: String,
    required: true
  },
  "keywords": [{ type: String }]
})

export const Sector: Model<ISectorModel> = model<ISectorModel>('Sector', sectorSchema)