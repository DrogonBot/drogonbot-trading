import { IEmailSubscriptionStatus } from '../User/user.types';


export interface ILead {
  stateCode: string,
  country: string,
  email: string,
  name: string,
  jobRoles: string[],
  emailSubscriptionStatus: IEmailSubscriptionStatus
}

export interface ILeadRaw {
  email: string,
  group: string,
  name: string,
  position: string
}