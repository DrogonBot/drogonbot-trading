import express from 'express';

import { ThreeDragons } from '../../trading/strategies/ThreeDragons';

// @ts-ignore
const backTestRouter = new express.Router();

// get asset price data
backTestRouter.get("/backtest/:symbols/:interval/:strategy", async (req, res) => {

  const { symbols, strategy, interval } = req.params;

  try {

    switch (strategy) {



      case "ThreeDragons":

        const assetsArray = symbols.split(",").map((symbol) => symbol)


        const threeDragons = new ThreeDragons(assetsArray, interval)
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