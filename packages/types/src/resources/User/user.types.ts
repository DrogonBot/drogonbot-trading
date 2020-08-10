import { Binary } from 'mongodb';
import { Document, Model } from 'mongoose';


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

export interface IUser extends IUserDocument {
  hashPassword: (string) => string;
  generateAuthToken: () => string;
  getFirstName: () => string
  toJSON: () => Object;
  registerUser: (req?: any) => { token: string };
}

// static methods
export interface IUserModel extends Model<IUser> {
  findByCredentials: (email: string, password: string) => any;
}


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



