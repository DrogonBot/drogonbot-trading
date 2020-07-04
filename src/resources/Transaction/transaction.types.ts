
export interface ITransaction {
  orderId: string
  userId: string,
  type: TransactionTypes,
  code: string,
  reference: TransactionReferences,
  status: string,
  amount: number,
  paymentLink: string,
  dueDate: Date,
}

export enum TransactionTypes {
  BOLETO = "BOLETO",
  CREDIT_CARD = "CREDIT_CARD",
  DEBIT_CARD = "DEBIT_CARD",
  PIC_PAY = "PIC_PAY"
}

export enum TransactionReferences {
  Subscription = "SUBSCRIPTION"
}

export enum TransactionStatus {
  CREATED = "ORDER.CREATED",
  PAID = "ORDER.PAID",
}