import mongoose from 'mongoose';



const sectorSchema = new mongoose.Schema({
  "country": {
    type: String,
    required: true
  },
  "name": {
    type: String,
    required: true
  }
})

export const Sector = mongoose.model('Sector', sectorSchema)