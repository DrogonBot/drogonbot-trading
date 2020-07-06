import moment from 'moment';
import convert from 'xml-js';

import { User } from '../../../resources/User/user.model';
import { Payment } from '../Payment';
import { TransactionTypes } from './../../../resources/Transaction/transaction.types';
import { pagseguroAxios } from './pagseguro.constant';


export class PagSeguro extends Payment {
  public providerName: string;
  public email: string;
  public token: string;
  public mode: string;

  constructor() {
    super()
    this.providerName = "Pagseguro"
    this.email = process.env.PAGSEGURO_EMAIL!;
    this.token = process.env.PAGSEGURO_TOKEN!;
    this.mode = process.env.PAGSEGURO_ENVIRONMENT!;
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


  public generateBoletoCharge = async (userId: string, reference: string, description: string, amount: number, buyerName: string, buyerCPF: string, buyerEmail: string, buyerStateCode: string, buyerCity: string, buyerPostalCode: string, buyerStreet: string, buyerStreetNumber: string, buyerStreetNeighborhood: string) => {

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
            "holder": {
              "name": buyerName,
              "tax_id": buyerCPF,
              "email": buyerEmail,
              "address": {
                "country": "Brasil",
                "region": buyerCity,
                "region_code": buyerStateCode,
                "city": buyerCity,
                "postal_code": buyerPostalCode,
                "street": buyerStreet,
                "number": buyerStreetNumber,
                "locality": buyerStreetNeighborhood
              }
            }
          }
        }
      })


      const charge = response.data;

      // if it returns our charge status as WAITING, it means it was SUCCESSFUL!
      if (charge.status === "WAITING") {

        // lets update user address info, for future charges.

        try {

          const user = await User.findOne({ _id: userId })

          if (user) {
            user.postalCode = buyerPostalCode;
            user.street = buyerStreet;
            user.streetNumber = buyerStreetNumber;
            user.streetNeighborhood = buyerStreetNeighborhood;
            await user.save();
          } else {
            console.log('Failed to update user info. User not found!');
          }

        }
        catch (error) {
          console.error(error);
        }


        // and then record our transaction for internal system control

        try {
          await this.recordTransactionOrder(userId, this.providerName, charge.id, charge.payment_method.boleto.id, charge.reference_id, charge.amount.value / 100, charge.links[0].href, add7fromToday, TransactionTypes.BOLETO)
        }
        catch (error) {
          console.error(error);

        }

      }
      return response;
    }
    catch (error) {

      console.log(error.response.data);


    }





  }





}