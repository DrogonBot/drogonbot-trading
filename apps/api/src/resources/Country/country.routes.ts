import express from 'express';

import { TS } from '../../libs/TS';
import { Country } from './country.model';

// @ts-ignore
const countryRouter = new express.Router();

countryRouter.get("/country", async (req, res) => {

  try {
    const countries = await Country.find({})

    if (!countries) {
      throw new Error(TS.string('country', 'countryNotFound'))
    }


    if (countries) {
      return res.status(200).send(countries)
    }


  }
  catch (error) {
    console.error(error);

    return res.status(400).send({
      status: 'error',
      message: TS.string('country', 'countryGetError')
    })

  }


});





export { countryRouter };