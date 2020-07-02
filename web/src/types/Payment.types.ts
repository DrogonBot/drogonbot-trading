export enum PaymentTypes {
  BOLETO = "BOLETO",
  CREDIT_CARD = "CREDIT_CARD",
}

export interface ICreditCardCheckItem {
  isValid: boolean;
  label: string;
}

export interface ICreditCardCheck {
  number: ICreditCardCheckItem;
  cvc: ICreditCardCheckItem;
  expiry: ICreditCardCheckItem;
}

export interface ICreditCard {
  name: string;
  number: string;
  cvc: string;
  expiry: string;
  focus: string;
}
