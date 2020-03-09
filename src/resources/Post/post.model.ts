import { ObjectId } from 'mongodb';
import mongoose, { Document, Model, model } from 'mongoose';

export enum PostCategory {
  Job = "Job",
  Internship = "Internship",
  Temporary = "Temporary"
}

export enum PostPositionType {
  FullTime = "Full-time",
  PartTime = "Part-time",
  Custom = "Custom"
}

export enum PostBenefits {
  Meal = "Meal",
  FoodTicket = "FoodTicket",
  Transportation = "Transportation",
  HealthCare = "HealthCare",
  LifeInsurance = "LifeInsurance",
  DentalPlan = "DentalPlan"
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

export enum IPostSource {
  Blog = "Blog",
  Facebook = "Facebook",
  Internal = "Internal",
  Other = "Other"
}

export interface IPost {
  sector: string,
  category: string,
  positionType?: PostPositionType
  benefits?: string[],
  jobRoles: string[],
  country: string;
  stateCode: string,
  city: string,
  neighborhood?: string
  title: string,
  content?: string,
  externalUrl?: string,
  companyName?: string, // could be different than the owner name (eg. a HR company that's posting multiple positions for different clients)
  email?: string;
  phone?: string,
  zipCode?: string,
  source?: IPostSource,
  schedule?: string,
  requisites?: string,
  experienceRequired?: boolean,
  monthlySalary?: number;
  yearlySalary?: number;
  hourlySalary?: number;
  images?: Array<String | undefined>,
  likes: number;
  usersWhoLiked: string[],
  applications: IPostApplication[]
  owner: Object,
  createdAt: string,
  updatedAt: string
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
  content: {
    type: String,
    trim: true
  },
  owner: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  positionType: {
    type: PostPositionType,
    default: PostPositionType.FullTime,
    required: true,
  },
  jobRoles: {
    type: [String],
    required: true,
    validate: {

      // TODO: make required work.
      // Solution as described here: https://stackoverflow.com/questions/36860342/mongoose-make-array-required
      // this validation only happens because of this validator function below. the required attribute above doesn't seems to work
      validator(array) {
        // validate that we have at least one element and all of them are strings

        if (array.length === 0) {
          return false
        }

        return array.every((v) => typeof v === 'string');
      }
    }
  },
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
  neighborhood: {
    type: String,
    trim: true,
  },
  zipCode: {
    type: String,
    trim: true
  },
  // At least an email OR a phone should be present!
  email: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true
  },
  sector: {
    type: String,
    required: true
  },
  schedule: {
    type: String,
    trim: true
  },
  requisites: {
    type: String,
    trim: true
  },
  experienceRequired: {
    type: Boolean,
    default: true
  },
  companyName: {
    type: String,
  },

  category: {
    type: PostCategory,
    default: PostCategory.Job
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

  monthlySalary: {
    type: Number,
    trim: true,
  },

  yearlySalary: {
    type: Number,
    trim: true
  },
  hourlySalary: {
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





