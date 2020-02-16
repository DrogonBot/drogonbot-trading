import { ObjectId } from 'mongodb';
import mongoose, { Document, Model, model } from 'mongoose';


export enum PostCategory {
  DefaultJob,
  Internship,
  Temporary
}

export enum PostBenefits {
  Meal,
  FoodTicket,
  Transportation,
  HealthCare
}

export enum IPostApplicationStatus {

  Pending,
  Done
}

export interface IPostApplication {
  resumeId: string,
  status: IPostApplicationStatus
}

export interface IPost {
  ownerId: string,
  category: string,
  benefits: string[],
  country: string;
  stateCode: string,
  city: string,
  title: string,
  text: string,
  externalUrl: string,
  email: string;
  source: string,
  perMonthSalary: string;
  perYearSalary: string;
  perHourSalary: string;
  images: Array<String | undefined>,
  sector: { id: string, name: string },
  likes: number;
  usersWhoLiked: string[],
  applications: IPostApplication[]


}

export interface IPostModel extends IPost, Document {
  // insert functions here if needed.
}

const postSchema = new mongoose.Schema({
  ownerId: {
    type: ObjectId,
    required: true
  },
  category: {
    type: PostCategory,
    required: true,
    default: PostCategory.DefaultJob
  },
  benefits: [
    {
      type: String
    }
  ],
  country: {
    type: String,
    trim: true,
    required: true
  },
  stateCode: {
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
    type: ObjectId,
    ref: 'Sector'
  },
  likes: {
    type: Number,
    default: 0
  },
  usersWhoLiked: [
    {
      type: String
    }
  ],
  applications: [
    {
      resumeId: String,
      status: String
    }
  ]

}, {
  timestamps: true
})

export const Post: Model<IPostModel> = model<IPostModel>('Post', postSchema)





