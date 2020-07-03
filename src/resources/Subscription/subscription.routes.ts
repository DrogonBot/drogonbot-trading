import express from 'express';
import moment from 'moment';

import { userAuthMiddleware } from '../../middlewares/auth.middleware';
import { PaymentMiddleware } from '../../middlewares/payment.middleware';
import { UserMiddleware } from '../../middlewares/user.middleware';
import { UserType } from '../User/user.types';
import { JunoPaymentHelper } from './../../utils/JunoPayment/JunoPaymentHelper';
import { TransactionReferences } from './../Transaction/transaction.types';
import { SUBSCRIPTION_PLAN_ID, SUBSCRIPTION_PRICE } from './subscription.constant';


// @ts-ignore
const subscriptionRouter = new express.Router();

// Create new plan
subscriptionRouter.post('/subscription/plan', [userAuthMiddleware, UserMiddleware.restrictUserType(UserType.Admin), PaymentMiddleware.JunoAuthorize], async (req, res) => {

  const { name, amount } = req.body

  try {
    const response = await JunoPaymentHelper.request("POST", "/plans", {
      name, amount
    })

    return res.status(200).send(response.data)
  }
  catch (error) {
    console.error(error);
  }

})

// Get ALL Plans
subscriptionRouter.get('/subscription/plan', [userAuthMiddleware, UserMiddleware.restrictUserType(UserType.Admin), PaymentMiddleware.JunoAuthorize], async (req, res) => {

  try {
    const response = await JunoPaymentHelper.request("GET", "/plans", null)

    return res.status(200).send(response.data)
  }
  catch (error) {
    console.error(error);
  }

})

// Get specific plan
subscriptionRouter.get('/subscription/plan/:id', [userAuthMiddleware, UserMiddleware.restrictUserType(UserType.Admin), PaymentMiddleware.JunoAuthorize], async (req, res) => {

  const { id } = req.params;

  try {
    const response = await JunoPaymentHelper.request("GET", `/plans/${id}`, null)

    return res.status(200).send(response.data)
  }
  catch (error) {
    console.error(error);
    return res.status(200).send({
      status: "error",
      message: error.message
    })
  }

})
// Get all subscriptions
subscriptionRouter.get('/subscription', [userAuthMiddleware, UserMiddleware.restrictUserType(UserType.Admin), PaymentMiddleware.JunoAuthorize], async (req, res) => {


  try {
    const response = await JunoPaymentHelper.request("GET", '/subscriptions', null)

    return res.status(200).send(response.data)
  }
  catch (error) {
    console.error(error.response.data);
    return res.status(200).send({
      status: "error",
      message: error.message
    })
  }

})



// Create new subscription using CREDIT CARD
// ! Obs.: CREDIT CARD BASED SUBSCRIPTIONS ARE MANAGED THROUGH JUNO, AND BOLETO ONES ARE THROUGH OUR SYSTEM

subscriptionRouter.post('/subscription/:method', [userAuthMiddleware, UserMiddleware.restrictUserType(UserType.Admin), PaymentMiddleware.JunoAuthorize], async (req, res) => {

  const { method } = req.params;

  // although we're trying to get all of this information from our req.body, only some of them will be used on boleto payment (buyerName, buyerCPF and buyerEmail only)
  const { buyerCreditCardHash, buyerName, buyerEmail, buyerCPF, buyerStreet, buyerNumber, buyerComplement, buyerNeighborhood, buyerCity, buyerState, buyerPostCode } = req.body

  switch (method) {
    case "creditcard":


      console.log('creating new subscription...');

      console.log(req.body);

      const add30DaysFromToday = moment().add(30, "days").daysInMonth()

      try {
        const response = await JunoPaymentHelper.request("POST", '/subscriptions', {
          "dueDay": add30DaysFromToday,
          "planId": SUBSCRIPTION_PLAN_ID,
          "chargeDescription": "Inscrição no plano assinatura Emprego-Urgente",
          "creditCardDetails": {
            "creditCardHash": buyerCreditCardHash
          },
          "billing": {
            "name": buyerName,
            "email": buyerEmail,
            "document": buyerCPF,
            "address": {
              "street": buyerStreet,
              "number": buyerNumber,
              "complement": buyerComplement,
              "neighborhood": buyerNeighborhood,
              "city": buyerCity,
              "state": buyerState,
              "postCode": buyerPostCode
            }
          }
        })

        return res.status(200).send(response.data)
      }
      catch (error) {
        console.error(error.response.data);
        return res.status(200).send({
          status: "error",
          message: error.message
        })
      }

    case "boleto":

      try {

        const boletoReq = await JunoPaymentHelper.generateBoletoPaymentRequest(req, "Emprego-Urgente - Assinatura", SUBSCRIPTION_PRICE, TransactionReferences.Subscription);

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