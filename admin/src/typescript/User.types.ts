

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
  genericPositionsOfInterest: string[]
  avatarUrl: string;
  pushToken: string;
  createdAt: string;
  updatedAt: string;
}