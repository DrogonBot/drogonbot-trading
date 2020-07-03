
export interface ISubscription {
  subscriptionId: string,
  paymentType: "BOLETO" | "CREDIT_CARD",
  dueDay: number,
  status: "ACTIVE" | "INACTIVE",
  startsOn: Date,
  nextBillingDate: Date,
}