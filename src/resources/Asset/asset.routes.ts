import express from 'express';

import { RequestMiddleware } from '../../middlewares/request.middleware';
import { TS } from '../../utils/TS';
import { Asset } from './asset.model';

// @ts-ignore
const assetRouter = new express.Router();

// create your assetRouter

assetRouter.post("/asset", async (req, res) => {

  try {
    const newAsset = new Asset({
      ...req.body
    })
    await newAsset.save()


    return res.status(200).send(newAsset)


  }
  catch (error) {
    console.error(error);
    return res.status(200).send({
      status: "error",
      message: TS.string("asset", "assetCreationError"),
      details: error.errmsg || error.errors
    })
  }




})


// get all assets
assetRouter.get("/asset", async (req, res) => {

  try {
    const assets = await Asset.find({})

    return res.status(200).send(assets)

  }
  catch (error) {
    console.error(error);

    return res.status(200).send({
      status: "error",
      message: TS.string("asset", "assetFetchError"),
      details: error.errmsg || error.errors
    })
  }

});




// update fields
assetRouter.patch("/asset/:id", [RequestMiddleware.allowedRequestKeys(["market", "sector", "priceInterval",])], async (req, res) => {

  const { id } = req.params;


  try {
    const asset = await Asset.findOne({ _id: id })

    if (!asset) {
      throw new Error(TS.string("asset", "assetNotFound"))
    }

    Object.entries(req.body).map(([key, value]) => {

      asset[key] = value;

    })
    await asset.save();

    return res.status(200).send(asset)


  }
  catch (error) {
    return res.status(200).send({
      status: "error",
      message: TS.string("asset", "assetUpdateError"),
      details: error.message || error.errmsg || error.errors
    })
  }

})

assetRouter.delete("/asset/:id", async (req, res) => {

  const { id } = req.params;

  try {
    const asset = await Asset.findOne({ _id: id })

    if (!asset) {
      throw new Error(TS.string("asset", "assetNotFound"))
    }

    await asset.remove();

    return res.status(200).send({
      status: "success",
      message: TS.string("asset", "assetDeletedSuccess")
    })

  }
  catch (error) {
    console.error(error);
    return res.status(200).send({
      status: "error",
      message: TS.string("asset", "assetDeletionError"),
      details: error.message || error.errmsg || error.errors
    })
  }


})





export { assetRouter };