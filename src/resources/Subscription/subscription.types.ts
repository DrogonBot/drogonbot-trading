import { TransactionTypes } from './../Transaction/transaction.types';

export interface ISubscription {
  userId: string,
  paymentType: TransactionTypes,
  status: SubscriptionStatus,
  subscriberDays: number
}

export enum SubscriptionStatus {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
  Cancelled = "CANCELLED"
}