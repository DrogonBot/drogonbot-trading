import { ObjectId } from 'mongodb';
import mongoose, { Document, Model, model } from 'mongoose';


export interface ISector {
  country: string;
  name: string;
}

export interface ISectorModel extends ISector, Document {

}

const sectorSchema = new mongoose.Schema({
  "country": {
    _id: ObjectId,
    code: String,
  },
  "name": {
    type: String,
    required: true
  }
})

export const Sector: Model<ISectorModel> = model<ISectorModel>('Sector', sectorSchema)