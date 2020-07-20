import { Router } from 'express';

import { ATRHelper } from '../../trading/indicators/ATRHelper';
import { DonchianChannelHelper } from '../../trading/indicators/DonchianChannelHelper';
import { MovingAverageHelper } from '../../trading/indicators/MovingAverageHelper';
import { IndicatorSeriesType } from '../../trading/indicators/types/indicator.types';



// @ts-ignore
const operationRouter = new Router();


/*#############################################################|
|  >>> TEST AND OPERATIONS ROUTES!
*##############################################################*/



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