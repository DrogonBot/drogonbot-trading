import { TradeDirection } from '../../typescript/trading.types';


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
  exitDate?: Date,
  currentStop: number
  profitLoss?: number,
  daysDuration?: number,
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