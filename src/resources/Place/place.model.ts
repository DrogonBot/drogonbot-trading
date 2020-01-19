import mongoose from 'mongoose';

const placeSchema = new mongoose.Schema({
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

})

export const Place = mongoose.model('Place', placeSchema)