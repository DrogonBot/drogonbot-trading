import express from 'express';

import { TS } from '../../libs/TS';
import { TradingDataAssistant } from '../../trading/strategies/data/TradingDataAssistant';
import { Quote } from './quote.model';


// @ts-ignore
const quoteRouter = new express.Router();

// get asset price data
quoteRouter.get("/price/:ticker/:interval", async (req, res) => {

  const { ticker, interval } = req.params;
  const { limit, orderDirection, orderBy } = req.query;

  try {

    const price = await Quote.find({ ticker, interval }).limit(parseInt(limit)).sort({
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
})






export { quoteRouter };