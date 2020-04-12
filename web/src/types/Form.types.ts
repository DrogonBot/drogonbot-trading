export interface ICountry {
  _id: string;
  name: string;
  code: string;
}

export interface IProvince {
  stateName: string;
  stateCode: string;
}

export interface ICityResponse {
  name: string;
}

export interface IJobRole {
  target: string;
  rating: number;
  sectorName: string;
}

export interface ISector {
  keywords: string[];
  _id: string;
  country: string;
  name: string;
  __v: number;
}
