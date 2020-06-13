import express from 'express';
import _ from 'lodash';

import { userAuthMiddleware } from '../../middlewares/auth.middleware';
import { SectorHelper } from '../../utils/SectorHelper';
import { TextHelper } from '../../utils/TextHelper';
import { TS } from '../../utils/TS';
import { Sector } from './sector.model';


// @ts-ignore
const sectorRouter = new express.Router();

sectorRouter.get("/sectors/:country", userAuthMiddleware, async (req, res) => {

  const { country } = req.params

  try {
    const sectors = await Sector.find({
      country: TextHelper.capitalizeFirstLetter(country)
    })

    return res.status(200).send(sectors);
  }
  catch (error) {

    res.status(400).send({
      status: 'error',
      message: TS.string('sector', 'sectorsLoadError')
    })

  }
});

sectorRouter.get("/sectors/keywords/all", async (req, res) => {

  try {
    const sectors = await Sector.find({})

    const keywords = sectors.map((sector) => _.flatten(sector.keywords))

    const flattenedKeywords = _.flatten(keywords)

    return res.status(200).send({
      keywords: flattenedKeywords
    })
  }
  catch (error) {
    console.error(error);
    return res.status(400).send({
      status: 'error',
      message: TS.string('sector', 'sectorKeywordAllError')
    })
  }

})


sectorRouter.get("/sectors/search/:keyword", userAuthMiddleware, async (req, res) => {

  const { keyword } = req.params;

  try {
    // find all sectors that has a keyword thats similar than the one the user has passed to us
    const sectors = await Sector.find({ keywords: { $regex: keyword, $options: "i" } }); // find keywords by regex, "i" = case insensitive

    if (sectors) {


      // merge all keywords from all sectors (Since it creates a string[][], we use arrayFlatten to convert it to string[])
      const sectorsWithKeyword = SectorHelper.findSectorsWithKeyword(keyword, sectors);


      return res.status(200).send(sectorsWithKeyword)

    } else {
      return res.status(200).send([])
    }


  }
  catch (error) {
    console.error(error);
    res.status(400).send({
      status: 'error',
      message: TS.string('sector', 'sectorKeywordError')
    })
  }



})


export { sectorRouter };