import express from 'express';

import { JunoPaymentHelper } from '../../classes/payment/JunoPayment/JunoPaymentHelper';
import { userAuthMiddleware } from '../../middlewares/auth.middleware';
import { PaymentMiddleware } from '../../middlewares/payment.middleware';
import { UserMiddleware } from '../../middlewares/user.middleware';
import { UserType } from '../User/user.types';
import { TransactionReferences } from './../Transaction/transaction.types';
import { SUBSCRIPTION_DESCRIPTION, SUBSCRIPTION_PRICE } from './subscription.constant';


// @ts-ignore
const subscriptionRouter = new express.Router();

// Create new subscription

subscriptionRouter.post('/subscription/:method', [userAuthMiddleware, UserMiddleware.restrictUserType(UserType.Admin), PaymentMiddleware.JunoAuthorize], async (req, res) => {

  const { method } = req.params;

  // although we're trying to get all of this information from our req.body, only some of them will be used on boleto payment (buyerName, buyerCPF and buyerEmail only)
  const { buyerCreditCardHash, buyerName, buyerEmail, buyerCPF, buyerStreet, buyerNumber, buyerComplement, buyerNeighborhood, buyerCity, buyerState, buyerPostCode, buyerAddress } = req.body

  const user = req.user;

  switch (method) {
    case "creditcard":
      try {
        const ccReq = await JunoPaymentHelper.generateCreditCardCharge("SUBSCRIPTION", SUBSCRIPTION_DESCRIPTION, SUBSCRIPTION_PRICE, buyerCreditCardHash, user._id, buyerName, buyerCPF, buyerEmail, buyerAddress);

        return res.status(200).send(ccReq)
      }
      catch (error) {
        console.log(error);

        return res.status(200).send({
          status: "error",
          message: error.message
        })
      }





    case "boleto":

      try {

        const boletoReq = await JunoPaymentHelper.generateBoletoPaymentRequest(req, SUBSCRIPTION_DESCRIPTION, SUBSCRIPTION_PRICE, TransactionReferences.Subscription);

        return res.status(200).send(boletoReq)
      }
      catch (error) {
        console.error(error);
        return res.status(200).send({
          status: "error",
          message: error.message
        })
      }
  }
})




export { subscriptionRouter };