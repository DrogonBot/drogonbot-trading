import mongoose, { Document, Model, model } from 'mongoose';


export interface IPlace {
  country: string;
  name: string;
}

export interface IPlaceModel extends IPlace, Document {
  // insert functions here if needed.
}

const placeSchema = new mongoose.Schema(
  {
    "country": {
      type: String,
      required: true
    },
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