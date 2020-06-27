import express from 'express';

import { JunoPaymentHelper } from '../../JunoPayment/JunoPaymentHelper';
import { userAuthMiddleware } from '../../middlewares/auth.middleware';
import { PaymentMiddleware } from '../../middlewares/payment.middleware';
import { ConsoleColor, ConsoleHelper } from '../../utils/ConsoleHelper';
import { TS } from '../../utils/TS';
import { Transaction } from './transaction.model';
import { PaymentAvailableMethods, TransactionStatus } from './transaction.types';

/*#############################################################|
|  >>> PROTECTED ROUTES
*##############################################################*/

// @ts-ignore
const transactionRouter = new express.Router();

// ! Juno Payment Webhook route
transactionRouter.post("/transaction/notification/", PaymentMiddleware.JunoAuthorize, async (req, res) => {

  const { paymentToken, chargeReference, chargeCode } = req.body;

  ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `💰: Juno Webhook Post received`)

  console.log('Checking order status...');

  const fetchTransaction = await Transaction.findOne({
    code: chargeCode,
    status: TransactionStatus.CREATED
  })

  if (fetchTransaction) {
    try {
      const response = await JunoPaymentHelper.request("GET", `/charges/${fetchTransaction.orderId}`, null)


      const { payments } = response.data;




      // chceck if order was paid

      // update transaction status to PAID

      // increase user credits

      return res.status(200).send(response.data)

    }
    catch (error) {
      console.error(error);


    }
  }


  return res.status(200).send({
    status: 'ok'
  })
});




transactionRouter.post('/transaction/checkout/:paymentMethod', [userAuthMiddleware, PaymentMiddleware.JunoAuthorize], async (req, res) => {

  const { paymentMethod } = req.params;

  try {


    switch (paymentMethod) {

      case PaymentAvailableMethods.Boleto:
        const result = await JunoPaymentHelper.generateBoletoPaymentRequest(req);

        if (result) {
          return res.status(200).send(result)
        }


        break;


    }


    return res.status(200).send({
      status: "error",
      message: TS.string('transaction', 'transactionError'),
      details: 'Payment method not found'
    })

  }
  catch (error) {
    console.error(error);
    return res.status(200).send({
      status: "error",
      message: TS.string('transaction', 'transactionError')
    })
  }
})



export { transactionRouter };