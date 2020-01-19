import { ObjectId } from 'mongodb';
import mongoose, { Document, Model, model } from 'mongoose';

export interface IPost {
  country: string;
  name: string;
}

export interface IPostModel extends IPost, Document {
  // insert functions here if needed.
}

const postSchema = new mongoose.Schema({
  ownerId: {
    type: ObjectId,
    required: true
  },
  country: {
    type: String,
    trim: true,
    required: true
  },
  stateUf: {
    type: String,
    trim: true,
    required: true
  },
  city: {
    type: String,
    trim: true,
    required: true
  },

  title: {
    type: String,
    required: true,
    trim: true,

  },
  text: {
    type: String,
    required: true,
    trim: true
  },
  externalUrl: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  source: {
    type: String,
    trim: true
  },
  perMonthSalary: {
    type: String,
    trim: true
  },
  perYearSalary: {
    type: String,
    trim: true
  },
  perHourSalary: {
    type: Number,
    trim: true,
  },
  images: [
    {
      type: String,
      default: null
    }
  ],
  sector: {
    id: ObjectId,
    name: String
  },
  likes: {
    type: Number,
    default: 0
  },
  usersWhoLiked: [
    {
      type: String
    }
  ]

}, {
  timestamps: true
})

export const Post: Model<IPostModel> = model<IPostModel>('Post', postSchema)





