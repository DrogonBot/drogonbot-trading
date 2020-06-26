import moipSdk from 'moip-sdk-node';
import moment from 'moment';

import { PaymentAvailableMethods } from '../resources/Transaction/transaction.types';
import { ConsoleColor, ConsoleHelper } from './ConsoleHelper';


export class PaymentHelper {

  private static _moip = moipSdk({
    token: process.env.MOIP_TOKEN,
    key: process.env.MOIP_KEY,
    production: process.env.MOIP_MODE === "sandbox" ? false : true
  })
  private static _storeLogo = "https://empregourgente.com/images/logos/logo-ptBr.svg"

  public static initWebHook = async () => {

    // ! Be careful to not run this method twice, creating multiple hook entries on Wirecard

    // const notifications = await PaymentHelper._moip.notification.getAll()

    const notifications = await PaymentHelper._moip.notification.getAll();

    console.log(notifications.body);


    // const response = await PaymentHelper._moip.notification.create({
    //   events: [
    //     'ORDER.*',
    //     'PAYMENT.AUTHORIZED',
    //     'PAYMENT.CANCELLED',
    //     'PAYMENT.REFUNDED', 'PAYMENT.REVERSED'
    //   ],
    //   target: 'https://api.empregourgente.com/transaction/notification/',
    //   media: 'WEBHOOK'
    // })

    // console.log(response.body);
  }


  public static generateOrder = async (amount: number, buyerId: string, buyerName: string, buyerEmail: string, buyerBirthDate: string, buyerCPF: string, buyerPhoneAreaCode: string, buyerPhoneNumber: string, buyerStreetAddress: string, buyerStreetNumber: string, buyerStreetComplement: string, buyerDistrict: string, buyerCity: string, buyerState: string, buyerPostalCode: string): Promise<string> => {



    const response = await PaymentHelper._moip.order.create({
      ownId: buyerId,
      amount: {
        currency: 'BRL',
        subtotals: {
          shipping: 0
        }
      },
      items: [{
        product: 'Compra de créditos no EmpregoUrgente.com',
        quantity: 1,
        detail: 'Compra de créditos para envio de currículos',
        price: amount
      }],
      customer: {
        ownId: buyerId,
        fullname: buyerName,
        email: buyerEmail,
        birthDate: buyerBirthDate,
        taxDocument: {
          type: 'CPF',
          number: buyerCPF
        },
        phone: {
          countryCode: '55',
          areaCode: buyerPhoneAreaCode,
          number: buyerPhoneNumber
        },
        shippingAddress: {
          street: buyerStreetAddress,
          streetNumber: buyerStreetNumber,
          complement: buyerStreetComplement,
          district: buyerDistrict,
          city: buyerCity,
          state: buyerState,
          country: 'BRA',
          zipCode: buyerPostalCode
        }
      }
    })

    ConsoleHelper.coloredLog(ConsoleColor.BgYellow, ConsoleColor.FgWhite, `💰: Wirecard - Creating payment order`)

    return response.body.id;


  }

  public static generatePayment = async (orderId: string | null, paymentMethod: PaymentAvailableMethods) => {

    ConsoleHelper.coloredLog(ConsoleColor.BgYellow, ConsoleColor.FgWhite, `💰: Wirecard - Generating payment through ${paymentMethod}`)


    const add30Days = moment().add(30, 'days').format('YYYY-MM-DD')

    switch (paymentMethod) {
      case PaymentAvailableMethods.Boleto:
        const response = await PaymentHelper._moip.payment.create(orderId, {
          installmentCount: 1,
          fundingInstrument: {
            method: "BOLETO",
            boleto: {
              expirationDate: add30Days,
              instructionLines: {
                first: "Pagável preferencialmente em qualquer banco até a data de vencimento",
                // second: "Segunda linha do boleto",
                // third: "Terceira linha do boleto"
              },
              logoUri: PaymentHelper._storeLogo
            }
          }
        });

        console.log(response.body);

        ConsoleHelper.coloredLog(ConsoleColor.BgYellow, ConsoleColor.FgWhite, `💰: Wirecard - Created ${paymentMethod} payment!`)

        return { paymentId: response.body.id, url: response.body._links.payBoleto.printHref };
    }


    return { paymentId: "INVALID", url: "INVALID" };




  }



}