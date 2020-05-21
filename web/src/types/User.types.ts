export interface IUser {
  _id: string;
  name: string;
  language: string;
  givenName: string;
  familyName: string;
  type: string; // account type
  password: string;
  authType: string;
  facebookId: string;
  email: string;
  tokens: Object[];
  avatar: any;
  genericPositionsOfInterest: string[];
  avatarUrl: string;
  pushToken: string;
  createdAt: string;
  updatedAt: string;
}

export interface INewAccount {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  type: string;
  country?: string;
  province?: string;
  city?: string;
  jobRoles?: string[];
}

export enum UserType {
  JobSeeker = "JobSeeker",
  Company = "Company",
  Staff = "Staff",
  Admin = "Admin",
}
