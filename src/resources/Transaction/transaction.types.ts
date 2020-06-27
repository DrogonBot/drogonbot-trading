
export interface ITransaction {
  orderId: string
  userId: string,
  code: string,
  status: string,
  amount: number,
  boletoLink: string,
  dueDate: Date,
}

export enum TransactionStatus {
  CREATED = "ORDER.CREATED",
  WAITING = "ORDER.WAITING",
  PAID = "ORDER.PAID",
  NOT_PAID = "ORDER.NOT_PAID",
  REVERTED = "ORDER.REVERTED"
}

export enum PaymentAvailableMethods {
  Boleto = "boleto",
  CreditCard = "creditcard",
  DebitCard = "debitcard"
}