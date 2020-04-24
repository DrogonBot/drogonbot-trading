
export interface IPlaceCity {
  ibgeCode: number,
  cityName: string
}

export interface IPlace {
  country: string,
  uf: string,
  stateCode: string,
  stateName: string,
  cities: IPlaceCity[]
}
