
export interface ISubscription {
  userId: string,
  subscriptionId: string,
  paymentType: "BOLETO" | "CREDIT_CARD",
  dueDay: number,
  status: "ACTIVE" | "INACTIVE",
  startsOn: Date,
  nextBillingDate: Date,
}

export enum SubscriptionStatus {
  Active = "ACTIVE",
  Inactive = "Inactive"
}