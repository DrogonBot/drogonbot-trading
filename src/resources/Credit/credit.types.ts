

export interface ICredit {
  userId: string,
  referralIP: string,
  quantity: number,
  value: number,
  status: CreditStatus,
  payer: string
}


export enum CreditStatus {
  UNPAID = "UNPAID",
  PAID = "PAID"
}

export interface ICreditPayer {
  id: number,
  name: string,
  ppc: number
}