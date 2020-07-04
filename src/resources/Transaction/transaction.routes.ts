import express from 'express';

import { PaymentMiddleware } from '../../middlewares/payment.middleware';
import { ConsoleColor, ConsoleHelper } from '../../utils/ConsoleHelper';
import { IJunoPayment } from '../../utils/JunoPayment/junopayment.types';
import { JunoPaymentHelper } from '../../utils/JunoPayment/JunoPaymentHelper';
import { TS } from '../../utils/TS';
import { User } from '../User/user.model';
import { Transaction } from './transaction.model';
import { TransactionReferences, TransactionStatus } from './transaction.types';

/*#############################################################|
|  >>> PROTECTED ROUTES
*##############################################################*/

// @ts-ignore
const transactionRouter = new express.Router();

// ! Juno Payment Webhook route
transactionRouter.post("/transaction/notification/", PaymentMiddleware.JunoAuthorize, async (req, res) => {

  const { chargeCode } = req.body;


  ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `💰: Juno Webhook Post received`)

  console.log('Checking order status...');


  const fetchedTransaction = await Transaction.findOne({
    code: chargeCode,
    status: TransactionStatus.CREATED
  })

  // if there's a transaction in our system, let's get more info about it
  if (fetchedTransaction) {
    try {
      const response = await JunoPaymentHelper.request("GET", `/charges/${fetchedTransaction.orderId}`, null)

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
              await JunoPaymentHelper.updateSubscriptionData(user, fetchedTransaction);
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
  } else {
    console.log('No transaction found...');
  }


  return res.status(200).send({
    status: 'ok'
  })
});





export { transactionRouter };