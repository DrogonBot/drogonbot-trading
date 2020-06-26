import express from 'express';

import { PRICE_PER_CREDIT } from '../../constants/credits.constant';
import { userAuthMiddleware } from '../../middlewares/auth.middleware';
import { ConsoleColor, ConsoleHelper } from '../../utils/ConsoleHelper';
import { PaymentHelper } from '../../utils/PaymentHelper';
import { TS } from '../../utils/TS';
import { User } from '../User/user.model';
import { Transaction } from './transaction.model';
import { TransactionStatus } from './transaction.types';

/*#############################################################|
|  >>> PROTECTED ROUTES
*##############################################################*/

// @ts-ignore
const transactionRouter = new express.Router();


// ! This route is triggered by our payment provider (WireCard), whenever a transaction update occurs
transactionRouter.post("/transaction/notification/", async (req, res) => {

  ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `💰: Wirecard - Webhook Post received`)

  const { resource, event } = req.body;

  if (resource.order) { // If its notifying us about an ORDER

    const orderId = resource.order.id

    console.log(`OrderId: ${orderId} / event: ${event}`);


    switch (event) {
      case TransactionStatus.CREATED:
        const newTransaction = new Transaction({
          userId: resource.order.ownId,
          reference: orderId,
          status: event,
          amount: resource.order.amount.total
        })
        await newTransaction.save();


        break;

      case TransactionStatus.WAITING:
        // if it exists, update its status!

        // our system's transactions
        const waitingTransaction = await Transaction.findOne({
          reference: orderId
        })
        if (waitingTransaction) {
          waitingTransaction.status = event;
          await waitingTransaction.save();
        }

        break;


      case TransactionStatus.PAID:

        ConsoleHelper.coloredLog(ConsoleColor.BgGreen, ConsoleColor.FgWhite, `💰: Wirecard - Received payment for order ${orderId}`)

        // our system's transactions
        const paidTransaction = await Transaction.findOne({
          reference: orderId
        })
        if (paidTransaction) {
          paidTransaction.status = event;
          await paidTransaction.save();

          // fetch corresponding user and update credits
          const user = await User.findOne({ _id: paidTransaction.userId })

          if (user) {
            console.log(`Updating credits for user ${user.email}`);
            user.credits += Math.ceil((paidTransaction.amount / 100) / PRICE_PER_CREDIT);
            await user.save();
          }
        }
        break;
    }
  }
  return res.status(200).send({
    status: 'ok'
  })
});

transactionRouter.get('/transaction/webhook', async (req, res) => {

  await PaymentHelper.initWebHook();



  return res.status(200).send({
    status: 'ok'
  })
})

transactionRouter.post('/transaction/checkout/:method', userAuthMiddleware, async (req, res) => {

  const { method } = req.params;

  const { user } = req;

  const { buyerEmail, buyerName, buyerPhoneAreaCode, buyerPhoneNumber, buyerStreetAddress, buyerStreetNumber, buyerStreetComplement, buyerDistrict,
    buyerPostalCode, buyerCity, buyerState, buyerBirthDate, buyerCPF } = req.body;

  const transactionAmount = 1999 // !Price defined here!

  let orderId: string | null = null;
  try {
    orderId = await PaymentHelper.generateOrder(transactionAmount, user._id, buyerName, buyerEmail, buyerBirthDate, buyerCPF, buyerPhoneAreaCode, buyerPhoneNumber, buyerStreetAddress, buyerStreetNumber, buyerStreetComplement, buyerDistrict, buyerCity, buyerState, buyerPostalCode)
  }
  catch (error) {
    console.log('failed while trying to create your order');
    console.error(error);
  }

  try {
    const { paymentId, url } = await PaymentHelper.generatePayment(orderId, method)

    if (paymentId) {
      return res.status(200).send({
        url
      })
    } else {
      return res.status(200).send({
        status: "error",
        message: TS.string('transaction', 'transactionError')
      })
    }


  }
  catch (error) {
    console.log('failed to generate your payment id');
    console.error(error);

  }







})



export { transactionRouter };