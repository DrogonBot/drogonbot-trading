import { ObjectId } from 'mongodb';
import mongoose, { Document, Model, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

import { IPost, PostCategory, PostPositionType } from './post.types';

export interface IPostModel extends IPost, Document {
  // insert functions here if needed.
  paginate: (any) => any
}

const postSchema = new mongoose.Schema({


  // Explanation about how nested references/population works: https://www.youtube.com/watch?v=kjKR0q8EBKE
  // Note that on the post find route, we'll have to run a .populate('owner') to populate this field properly, otherwise just the Id will be returned!
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    trim: true
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
  isTrustableSource: {
    type: Boolean,
    default: false
  },
  sourceUrl: {
    type: String,
    trim: true
  },
  redirectToSourceOnly: {
    type: Boolean,
    default: false
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
  active: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  isPostedOnTelegram: {
    type: Boolean
  }
}, {
  timestamps: true
})

postSchema.plugin(mongoosePaginate)


export const Post: Model<IPostModel> = model<IPostModel>('Post', postSchema)





