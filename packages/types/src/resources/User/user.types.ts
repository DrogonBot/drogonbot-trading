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
  Regular = "Regular",
  Staff = "Staff",
  Admin = "Admin",

}




export interface IUserDocument extends Document {
  type: string; // account type
  name: string;
  givenName: string;
  familyName: string;
  cpf?: string;
  language: string;
  country: string;
  stateCode: string;
  city: string;
  postalCode?: string;
  street?: string;
  streetNumber?: string;
  streetNeighborhood?: string;
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
  unsubscribed: boolean;
}