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


  try {
    const places = await Place.findOne({
      country: TextHelper.capitalizeFirstLetter(country),
      stateCode
    });

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