import express from 'express';

import { TradingDataAssistant } from '../../trading/strategies/data/TradingDataAssistant';
import { TS } from '../../utils/TS';
import { Quote } from './quote.model';


// @ts-ignore
const quoteRouter = new express.Router();

// get asset price data
quoteRouter.get("/price/:symbol/:interval", async (req, res) => {

  const { symbol, interval } = req.params;
  const { limit, orderDirection, orderBy } = req.query;

  try {

    const price = await Quote.find({ symbol, interval }).limit(parseInt(limit)).sort({
      [orderBy]: orderDirection
    });

    return res.status(200).send(price)


  }
  catch (error) {
    console.error(error);

  }


})

quoteRouter.get("/price/:ticker", async (req, res) => {


  const { ticker } = req.params;
  const { interval, type, minutesInterval } = req.query;


  const dataAssistant = new TradingDataAssistant()

  try {

    await dataAssistant.updatePriceData(ticker, type, interval, minutesInterval)

    return res.status(200).send({
      status: "success"
    })
  }
  catch (error) {
    console.error(error);

    return res.status(200).send({
      status: "error",
      message: TS.string("asset", "assetUpdateError"),
      details: error.message || error.errmsg || error.errors
    })

  }



  // const timeSeriesResponse = await tradingBot.updatePriceData(symbol, updateType, interval, minInterval)

  // if (!timeSeriesResponse) {
  //   return res.status(200).send({
  //     status: "error",
  //     message: TS.string("asset", "assetTimeSeriesFetchError")
  //   })
  // }



})






export { quoteRouter };