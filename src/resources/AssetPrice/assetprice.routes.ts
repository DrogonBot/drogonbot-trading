import express from 'express';

import { AssetPrice } from '../AssetPrice/assetprice.model';


// @ts-ignore
const assetPriceRouter = new express.Router();

// get asset price data
assetPriceRouter.get("/price/:symbol/:interval", async (req, res) => {

  const { symbol, interval } = req.params;
  const { limit, orderDirection, orderBy } = req.query;

  try {

    const price = await AssetPrice.find({ symbol, interval }).limit(parseInt(limit)).sort({
      [orderBy]: orderDirection
    });

    return res.status(200).send(price)


  }
  catch (error) {
    console.error(error);

  }


})






export { assetPriceRouter };