import mongoose from 'mongoose';



const sectorSchema = new mongoose.Schema({
  "name": {
    type: String,
    required: true
  }
})

export const Sector = mongoose.model('Sector', sectorSchema)