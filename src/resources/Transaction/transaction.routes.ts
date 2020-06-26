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
  console.log(req.body);

  const { resource, event } = req.body;

  const orderId = resource.order.id

  console.log(`OrderId: ${orderId} / event: ${event}`);

  // Check if transaction already exists

  const transaction = await Transaction.exists({
    reference: orderId
  })

  // if it doesnt, create a new one
  if (!transaction) {
    const newTransaction = new Transaction({
      userId: resource.order.ownId,
      reference: orderId,
      status: event,
      amount: resource.order.amount.total
    })
    await newTransaction.save();
  }

  // if it exists, update its status!

  // our system's transactions
  const existentTransaction = await Transaction.findOne({
    reference: orderId
  })


  if (existentTransaction) {
    // sync our transaction status with the status being sent by WireCard...
    existentTransaction.status = event
    await existentTransaction.save();

    switch (event) {
      case TransactionStatus.PAID:

        ConsoleHelper.coloredLog(ConsoleColor.BgGreen, ConsoleColor.FgWhite, `💰: Wirecard - Received payment for order ${orderId}`)


        // fetch corresponding user and update credits
        const user = await User.findOne({ _id: existentTransaction.userId })

        if (user) {
          console.log(`Updating credits for user ${user.email}`);
          user.credits += Math.ceil(existentTransaction.amount / PRICE_PER_CREDIT);

          await user.save();
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