export interface IJunoAccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  user_name: string;
  jti: string;
}

export interface IJunoPayment {
  id: string,
  chargeId: string,
  date: string,
  releaseDate: string,

  amount: number;
  fee: number;
  type: string,
  status: string,
  transactionId: null | string,
  failReason: null | string
}