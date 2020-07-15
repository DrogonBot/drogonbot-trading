import Promise from 'bluebird';
import { Router } from 'express';


// Fix Telegram bot promise issue: https://github.com/benjick/meteor-telegram-bot/issues/37#issuecomment-389669310
Promise.config({
  cancellation: true
});

// @ts-ignore
const operationRouter = new Router();


/*#############################################################|
|  >>> TEST AND OPERATIONS ROUTES!
*##############################################################*/

operationRouter.get("/test", async (req, res) => {

  return res.status(200).send({
    status: "success"
  })

})




export { operationRouter }