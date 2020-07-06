import express from 'express';

import { JunoPayment } from '../../classes/payment/JunoPayment/JunoPayment';
import { IJunoPayment } from '../../classes/payment/JunoPayment/junopayment.types';
import { PaymentMiddleware } from '../../middlewares/payment.middleware';
import { ConsoleColor, ConsoleHelper } from '../../utils/ConsoleHelper';
import { TS } from '../../utils/TS';
import { User } from '../User/user.model';
import { PagSeguro } from './../../classes/payment/Pagseguro/Pagseguro';
import { Transaction } from './transaction.model';
import { TransactionReferences, TransactionStatus } from './transaction.types';

/*#############################################################|
|  >>> PROTECTED ROUTES
*##############################################################*/

// @ts-ignore
const transactionRouter = new express.Router();

// !  Payment Webhooks route
transactionRouter.post("/transaction/notification/", PaymentMiddleware.JunoAuthorize, async (req, res) => {

  const { chargeCode, notificationCode } = req.body;

  console.log(req.body);


  if (notificationCode) {
    // ! Pagseguro Webhook

    const pagseguro = new PagSeguro();

    ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `💰: Pagseguro Webhook Post received`)

    console.log('Fetching transaction details...');



  }



  // ! JUNO WEBHOOK
  if (chargeCode) {

    const junoPayment = new JunoPayment()

    ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `💰: Juno Webhook Post received`)

    console.log('Checking order status...');


    const fetchedTransaction = await Transaction.findOne({
      code: chargeCode,
      status: TransactionStatus.CREATED
    })

    // if there's a transaction in our system, let's get more info about it
    if (fetchedTransaction) {
      try {
        const response = await junoPayment.request("GET", `/charges/${fetchedTransaction.orderId}`, null)

        const payments: IJunoPayment[] = response.data.payments;

        if (!payments) {
          console.log('No payments for this order...');
          return res.status(200).send({
            status: "pending",
            message: TS.string('transaction', 'transactionNoPayments')
          })
        }

        // check if order was paid
        let totalPaid = 0;

        for (const payment of payments) {
          if (payment.status === "CONFIRMED") {
            totalPaid += payment.amount;
          }
        }

        // if the total transaction amount was paid
        if (totalPaid === fetchedTransaction.amount) {
          // update transaction status to PAID
          fetchedTransaction.status = TransactionStatus.PAID;
          await fetchedTransaction.save();
          ConsoleHelper.coloredLog(ConsoleColor.BgGreen, ConsoleColor.FgWhite, `💰: Juno - Transaction code ${fetchedTransaction.code} PAID!`)


          // ! check which type of transaction that was paid.
          // Here we have the most important part of this script. What should we do when a specific transaction is paid?

          switch (fetchedTransaction.reference) {

            case TransactionReferences.Subscription:

              const user = await User.findOne({ _id: fetchedTransaction.userId })

              if (user) {
                await junoPayment.updateSubscriptionData(user, fetchedTransaction);
              } else {
                console.log("Error: User not found...");
              }


              break;


          }



        }

        return res.status(200).send(response.data)

      }
      catch (error) {
        console.error(error);


      }

    }



  } else {
    console.log('No transaction found...');
  }


  return res.status(200).send({
    status: 'ok'
  })
});





export { transactionRouter };