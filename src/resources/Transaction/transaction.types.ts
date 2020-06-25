
export interface ITransaction {
  userId: string,
  reference: String,
  status: Boolean,
  amount: Number,
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