
export interface ITransaction {
  userId: string,
  reference: string,
  status: number,
  amount: number,
}

export enum TransactionStatus {
  CREATED = "ORDER.CREATED",
  WAITING = "ORDER.WAITING",
  PAID = "ORDER.PAID",
  NOT_PAID = "ORDER.NOT_PAID",
  REVERTED = "ORDER.REVERTED"
}