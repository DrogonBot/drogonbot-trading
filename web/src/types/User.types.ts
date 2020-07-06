export interface IUser {
  _id: string;
  stateCode: string;
  cpf?: string;
  country: string;
  city: string;
  postalCode?: string;
  street?: string;
  streetNumber?: string;
  streetNeighborhood?: string;
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
  credits: number;
  isPremium: boolean;
}

export interface INewAccount {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  type: string;
  country?: string;
  stateCode?: string;
  city?: string;
  genericPositionsOfInterest?: string[];
}

export enum UserType {
  JobSeeker = "JobSeeker",
  Company = "Company",
  Staff = "Staff",
  Admin = "Admin",
}

export enum AuthType {
  EmailPassword = "EmailPassword",
  GoogleOAuth = "GoogleOAuth",
  FacebookOAuth = "FacebookOAuth",
}

export interface ICredentials {
  email: string;
  password: string;
  language?: string;
}

export interface IGoogleAuthPayload {
  idToken?: string | null;
  appClientId?: string;
  cancelled?: boolean;
  error?: boolean;
  language?: string;
  type?: string;
}

export interface IFacebookAuthPayload {
  accessToken: string;
  language?: string;
  type?: string;
}
