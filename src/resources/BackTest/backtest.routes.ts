import express from 'express';

import { OliverTradingSystem } from '../../tradingSystems/OliverTradingSystem';
import { DataInterval } from '../Asset/asset.types';

// @ts-ignore
const backTestRouter = new express.Router();

// get asset price data
backTestRouter.get("/backtest/:symbol/:strategy", async (req, res) => {

  const { symbol, strategy } = req.params;
  const { interval } = req.query;

  try {



    switch (strategy) {

      case "oliverMA":

        const oliverStrategy = new OliverTradingSystem("RIT.TO", DataInterval.Daily)

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