import express from 'express';
import stringSimilarity from 'string-similarity';

import { userAuthMiddleware } from '../../middlewares/auth.middleware';
import { GenericHelper } from '../../utils/GenericHelper';
import { LanguageHelper } from '../../utils/LanguageHelper';
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
      const keywords = GenericHelper.arrayFlatten(sectors.map((sector) => {

        // This uses a module package to calculate our words similarity, then filter it with a 20% threshold.

        const bestMatchesKeywords = sector.keywords.length > 0 ? stringSimilarity.findBestMatch(keyword, sector.keywords).ratings.filter((result) => result.rating > 0.2) : []

        const output = bestMatchesKeywords.map((matches) => {

          matches.sectorName = sector.name;

          return matches;

        })

        return output

      }))
      // Then, we sort it DESC
      const sortedBestMatchesStrings = keywords.sort((x, y) => x.rating < y.rating ? 1 : -1);



      return res.status(200).send(sortedBestMatchesStrings)







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