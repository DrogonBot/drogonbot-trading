export interface IAsset {
  symbol: string,
  isETF: boolean,
  lastRefreshed: Date,
  timeZone: string,
  market: Market,
  sector: Sector,
}

export interface IAssetPrice {
  symbol: string,
  interval: DataInterval,
  date: Date,
  open: number,
  high: number,
  low: number,
  close: number,
  volume: number
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

export enum DataInterval {
  IntraDay = "IntraDay",
  Daily = "Daily",
  Weekly = "Weekly",
  Monthly = "Monthly"
}

export enum DataUpdateType {
  Full = "full",
  Partial = "partial",
  Latest = "latest"
}

