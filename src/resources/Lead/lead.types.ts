import { IEmailSubscriptionStatus } from '../User/user.types';


export interface ILead {
  name: string,
  stateCode: string,
  country: string,
  email: string,
  jobRoles: string[],
  phone?: string;
  city?: string;
  emailSubscriptionStatus: IEmailSubscriptionStatus
}

export interface ILeadRaw {
  email: string,
  group: string,
  name: string,
  position: string
}