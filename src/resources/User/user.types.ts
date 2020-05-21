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
  Staff = "Staff",
  Admin = "Admin",
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
  language: string;
  givenName: string;
  familyName: string;
  type: string; // account type
  password: string;
  authType: { type: string; default: AuthType.EmailPassword };
  facebookId: string;
  email: string;
  tokens: Object[];
  avatar: Binary;
  genericPositionsOfInterest: string[]
  avatarUrl: string;
  pushToken: string;
  createdAt: string;
  updatedAt: string;
  lastNotification: any;
  emailSubscriptionStatus: IEmailSubscriptionStatus
}