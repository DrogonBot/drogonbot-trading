import { ObjectId } from 'mongodb';
import mongoose, { Document, Model, model } from 'mongoose';




export interface IResumeEducation {
  title: String,
  institution: String,
  location: String,
  startingDate: Date,
  endingDate: Date,
  inProgress: Boolean,
  detail: String
}

export interface IPositionsOfInterest {
  name: String
}

export interface IResumeAttachment {
  name: String | undefined,
  link: String | undefined
}

export interface IResumeAward {
  title: String,
  description: String,
  externalLink: String
}

export interface IResumeAdditionalInfo {
  title: String,
  description: String
}

export interface IResumeExperience {
  title: String,
  position: String,
  startingDate: Date,
  stillWorking: Boolean,
  endingDate: Date,
  location: String,
  details: String
}


export interface ILocation {
  _id: ObjectId,
  name: String
}




export interface IResume {
  ownerId: ObjectId,
  positionsOfInterest: IPositionsOfInterest[],
  highlights: String,
  country: String,
  stateCode: String,
  city: String,
  address: String,
  phone: String,
  linkedInUrl: String,
  educations: IResumeEducation[],
  attachments: IResumeAttachment[],
  experiences: IResumeExperience[],
  awards: IResumeAward[],
  additionalInfos: IResumeAdditionalInfo[]
}

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
    }
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
      detail: String
    }
  ],
  attachments: [{
    name: String,
    link: String
  }],
  experiences: [
    {
      title: String,
      position: String,
      startingDate: Date,
      stillWorking: Boolean,
      endingDate: Date,
      location: String,
      details: String
    }
  ],
  awards: [
    {
      title: String,
      description: String,
      externalLink: String
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