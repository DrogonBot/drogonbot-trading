import express from 'express';

import { AssetPrice } from '../AssetPrice/assetprice.model';


// @ts-ignore
const assetPrice = new express.Router();

// get asset price data
assetPrice.get("/price/:symbol/:interval", async (req, res) => {

  const { symbol, interval } = req.params;
  const { limit } = req.query;

  try {

    const price = await AssetPrice.find({ symbol, interval }).limit(parseInt(limit));

    return res.status(200).send(price)


  }
  catch (error) {
    console.error(error);

  }


})






export { assetPrice };