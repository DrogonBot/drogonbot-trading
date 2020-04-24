import mongoose, { Document, Model, model } from 'mongoose';

import { IPlace } from './place.types';




export interface IPlaceModel extends IPlace, Document {
  // insert functions here if needed.
}

export const placeSchema = new mongoose.Schema(
  {
    "country": String,
    "uf": {
      type: Number,
      required: true
    },
    "stateCode": {
      type: String,
      required: true
    },
    "stateName": {
      type: String,
      required: true
    },
    "cities": [
      { "ibgeCode": { type: Number, required: true }, "cityName": { type: String, required: true } }
    ]

  }
)

export const Place: Model<IPlaceModel> = model<IPlaceModel>('Place', placeSchema)