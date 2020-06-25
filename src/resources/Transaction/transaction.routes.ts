import axios from 'axios';
import express from 'express';
import pagseguro from 'pagseguro';
import randomstring from 'randomstring';
import xml2Js from 'xml2js';

import { userAuthMiddleware } from '../../middlewares/auth.middleware';
import { TS } from '../../utils/TS';
import { User } from '../User/user.model';
import { PRICE_PER_CREDIT } from './../../constants/credits.constant';
import { Transaction } from './transaction.model';
import { TransactionStatus } from './transaction.types';

/*#############################################################|
|  >>> PROTECTED ROUTES
*##############################################################*/

// @ts-ignore
const transactionRouter = new express.Router();


// ! This route is triggered by our payment provider (Pagseguro), whenever a transaction update occurs
transactionRouter.post("/transaction/notification/", async (req, res) => {


  const { notificationCode, notificationType } = req.body;

  console.log(notificationCode);
  console.log(notificationType);

  // Now, lets do a request to fetch this transaction info

  const response = await axios({
    method: "GET",
    url: `${process.env.PAGSEGURO_API_URL}/v2/transactions/notifications/${notificationCode}?email=${process.env.PAGSEGURO_SELLER_EMAIL}&token=${process.env.PAGSEGURO_SELLER_TOKEN}`
  })

  // pagseguro transaction payload
  const { transaction: pagseguroTransaction } = await xml2Js.parseStringPromise(response.data)

  console.log(pagseguroTransaction);

  // Update transaction status!
  const pagseguroTransactionStatus = pagseguroTransaction.status[0]

  // our system's transactions.
  const ourTransaction = await Transaction.findOne({
    reference: pagseguroTransaction.reference[0]
  })

  if (ourTransaction) {
    // sync our transaction status with the status being sent by pagseguro...
    ourTransaction.status = pagseguroTransactionStatus
    await ourTransaction.save();

    switch (pagseguroTransactionStatus) {
      case TransactionStatus.PAID:

        // fetch corresponding user and update credits
        const user = await User.findOne({ _id: ourTransaction.userId })

        if (user) {
          user.credits += Math.floor(ourTransaction.amount * PRICE_PER_CREDIT);

          await user.save();
        }

        break;
    }


  }



  return res.status(200).send({
    status: 'ok'
  })
});


transactionRouter.post('/transaction/checkout', userAuthMiddleware, async (req, res) => {

  const { user } = req;

  const { buyerEmail, buyerName, buyerPhoneAreaCode, buyerPhoneNumber, buyerStreetAddress, buyerStreetNumber, buyerStreetComplement, buyerDistrict,
    buyerPostalCode, buyerCity, buyerState } = req.body;

  const pag = new pagseguro({
    email: process.env.PAGSEGURO_SELLER_EMAIL,
    token: process.env.PAGSEGURO_SELLER_TOKEN,
    mode: process.env.PAGSEGURO_MODE
  })

  pag.currency("BRL");

  const randomHash = randomstring.generate({
    length: 6,
    charset: 'alphabetic'
  });

  const transactionReference = `${buyerEmail}_${randomHash}`; // this transaction reference will be used to update our notification status, on /transaction/notification
  const transactionAmount = "19.99" // !Price defined here!

  pag.reference(transactionReference)

  pag.addItem({
    id: 1,
    description: 'Pacote de créditos',
    amount: transactionAmount,
    quantity: 1
  });


  // Configurando as informações do comprador
  pag.buyer({
    name: buyerName,
    email: buyerEmail,
    phoneAreaCode: buyerPhoneAreaCode,
    phoneNumber: buyerPhoneNumber // ! Should contain ONLY numbers
  });

  // Configurando a entrega do pedido

  pag.shipping({
    type: 1,
    street: buyerStreetAddress,
    number: buyerStreetNumber,
    complement: buyerStreetComplement,
    district: buyerDistrict,
    postalCode: buyerPostalCode,
    city: buyerCity,
    state: buyerState,
    country: 'BRA'
  });

  // Enviando o xml ao pagseguro
  pag.send(async (err, pagResponse) => {
    if (err) {

      console.log(err);

      return res.status(200).send({
        status: "error",
        message: TS.string('transaction', 'transactionError')
      })

    }

    try {
      const parsedXml = await xml2Js.parseStringPromise(pagResponse)

      console.log(JSON.stringify(parsedXml));

      const checkoutCode = parsedXml.checkout.code;


      if (checkoutCode) {
        // create new transaction record

        const newTransaction = new Transaction({
          userId: user._id,
          reference: transactionReference,
          status: TransactionStatus.PENDING,
          amount: transactionAmount
        })
        await newTransaction.save();

        const paymentUrl = `${process.env.PAGSEGURO_REDIRECT_CHECKOUT_URL}?code=${checkoutCode}`

        return res.status(200).send({
          checkoutCode,
          paymentUrl
        })
      }
      return res.status(200).send({
        status: "error",
        message: TS.string('transaction', 'transactionError')
      })

    }
    catch (error) {
      console.error(error);
      return res.status(200).send({
        status: "error",
        message: TS.string('transaction', 'transactionError')
      })
    }


  });

})



export { transactionRouter };