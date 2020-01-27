import express from 'express';

import { LanguageHelper } from '../../utils/LanguageHelper';
import { TextHelper } from '../../utils/TextHelper';
import { Place } from './place.model';


/*#############################################################|
|  >>> PROTECTED ROUTES
*##############################################################*/

// @ts-ignore
const placeRouter = new express.Router();



placeRouter.get("/places/:country/:stateCode", async (req, res) => {

  const { stateCode, country } = req.params;

  const { citiesOnly } = req.query;


  try {
    const place = await Place.findOne({
      country: TextHelper.capitalizeFirstLetter(country),
      stateCode
    });

    if (!place) {
      throw new Error(LanguageHelper.getLanguageString('place', 'placesNotfound'))
    }

    if (citiesOnly) {

      const citiesData = place.cities.map((city) => {
        return {
          name: city.cityName
        }
      })

      return res.status(200).send(citiesData)


    }

    return res.status(200).send(place);
  }
  catch (error) {

    res.status(400).send({
      status: 'error',
      message: LanguageHelper.getLanguageString('place', 'placesLoadError')
    })

  }
});


// All places from a country

placeRouter.get("/places/:country", async (req, res) => {

  const { country } = req.params;

  const { statesOnly } = req.query;



  try {
    const places = await Place.find({
      country: TextHelper.capitalizeFirstLetter(country),

    });

    if (statesOnly) {
      const states = places.map((place) => {
        return { stateName: place.stateName, stateCode: place.stateCode }
      })
      return res.status(200).send(states)
    }

    return res.status(200).send(places);
  }
  catch (error) {

    res.status(400).send({
      status: 'error',
      message: LanguageHelper.getLanguageString('place', 'placesLoadError')
    })

  }
});



export { placeRouter };