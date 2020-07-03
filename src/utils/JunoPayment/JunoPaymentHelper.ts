import axios from 'axios';
import { base64encode } from 'nodejs-base64';

import { Transaction } from '../../resources/Transaction/transaction.model';
import { TransactionStatus, TransactionTypes } from '../../resources/Transaction/transaction.types';
import { ConsoleColor, ConsoleHelper } from '../ConsoleHelper';
import { junoAxiosRequest } from './junopayment.constants';
import { IJunoAccessTokenResponse } from './junopayment.types';

export class JunoPaymentHelper {

  public static accessToken: string;

  public static getAccessToken = async (): Promise<IJunoAccessTokenResponse> => {

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

    JunoPaymentHelper.accessToken = junoResponse.access_token;

    // set it as authorization token for every request...
    junoAxiosRequest.defaults.headers.common.Authorization = `Bearer ${JunoPaymentHelper.accessToken}`

    return response.data;
  }

  public static request = async (method, endpoint: string, data: Object | null) => {

    const response = await junoAxiosRequest.request({
      method,
      url: endpoint,
      data,
    })

    return response
  }

  private static _recordTransactionOrder = async (order, req, type: TransactionTypes) => {

    // if order was generated successfully, lets create a transaction in our db
    if (order.code) {

      try {
        const newTransaction = new Transaction({
          orderId: order.id,
          userId: req.user._id,
          code: order.code,
          type,
          reference: order.reference,
          status: TransactionStatus.CREATED,
          amount: order.amount,
          boletoLink: order.link,
          dueDate: order.dueDate,
        })
        await newTransaction.save();

        return order;
      }
      catch (error) {
        ConsoleHelper.coloredLog(ConsoleColor.BgRed, ConsoleColor.FgWhite, `💰: Juno - Failed while trying to generate your transaction!`)
        console.error(error);
        return false
      }

    }
  }

  public static generateCreditCardPaymentRequest = async (req) => {
    const { buyerCreditCardHash, buyerName, buyerCPF, buyerEmail, buyerAddress } = req.body

    // First we generate an PAYMENT CHARGE
    const chargeResponse = await JunoPaymentHelper.request("POST", "/charges", {
      "charge": {
        "description": "Emprego Urgente - Compra de créditos de envio de currículo",
        "amount": 19.90,
        "references": ["CREDITOS_ENVIO"],
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
    await JunoPaymentHelper._recordTransactionOrder(order, req, TransactionTypes.CREDIT_CARD)

    // Then we PAY the order
    try {
      const paymentResponse = await JunoPaymentHelper.request("POST", "/payments", {
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
      return paymentResponse.data

    }
    catch (error) {
      console.error(error.response.data);

      const errorDetails = error.response.data.details.map((detail) => detail.message).join(', ').trim()

      throw new Error(errorDetails)
    }
  }

  public static generateBoletoPaymentRequest = async (req, description, amount, reference) => {


    const { buyerName, buyerCPF, buyerEmail } = req.body;

    const user = req.user;

    // lets update our user CPF records (so we can use for subsequent charges)

    user.cpf = buyerCPF;
    await user.save();


    const response = await JunoPaymentHelper.request("POST", "/charges", {
      "charge": {
        "description": description,
        "amount": amount,
        "references": [reference]
      },
      "billing": {
        "name": buyerName,
        "document": buyerCPF,
        "email": buyerEmail,
        "notify": "true"
      }
    })

    const { _embedded } = response.data;
    const order = _embedded.charges[0];

    // if order was generated successfully, lets create a transaction in our db
    return JunoPaymentHelper._recordTransactionOrder(order, req, TransactionTypes.BOLETO);


  }






}