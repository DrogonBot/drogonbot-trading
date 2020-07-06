import axios from 'axios';
import moment from 'moment';
import { base64encode } from 'nodejs-base64';

import { TransactionTypes } from '../../../resources/Transaction/transaction.types';
import { IUser } from '../../../resources/User/user.model';
import { Payment } from './../Payment';
import { junoAxiosRequest } from './junopayment.constants';
import { IJunoAccessTokenResponse } from './junopayment.types';

export class JunoPayment extends Payment {

  public accessToken: string | null;
  public providerName: string;

  constructor() {
    super()
    this.providerName = "Juno"
    this.accessToken = null;
  }

  public getAccessToken = async (): Promise<IJunoAccessTokenResponse> => {

    const basicToken = base64encode(`${process.env.JUNO_CLIENT_ID}:${process.env.JUNO_SECRET}`)

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');


    const response = await axios({
      method: "POST",
      url: `${process.env.JUNO_AUTHORIZATION_SERVER}/oauth/token`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${basicToken}`,
      },
      data: params
    })

    const junoResponse: IJunoAccessTokenResponse = response.data;

    this.accessToken = junoResponse.access_token;

    // set it as authorization token for every request...
    junoAxiosRequest.defaults.headers.common.Authorization = `Bearer ${this.accessToken}`

    return response.data;
  }

  public request = async (method, endpoint: string, data: Object | null) => {

    const response = await junoAxiosRequest.request({
      method,
      url: endpoint,
      data,
    })

    return response
  }

  public generateCreditCardCharge = async (user: IUser, reference: string, description: string, amount: number, buyerCreditCardHash: string, buyerName: string, buyerCPF: string, buyerEmail: string, buyerAddress: string) => {

    // First we generate an PAYMENT CHARGE
    const chargeResponse = await this.request("POST", "/charges", {
      "charge": {
        "description": description,
        "amount": amount,
        "references": [reference],
        "paymentTypes": ["CREDIT_CARD"]
      },
      "billing": {
        "name": buyerName,
        "document": buyerCPF,
        "email": buyerEmail,
        "notify": "true"
      }
    })
    const { _embedded } = chargeResponse.data;
    const order = _embedded.charges[0];
    const chargeId = chargeResponse.data._embedded.charges[0].id

    console.log(order);

    // record order in our database. We'll need to do it to update it once we receive an webhook with payment details
    await this.recordTransactionOrder(user._id, this.providerName, order.id, order.code, order.reference, order.amount, order.installmentLink, order.dueDate, TransactionTypes.CREDIT_CARD)

    // Then we PAY the order
    try {
      const paymentResponse = await this.request("POST", "/payments", {
        "chargeId": chargeId,
        "billing": {
          "email": buyerEmail,
          "address": buyerAddress,
          "delayed": false
        },
        "creditCardDetails": {
          "creditCardHash": buyerCreditCardHash
        }
      })

      console.log('PAYMENT RESPONSE');
      console.log(paymentResponse.data);

      // const isPaymentConfirmed = paymentResponse.data.payments.some((payment) => payment.status === "CONFIRMED")

      // if (isPaymentConfirmed) {

      //   console.log('Tokenizing credit card...');

      //   // lets tokenize our credit card

      //   const tokenizationResponse = await this.request("POST", "/credit-cards/tokenization", {
      //     creditCardHash: buyerCreditCardHash
      //   })

      //   console.log('TOKENIZATION RESPONSE');

      //   const ccToken = tokenizationResponse.data;

      //   console.log(ccToken);

      //   console.log(ccToken);

      //   const newCreditCardToken = new CreditCardToken({
      //     ...ccToken
      //   })
      //   await newCreditCardToken.save()


      // }

      return paymentResponse.data

    }
    catch (error) {
      console.error(error.response.data);

      const errorDetails = error.response.data.details.map((detail) => detail.message).join(', ').trim()

      throw new Error(errorDetails)
    }
  }

  public generateBoletoCharge = async (description: string, amount: number, reference: string, dueDate: string, user: IUser, buyerName: string, buyerCPF: string, buyerEmail: string) => {


    const response = await this.request("POST", "/charges", {
      "charge": {
        "description": description,
        "amount": amount,
        "references": [reference],
        "dueDate": dueDate
      },
      "billing": {
        "name": buyerName,
        "document": buyerCPF,
        "email": buyerEmail,
        "notify": "false"
      }
    })

    const { _embedded } = response.data;
    const order = _embedded.charges[0];

    // if order was generated successfully, lets create a transaction in our db and notify the user about our charge
    if (order) {

      await this.recordTransactionOrder(user._id, this.providerName, order.id, order.code, order.reference, order.amount, order.installmentLink, order.dueDate, TransactionTypes.BOLETO)

      await this.notifyUserAboutPayment(user, "Boleto", order.amount, order.dueDate, order.installmentLink)
      return order;
    }

    return false;

  }

  public generateBoletoPaymentRequest = async (req, description, amount, reference, dueDate?: string) => {


    const { buyerName, buyerCPF } = req.body;

    const user: IUser = req.user;

    // lets update our user CPF records (so we can use for subsequent charges)

    user.cpf = buyerCPF;
    await user.save();

    if (!dueDate) {
      // set due date 7 days from now, if no due date was provided...
      dueDate = moment(new Date()).add(7, "days").format("YYYY-MM-DD")
    }


    const order = await this.generateBoletoCharge(description, amount, reference, dueDate, user, buyerName, buyerCPF, user.email)

    return order;

  }








}