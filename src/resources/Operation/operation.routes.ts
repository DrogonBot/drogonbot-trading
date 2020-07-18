import Promise from 'bluebird';
import { Router } from 'express';

import { TradingBot } from '../../bots/TradingBot/TradingBot';
import { ATRHelper } from '../../utils/Indicators/ATRHelper';
import { DonchianChannelHelper } from '../../utils/Indicators/DonchianChannelHelper';
import { MovingAverageHelper } from '../../utils/Indicators/MovingAverageHelper';
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

  }

  return res.status(200).send({
    status: "success"
  })

})

operationRouter.get("/asset/:symbol/:indicator", async (req, res) => {


  const { indicator, symbol } = req.params;

  try {


    switch (indicator) {
      case "SMA":
        const smaData = await MovingAverageHelper.calculateSMA(symbol, DataInterval.Daily, 20, IndicatorSeriesType.Close)

        return res.status(200).send(smaData);
      case "EMA":
        const indicatorData = await MovingAverageHelper.calculateEMA(symbol, 55, IndicatorSeriesType.Close, DataInterval.Daily)

        return res.status(200).send(indicatorData);

      case "DonchianChannel":
        const donchianData = await DonchianChannelHelper.calculate(symbol, 20, DataInterval.Daily, "high")

        return res.status(200).send(donchianData);

      case "ATR":
        const atrData = await ATRHelper.calculate(symbol, DataInterval.Daily, 14)

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