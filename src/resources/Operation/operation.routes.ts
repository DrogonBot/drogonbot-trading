import Promise from 'bluebird';
import { Router } from 'express';

import { TradingBot } from '../../bots/TradingBot/TradingBot';
import { PriceInterval, TimeSeriesUpdateType } from '../Asset/asset.types';


// Fix Telegram bot promise issue: https://github.com/benjick/meteor-telegram-bot/issues/37#issuecomment-389669310
Promise.config({
  cancellation: true
});

// @ts-ignore
const operationRouter = new Router();


/*#############################################################|
|  >>> TEST AND OPERATIONS ROUTES!
*##############################################################*/

operationRouter.get("/asset/time-series", async (req, res) => {


  const tradingBot = new TradingBot();

  const response = await tradingBot.updateTimeSeries("RIT.TO", PriceInterval.Daily, TimeSeriesUpdateType.Partial)

  if (!response) {
    return res.status(200).send({
      status: "error",
      message: "Failed to fetch time series data"
    })
  }



  return res.status(200).send({
    status: "success"
  })

})




export { operationRouter }