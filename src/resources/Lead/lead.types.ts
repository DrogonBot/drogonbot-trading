import { IReportItem } from '../../typescript/report.types';
import { UserType } from '../User/user.types';


export interface ILead {
  type: UserType,
  name: string,
  stateCode: string,
  country: string,
  email: string,
  jobRoles: string[],
  phone?: string;
  city?: string;
  unsubscribed: boolean;
  postReportItems: IReportItem[]
}

export interface ILeadRaw {
  email: string,
  group: string,
  name: string,
  position: string
}