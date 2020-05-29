
export enum PostCategory {
  Job = "Job",
  Internship = "Internship",
  Temporary = "Temporary"
}

export enum PostPositionType {
  FullTime = "Full-time",
  PartTime = "Part-time",
  Custom = "Custom"
}

export enum PostBenefits {
  Meal = "Meal",
  FoodTicket = "FoodTicket",
  Transportation = "Transportation",
  HealthCare = "HealthCare",
  LifeInsurance = "LifeInsurance",
  DentalPlan = "DentalPlan"
}

export enum IPostApplicationStatus {
  Pending = 'Pending',
  Done = 'Done'
}

export interface IPostApplication {
  resumeId: string,
  status: IPostApplicationStatus,
  jobRole: string
}

export enum PostSource {
  Blog = "Blog",
  Facebook = "Facebook",
  OLX = "OLX",
  Internal = "Internal",
  Other = "Other"
}

export interface IPost {
  slug: string;
  sector: string,
  category: string,
  positionType?: PostPositionType
  benefits?: string[],
  jobRoles: string[],
  country: string;
  stateCode: string,
  city: string,
  neighborhood?: string
  title: string,
  content: string,
  externalUrl?: string,
  companyName?: string, // could be different than the owner name (eg. a HR company that's posting multiple positions for different clients)
  email?: string;
  phone?: string,
  zipCode?: string,
  source?: PostSource,
  isTrustableSource?: boolean,
  sourceUrl?: string,
  schedule?: string,
  requisites?: string,
  experienceRequired?: boolean,
  monthlySalary?: number;
  yearlySalary?: number;
  hourlySalary?: number;
  images?: Array<String | undefined>,
  likes: number;
  usersWhoLiked: string[],
  applications: IPostApplication[]
  owner: Object,
  createdAt: string,
  updatedAt: string,
  active: boolean,
  views: number
}

export interface ISimilarityMatch {
  target: string,
  rating: number;
}