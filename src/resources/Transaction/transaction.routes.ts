import express from 'express';

import { PRICE_PER_CREDIT } from '../../constants/credits.constant';
import { userAuthMiddleware } from '../../middlewares/auth.middleware';
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


// ! This route is triggered by our payment provider (Pagseguro), whenever a transaction update occurs
transactionRouter.post("/transaction/notification/", async (req, res) => {

  console.log(req.body);

  const { resource, event } = req.body;

  const orderId = resource.order.id

  console.log(orderId);
  console.log(event);


  // our system's transactions
  const ourTransaction = await Transaction.findOne({
    reference: orderId
  })

  if (ourTransaction) {
    // sync our transaction status with the status being sent by pagseguro...
    ourTransaction.status = event
    await ourTransaction.save();

    switch (event) {
      case TransactionStatus.PAID:

        // fetch corresponding user and update credits
        const user = await User.findOne({ _id: ourTransaction.userId })

        if (user) {
          console.log(`Updating credits for user ${user.email}`);
          user.credits += Math.ceil(ourTransaction.amount / PRICE_PER_CREDIT);

          await user.save();
        }

        break;
    }


  }



  return res.status(200).send({
    status: 'ok'
  })
});


transactionRouter.post('/transaction/checkout/:method', userAuthMiddleware, async (req, res) => {

  const { method } = req.params;

  const { user } = req;

  const { buyerEmail, buyerName, buyerPhoneAreaCode, buyerPhoneNumber, buyerStreetAddress, buyerStreetNumber, buyerStreetComplement, buyerDistrict,
    buyerPostalCode, buyerCity, buyerState, buyerBirthDate, buyerCPF } = req.body;

  const transactionAmount = 1999 // !Price defined here!

  let orderId: string | null = null;
  try {
    orderId = await PaymentHelper.generateOrder(transactionAmount, user._id, buyerName, buyerEmail, buyerBirthDate, buyerCPF, buyerPhoneAreaCode, buyerPhoneAreaCode, buyerStreetAddress, buyerStreetNumber, buyerStreetComplement, buyerDistrict, buyerCity, buyerState, buyerPostalCode)
  }
  catch (error) {
    console.log('failed while trying to create your order');
    console.error(error);
  }

  try {
    const { paymentId, printUrl } = await PaymentHelper.generatePayment(orderId)

    if (paymentId) {
      // create new transaction record

      const newTransaction = new Transaction({
        userId: user._id,
        reference: orderId,
        status: TransactionStatus.CREATED,
        amount: transactionAmount
      })
      await newTransaction.save();

      return res.status(200).send({
        printUrl
      })
    }
    return res.status(200).send({
      status: "error",
      message: TS.string('transaction', 'transactionError')
    })


  }
  catch (error) {
    console.log('failed to generate your payment id');
    console.error(error);

  }







})



export { transactionRouter };