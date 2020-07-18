

export interface ITrade {
  systemId: string,
  symbol: string,
  riskR: number,
  quantity: number,
  allocatedCapital: number,
  entryPrice: number,
  entryDate: Date,
  exitPrice: number,
  exitDate: number,
  currentStop: number
  profitLoss: number,
  daysDuration: number,
  comission: number,
  slippage: number
}