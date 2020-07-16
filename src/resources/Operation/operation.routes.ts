import Promise from 'bluebird';
import { Router } from 'express';

import { TradingBot } from '../../bots/TradingBot/TradingBot';
import { TS } from '../../utils/TS';
import { DataInterval, IndicatorSeriesType } from '../Asset/asset.types';


// Fix Telegram bot promise issue: https://github.com/benjick/meteor-telegram-bot/issues/37#issuecomment-389669310
Promise.config({
  cancellation: true
});

// @ts-ignore
const operationRouter = new Router();


/*#############################################################|
|  >>> TEST AND OPERATIONS ROUTES!
*##############################################################*/

operationRouter.get("/asset/update/:dataType/:updateType", async (req, res) => {


  const { dataType, updateType } = req.params;

  const tradingBot = new TradingBot();

  switch (dataType) {
    case "price-data":


      const timeSeriesResponse = await tradingBot.updatePriceData("RIT.TO", DataInterval.Daily, updateType)

      if (!timeSeriesResponse) {
        return res.status(200).send({
          status: "error",
          message: TS.string("asset", "assetTimeSeriesFetchError")
        })
      }

      break;

    case "indicator-data":


      const indicatorResponse = await tradingBot.updateIndicator("RIT.TO", "EMA", DataInterval.Daily, 55, IndicatorSeriesType.Close, updateType)

      if (!indicatorResponse) {
        return res.status(200).send({
          status: "error",
          message: TS.string("asset", "assetIndicatorsFetchError")
        })
      }

      break;
  }







  return res.status(200).send({
    status: "success"
  })

})




export { operationRouter }