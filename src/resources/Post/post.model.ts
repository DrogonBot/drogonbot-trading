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

  Pending = 'Pending',
  Done = 'Done'
}

export interface IPostApplication {
  resumeId: string,
  status: IPostApplicationStatus
}

export interface IPost {

  category: string,
  benefits: string[],
  country: string;
  position: string,
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
  sector: string,
  likes: number;
  usersWhoLiked: string[],
  applications: IPostApplication[]
  owner: Object
}

export interface IPostModel extends IPost, Document {
  // insert functions here if needed.
}

const postSchema = new mongoose.Schema({


  // Explanation about how nested references/population works: https://www.youtube.com/watch?v=kjKR0q8EBKE
  // Note that on the post find route, we'll have to run a .populate('owner') to populate this field properly, otherwise just the Id will be returned!

  owner: {
    type: ObjectId,
    ref: 'User'
  },
  position: {
    type: String,
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
    type: String
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
  ],

}, {
  timestamps: true
})

export const Post: Model<IPostModel> = model<IPostModel>('Post', postSchema)





