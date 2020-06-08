import { Binary } from 'mongodb';
import { Document } from 'mongoose';

export interface ILoginData {
  email: string;
  password: string;
}

export enum AuthType {
  EmailPassword = "EmailPassword",
  GoogleOAuth = "GoogleOAuth",
  FacebookOAuth = "FacebookOAuth"
}

export enum UserType {
  JobSeeker = "JobSeeker",
  Company = "Company",
  RecruitmentCompany = "RecruitmentCompany",
  Staff = "Staff",
  Admin = "Admin",
  SMSLead = "SMSLead"
}

export interface IUserNotification {
  jobRoles: string[]
}

export interface IEmailSubscriptionStatus {
  transactional: boolean,
  marketing: boolean
}

export interface IUserDocument extends Document {
  name: string;
  genericPositionsOfInterest: string[]
  language: string;
  country: string;
  stateCode: string;
  city: string;
  type: string; // account type
  givenName: string;
  familyName: string;
  password: string;
  email: string;
  pushToken: string;
  authType: { type: string; default: AuthType.EmailPassword };
  facebookId: string;
  phone: string;
  tokens: Object[];
  avatar: Binary;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
  lastNotification: any;
  emailSubscriptionStatus: IEmailSubscriptionStatus
}