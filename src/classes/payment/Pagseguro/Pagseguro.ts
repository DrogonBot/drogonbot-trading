import moment from 'moment';
import convert from 'xml-js';

import { IUser } from '../../../resources/User/user.model';
import { Payment } from '../Payment';
import { TransactionTypes } from './../../../resources/Transaction/transaction.types';
import { pagseguroAxios } from './pagseguro.constant';


export class PagSeguro extends Payment {
  public providerName: string;
  public email: string;
  public token: string;
  public mode: string;

  constructor(email: string, token: string, mode: string) {
    super()
    this.providerName = "Pagseguro"
    this.email = email;
    this.token = token;
    this.mode = mode;
  }

  public request = async (method, endpoint: string, data: Object | null, isXML: boolean = false) => {

    const response = await pagseguroAxios.request({
      method,
      url: endpoint,
      data,
    })

    if (isXML) {

      const obj: any = convert.xml2js(response.data, { ignoreComment: true, alwaysChildren: true, compact: true });

      return obj;

    }

    return response

  }

  public generateBoleto = async (user: IUser, reference: string, description: string, amount: number, buyerData) => {

    const add7fromToday = moment(new Date()).add(7, "days").format("YYYY-MM-DD")

    try {
      const response = await this.request("POST", `/charges`, {
        "reference_id": reference,
        "description": description,
        "amount": {
          "value": amount,
          "currency": "BRL"
        },
        "payment_method": {
          "type": "BOLETO",
          "boleto": {
            "due_date": add7fromToday,
            "instruction_lines": {
              "line_1": "Favor não cobrar juros apos vencimento.",
              "line_2": "Processamento via PagSeguro"
            },
            "holder": buyerData
          }
        }
      })


      const charge = response.data;

      // if it returns our charge status as WAITING, it means it was successful
      if (charge.status === "WAITING") {

        await this.recordTransactionOrder(user._id, this.providerName, charge.id, charge.payment_method.boleto.id, charge.reference_id, charge.amount.value / 100, charge.links[0].href, add7fromToday, TransactionTypes.BOLETO)

      }
      return response;
    }
    catch (error) {

      console.log(error.response.data);


    }





  }





}