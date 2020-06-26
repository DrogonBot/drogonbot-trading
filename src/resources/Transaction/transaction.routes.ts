import express from 'express';

import { JunoPaymentHelper } from '../../JunoPayment/JunoPaymentHelper';
import { userAuthMiddleware } from '../../middlewares/auth.middleware';
import { ConsoleColor, ConsoleHelper } from '../../utils/ConsoleHelper';

/*#############################################################|
|  >>> PROTECTED ROUTES
*##############################################################*/

// @ts-ignore
const transactionRouter = new express.Router();


// ! This route is triggered by our payment provider (WireCard), whenever a transaction update occurs
transactionRouter.post("/transaction/notification/", async (req, res) => {

  ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `💰:  Webhook Post received`)

  console.log(JSON.stringify(req.body));

  return res.status(200).send({
    status: 'ok'
  })
});



transactionRouter.post('/transaction/checkout/', userAuthMiddleware, async (req, res) => {


  await JunoPaymentHelper.initialize();

  try {
    const response = await JunoPaymentHelper.request("POST", "/charges", {
      charge: {
        description: "Cobranca teste",
        amount: 19.90,
      },
      billing: {
        name: "Comprador teste",
        document: "14001372762"
      }
    })

    console.log(JSON.stringify(response.data));

    return res.status(200).send(response.data)

  }
  catch (error) {
    console.error(error);

  }




  return res.status(200).send({
    status: 'ok'
  })
})



export { transactionRouter };