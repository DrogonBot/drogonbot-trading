import express from 'express';

import { JunoPayment } from '../../classes/payment/JunoPayment/JunoPayment';
import { userAuthMiddleware } from '../../middlewares/auth.middleware';
import { PaymentMiddleware } from '../../middlewares/payment.middleware';
import { UserMiddleware } from '../../middlewares/user.middleware';
import { UserType } from '../User/user.types';
import { PagSeguro } from './../../classes/payment/Pagseguro/Pagseguro';
import { SUBSCRIPTION_DESCRIPTION, SUBSCRIPTION_PRICE, SUBSCRIPTION_REFERENCE } from './subscription.constant';


// @ts-ignore
const subscriptionRouter = new express.Router();

// Create new subscription

subscriptionRouter.post('/subscription/:method', [userAuthMiddleware, UserMiddleware.restrictUserType(UserType.Admin), PaymentMiddleware.JunoAuthorize], async (req, res) => {

  const { method } = req.params;

  // although we're trying to get all of this information from our req.body, only some of them will be used on boleto payment (buyerName, buyerCPF and buyerEmail only)
  const { buyerCreditCardHash, buyerName, buyerEmail, buyerCPF, buyerStreet, buyerNumber, buyerComplement, buyerNeighborhood, buyerCity, buyerState, buyerPostalCode, buyerAddress } = req.body

  const user = req.user;
  const junoPayment = new JunoPayment();
  const pagseguro = new PagSeguro()


  switch (method) {
    case "creditcard":
      try {
        const ccReq = await junoPayment.generateCreditCardCharge(user, SUBSCRIPTION_REFERENCE, SUBSCRIPTION_DESCRIPTION, SUBSCRIPTION_PRICE, buyerCreditCardHash, buyerName, buyerCPF, buyerEmail, buyerAddress);

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
        const boletoResponse = await pagseguro.generateBoletoCharge(user._id, SUBSCRIPTION_REFERENCE, SUBSCRIPTION_DESCRIPTION, SUBSCRIPTION_PRICE * 100, buyerName, buyerCPF, buyerEmail, buyerState, buyerCity, buyerPostalCode, buyerStreet, buyerNumber, buyerNeighborhood)

        return res.status(200).send(boletoResponse.data)
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