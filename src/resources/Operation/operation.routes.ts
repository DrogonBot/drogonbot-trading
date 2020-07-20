import Promise from 'bluebird';
import { Router } from 'express';

import { TradingAssistant } from '../../bots/TradingBot/TradingAssistant';
import { ATRHelper } from '../../utils/Indicators/ATRHelper';
import { DonchianChannelHelper } from '../../utils/Indicators/DonchianChannelHelper';
import { MovingAverageHelper } from '../../utils/Indicators/MovingAverageHelper';
import { IndicatorSeriesType } from '../../utils/Indicators/types/indicator.types';



// Fix Telegram bot promise issue: https://github.com/benjick/meteor-telegram-bot/issues/37#issuecomment-389669310
Promise.config({
  cancellation: true
});

// @ts-ignore
const operationRouter = new Router();


/*#############################################################|
|  >>> TEST AND OPERATIONS ROUTES!
*##############################################################*/

operationRouter.get("/asset/:symbol/update", async (req, res) => {


  const { symbol } = req.params;
  const { period } = req.query;


  const tradingBot = new TradingAssistant();

  await tradingBot.updatePriceData(symbol, period)



  // const timeSeriesResponse = await tradingBot.updatePriceData(symbol, updateType, interval, minInterval)

  // if (!timeSeriesResponse) {
  //   return res.status(200).send({
  //     status: "error",
  //     message: TS.string("asset", "assetTimeSeriesFetchError")
  //   })
  // }

  return res.status(200).send({
    status: "success"
  })

})

operationRouter.get("/asset/:symbol/:indicator/:interval", async (req, res) => {


  const { indicator, symbol, interval } = req.params;

  try {


    switch (indicator) {
      case "SMA":
        const smaData = await MovingAverageHelper.calculateSMA(symbol, interval, 20, IndicatorSeriesType.Close)

        return res.status(200).send(smaData);
      case "EMA":
        const indicatorData = await MovingAverageHelper.calculateEMA(symbol, 55, IndicatorSeriesType.Close, interval)

        return res.status(200).send(indicatorData);

      case "DonchianChannel":
        const donchianData = await DonchianChannelHelper.calculate(symbol, 20, interval)

        return res.status(200).send(donchianData);

      case "ATR":
        const atrData = await ATRHelper.calculate(symbol, interval, 14)

        return res.status(200).send(atrData);


    }
  }
  catch (error) {
    console.error(error);

  }


  return res.status(200).send({
    status: "success"
  })

})




export { operationRouter }