import express from 'express';

import { OliverTradingSystem } from '../../tradingSystems/OliverTradingSystem';

// @ts-ignore
const backTestRouter = new express.Router();

// get asset price data
backTestRouter.get("/backtest/:symbol/:interval/:strategy", async (req, res) => {

  const { symbol, strategy, interval } = req.params;

  try {

    switch (strategy) {

      case "oliverMA":

        const oliverStrategy = new OliverTradingSystem(symbol, interval)

        await oliverStrategy.init();


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