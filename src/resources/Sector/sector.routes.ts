import express from 'express';

import { userAuthMiddleware } from '../../middlewares/auth.middleware';
import { LanguageHelper } from '../../utils/LanguageHelper';
import { SectorHelper } from '../../utils/SectorHelper';
import { TextHelper } from '../../utils/TextHelper';
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
      message: LanguageHelper.getLanguageString('sector', 'sectorsLoadError')
    })

  }
});



sectorRouter.get("/sectors/search/:keyword", userAuthMiddleware, async (req, res) => {

  const { keyword } = req.params;


  try {
    // find all sectors that has a keyword thats similar than the one the user has passed to us
    const sectors = await Sector.find({ keywords: { $regex: keyword, $options: "i" } });

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
      message: LanguageHelper.getLanguageString('sector', 'sectorKeywordError')
    })
  }



})


export { sectorRouter };