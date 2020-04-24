

export interface ILead {
  stateCode: string,
  country: string,
  email: string,
  name: string,
  jobRoles: string[]
}

export interface ILeadRaw {
  email: string,
  group: string,
  name: string,
  position: string
}