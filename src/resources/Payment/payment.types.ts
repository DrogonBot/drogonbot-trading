
export interface IPayment {
  userId: string;
  status: string;
  creditsQuantity: number;
}

export enum TransactionStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  REJECTED = "REJECTED"
}