import { ObjectId } from 'mongodb';

export interface IResumeEducation {
  title: String,
  institution: String,
  location: String,
  startingDate: Date,
  endingDate: Date,
  inProgress: Boolean,
  details: String
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
  description: String
}

export interface IResumeAdditionalInfo {
  title: String,
  description: String
}

export interface IResumeExperience {
  company: String,
  position: String,
  startingDate: Date,
  endingDate: Date,
  inProgress: Boolean,
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