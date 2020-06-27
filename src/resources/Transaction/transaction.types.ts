
export interface ITransaction {
  orderId: string
  userId: string,
  type: TransactionTypes,
  code: string,
  reference: TransactionReferences,
  status: string,
  amount: number,
  boletoLink?: string,
  dueDate: Date,
}

export enum TransactionTypes {
  BOLETO = "BOLETO",
  CREDIT_CARD = "CREDIT_CARD",
  DEBIT_CARD = "DEBIT_CARD",
  PIC_PAY = "PIC_PAY"
}

export enum TransactionReferences {
  CreditosEnvio = "CREDITOS_ENVIO",

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