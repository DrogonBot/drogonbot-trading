import express from 'express';

import { ThreeDragons } from '../../trading/strategies/ThreeDragons';

// @ts-ignore
const backTestRouter = new express.Router();

// get asset price data
backTestRouter.get("/backtest/:interval/:strategy", async (req, res) => {

  const { strategy, interval } = req.params;

  const { tickers } = req.query

  try {

    switch (strategy) {



      case "ThreeDragons":

        const tickersArray = tickers.split(",").map((ticker) => ticker)
        const threeDragons = new ThreeDragons(tickersArray, interval)
        await threeDragons.backTest()

        break;

    }

    return res.status(200).send({
      status: "success"
    })


  }
  catch (error) {
    console.error(error);

  }


})






export { backTestRouter };