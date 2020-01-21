import express from 'express';

import { LanguageHelper } from '../../utils/LanguageHelper';
import { TextHelper } from '../../utils/TextHelper';
import { Sector } from './sector.model';


// @ts-ignore
const sectorRouter = new express.Router();

sectorRouter.get("/sectors/:country", async (req, res) => {

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


export { sectorRouter };