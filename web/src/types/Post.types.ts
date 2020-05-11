import { IUser } from './User.types';

export interface IAffiliateProduct {
  platform: string;
  name: string;
  sector: string;
  link: string;
  image: string;
  keywords: string[];
}

export enum PostCategory {
  Job = "Job",
  Internship = "Internship",
  Temporary = "Temporary",
}

export enum PostBenefits {
  Meal = "Meal",
  FoodTicket = "FoodTicket",
  Transportation = "Transportation",
  HealthCare = "HealthCare",
}

export enum IPostApplicationStatus {
  Pending = "Pending",
  Done = "Done",
}

export enum PostPositionType {
  FullTime = "Full-time",
  PartTime = "Part-time",
  Custom = "Custom",
}

export interface IPostApplication {
  resumeId: string;
  status: IPostApplicationStatus;
}

export interface IPost {
  _id: string;
  sector: string;
  category: string;
  positionType: PostPositionType;
  benefits: PostBenefits[];
  country: string;
  jobRoles: string[];
  stateCode: string;
  city: string;
  title: string;
  slug: string;
  content: string;
  externalUrl: string;
  email: string;
  source: string;
  monthlySalary: number;
  yearlySalary: number;
  hourlySalary: number;
  images: Array<String | undefined>;
  likes: number;
  usersWhoLiked: string[];
  applications: IPostApplication[];
  owner: IUser;
  createdAt: string;
  updatedAt: string;
  neighborhood?: string;
  companyName?: string; // could be different than the owner name (eg. a HR company that's posting multiple positions for different clients)
  phone?: string;
  zipCode?: string;
  schedule?: string;
  requisites?: string;
  experienceRequired?: boolean;
}
