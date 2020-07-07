

export interface ICredit {
  userId: string,
  payer: string
  referralIP: string,
  quantity: number,
  value: number,
  status: CreditStatus,
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