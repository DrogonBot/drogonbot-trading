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
  status: IPostApplicationStatus,
  jobRole: string
}

export interface IPost {
  sector: string,
  category: string,
  benefits: string[],
  country: string;
  jobRoles: string[],
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
  owner: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  jobRoles: [
    {
      type: String,
      required: true
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
  email: {
    type: String,
    trim: true,
    required: true
  },
  sector: {
    type: String,
    required: true
  },
  perMonthSalary: {
    type: String,
    trim: true,
  },

  category: {
    type: PostCategory,
    default: PostCategory.DefaultJob
  },
  benefits: [
    {
      type: String
    }
  ],
  externalUrl: {
    type: String,
    trim: true
  },

  source: {
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
      resumeId: {
        type: String,
        required: true
      },
      status: {
        type: String,
        required: true
      },
      jobRole: {
        type: String,
        required: true
      }
    }
  ],

}, {
  timestamps: true
})

export const Post: Model<IPostModel> = model<IPostModel>('Post', postSchema)





