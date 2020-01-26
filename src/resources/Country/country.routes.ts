import express from 'express';

import { LanguageHelper } from '../../utils/LanguageHelper';
import { Country } from './country.model';

// @ts-ignore
const countryRouter = new express.Router();

countryRouter.get("/country", async (req, res) => {

  try {
    const countries = await Country.find({})

    if (!countries) {
      throw new Error(LanguageHelper.getLanguageString('country', 'countryNotFound'))
    }


    if (countries) {
      return res.status(200).send(countries)
    }


  }
  catch (error) {
    console.error(error);

    return res.status(400).send({
      status: 'error',
      message: LanguageHelper.getLanguageString('country', 'countryGetError')
    })

  }


});





export { countryRouter };