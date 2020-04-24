import { ObjectId } from 'mongodb';
import mongoose, { Document, Model, model } from 'mongoose';

import { IResume } from './resume.types';





export interface IResumeModel extends IResume, Document {
  // insert functions here if needed.
}

const resumeSchema = new mongoose.Schema({
  ownerId: ObjectId,
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
  positionsOfInterest: [
    {
      name: String
    },

  ],
  highlights: {
    type: String
  },

  address: {
    type: String
  },
  phone: {
    type: String
  },
  linkedInUrl: {
    type: String
  },
  educations: [
    {
      title: String,
      institution: String,
      location: String,
      startingDate: Date,
      endingDate: Date,
      inProgress: Boolean,
      details: String
    }
  ],
  attachments: [{
    name: String,
    link: String
  }],
  experiences: [
    {
      company: String,
      position: String,
      startingDate: Date,
      endingDate: Date,
      inProgress: Boolean,
      location: String,
      details: String
    }
  ],
  awards: [
    {
      title: String,
      description: String
    }
  ],
  additionalInfos: [
    {
      title: String,
      description: String
    }
  ],


})

export const Resume: Model<IResumeModel> = model<IResumeModel>('Resume', resumeSchema)