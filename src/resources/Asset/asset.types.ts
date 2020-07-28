export interface IAsset {
  ticker: string,
  isETF: boolean,
  lastRefreshed: Date,
  timeZone: string,
  market: Market,
  sector: Sector,
}

export enum Market {
  Stock = "Stock",
  Bond = "Bond",
  REIT = "REIT",
  Commodity = "Commodity",
  Metal = "Metal"
}

export enum Sector {
  CommunicationServices = "CommunicationServices",
  ConsumerDiscretionary = "ConsumerDiscretionary",
  ConsumerStaples = "ConsumerStaples",
  Energy = "Energy",
  Financial = "Financial",
  HealthCare = "HealthCare",
  Industrials = "Industrials",
  Materials = "Materials",
  RealEstate = "RealEstate",
  Technology = "Technology",
  Utilities = "Utilities"
}


