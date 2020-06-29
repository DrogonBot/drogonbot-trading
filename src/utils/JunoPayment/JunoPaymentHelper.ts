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

  public static generateBoletoPaymentRequest = async (req) => {


    const { buyerName, buyerCPF, buyerEmail } = req.body;


    const response = await JunoPaymentHelper.request("POST", "/charges", {
      "charge": {
        "description": "Emprego Urgente - Compra de créditos de envio de currículo",
        "amount": 19.90,
        "references": ["CREDITOS_ENVIO"]
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
    if (order.code) {

      try {
        const newTransaction = new Transaction({
          orderId: order.id,
          userId: req.user._id,
          code: order.code,
          type: TransactionTypes.BOLETO,
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






}