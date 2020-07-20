import express from 'express';

import { LeatherBackTurtle } from '../../tradingSystems/LeatherBackTurtle';

// @ts-ignore
const backTestRouter = new express.Router();

// get asset price data
backTestRouter.get("/backtest/:symbol/:interval/:strategy", async (req, res) => {

  const { symbol, strategy, interval } = req.params;

  try {

    switch (strategy) {



      case "leatherbackTurtle":

        const lt = new LeatherBackTurtle(symbol, interval)
        await lt.backTest();


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