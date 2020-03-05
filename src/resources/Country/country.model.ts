import mongoose, { Document, Model, model } from 'mongoose';

export interface ICountry {
  name: String,
  code: String
}

export interface ICountryModel extends ICountry, Document {
  // insert functions here if needed.
}

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true }
})

export const Country: Model<ICountryModel> = model<ICountryModel>('Country', countrySchema)