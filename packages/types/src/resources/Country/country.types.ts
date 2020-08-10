import { Document } from 'mongoose';

export interface ICountry {
  name: String,
  code: String
}

export interface ICountryModel extends ICountry, Document {
  // insert functions here if needed.
}