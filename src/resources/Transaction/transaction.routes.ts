import express from 'express';
import moment from 'moment';

import { PaymentMiddleware } from '../../middlewares/payment.middleware';
import { ConsoleColor, ConsoleHelper } from '../../utils/ConsoleHelper';
import { IJunoPayment } from '../../utils/JunoPayment/junopayment.types';
import { JunoPaymentHelper } from '../../utils/JunoPayment/JunoPaymentHelper';
import { TS } from '../../utils/TS';
import { Subscription } from '../Subscription/subscription.model';
import { SubscriptionStatus } from '../Subscription/subscription.types';
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

            const add30DaysFromToday = moment().add(30, "days")

            const dueDay = add30DaysFromToday.daysInMonth()

            // generate subscription in our system
            const subscription = new Subscription({
              userId: fetchedTransaction.userId,
              paymentType: fetchedTransaction.type,
              dueDay,
              status: SubscriptionStatus.Active,
              startsOn: new Date(),
              nextBillingDate: add30DaysFromToday
            })
            await subscription.save();


            // set user as premium
            try {
              const user = await User.findOne({ _id: fetchedTransaction.userId });

              if (user) {
                user.isPremium = true;
                await user.save();
              }
            }
            catch (error) {
              console.error(error);

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