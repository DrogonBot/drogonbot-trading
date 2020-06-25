
export interface ITransaction {
  userId: string,
  reference: string,
  status: string,
  amount: number,
}

export enum TransactionStatus {
  PENDING = 1,
  ANALYZING = 2,
  PAID = 3,
  AVAILABLE = 4,
  DISPUTE = 5,
  RETURNED = 6,
  CANCELLED = 7
}