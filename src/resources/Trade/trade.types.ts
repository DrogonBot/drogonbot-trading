

export interface ITrade {
  type: TradeType,
  direction: TradeDirection,
  status: TradeStatus,
  systemId: string,
  backTestId: string,
  symbol: string,
  riskR: number,
  quantity: number,
  allocatedCapital: number,
  entryPrice: number,
  entryDate: Date,
  commission: number,
  exitPrice?: number,
  exitDate: Date,
  currentStop: number
  wasStopped: boolean
  profitLoss: number,
  daysDuration: number,
  slippage?: number
}

export enum TradeType {
  BackTest = "BackTest",
  Real = "Real"
}

export enum TradeStatus {
  Active = "Active",
  Inactive = "Inactive"
}


export enum TradeDirection {
  Short = "Short",
  Long = "Long",
  Lateral = "Lateral"
}

export type MinutesInterval = "1min" | "5min" | "15min" | "30min" | "60min"