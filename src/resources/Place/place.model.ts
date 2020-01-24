import { ObjectId } from 'mongodb';
import mongoose, { Document, Model, model } from 'mongoose';


export interface IPlaceCity {
  ibgeCode: number,
  cityName: string
}

export interface IPlace {
  country: string,
  uf: string,
  stateCode: string,
  stateName: string,
  cities: IPlaceCity[]
}



export interface IPlaceModel extends IPlace, Document {
  // insert functions here if needed.
}

export const placeSchema = new mongoose.Schema(
  {
    "country": {
      _id: ObjectId,
      code: String,
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