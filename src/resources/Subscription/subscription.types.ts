import { TransactionTypes } from './../Transaction/transaction.types';

export interface ISubscription {
  userId: string,
  paymentType: TransactionTypes,
  status: "ACTIVE" | "INACTIVE",
  subscriberDays: number
}

export enum SubscriptionStatus {
  Active = "ACTIVE",
  Inactive = "INACTIVE"
}