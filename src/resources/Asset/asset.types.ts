export interface IAsset {
  symbol: string,
  isETF: boolean,
  lastRefreshed: Date,
  timeZone: string,
  market: Market,
  sector: Sector,
  priceInterval: PriceInterval,
  pricesData: {
    intraDay?: IPriceItem[],
    daily?: IPriceItem[],
    weekly?: IPriceItem[],
    monthly?: IPriceItem[]
  },
  indicatorsData: {
    intraDay?: IIndicator[],
    daily?: IIndicator[],
    weekly?: IIndicator[],
    monthly?: IIndicator[]
  },
}

export interface IIndicator {
  name: string,
  data: IIndicatorItem[]
}

export interface IIndicatorItem {
  date: Date,
  value: number
}

export interface IPriceItem {
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

export enum PriceInterval {
  Hourly = "Hourly",
  Daily = "Daily",
  Weekly = "Weekly",
  Monthly = "Monthly"
}

export enum TimeSeriesUpdateType {
  Full = "full",
  Partial = "partial"
}