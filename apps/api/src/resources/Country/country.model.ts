import { ICountryModel } from '@drogonbot/types';
import mongoose, { Model, model } from 'mongoose';





const countrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true }
})

export const Country: Model<ICountryModel> = model<ICountryModel>('Country', countrySchema)