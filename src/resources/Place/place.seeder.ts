import { Country } from '../Country/country.model';
import { Place } from './place.model';




export class PlaceSeeder {


  public static async seed() {

    const availableCountries = ['brazil'] // countries that we have data from...

    for (const countryName of availableCountries) {
      // check if there're no places registered
      const placesData = require(`./place.data.${countryName}.json`)

      // Places are basically state and cities collections, that refer to a particular country
      const places = await Place.find({});

      if (!places.length) {

        console.log(`SEED: Populating places data for ${countryName}...`);


        // tslint:disable-next-line: no-shadowed-variable
        for (const { country: countryName, uf, stateCode, stateName, cities } of placesData) {

          console.log(`populating => ${countryName}/${stateName}`);

          const country = await Country.findOne({ name: countryName })

          if (!country) {
            throw new SyntaxError('Country not found!')
          }
          try {
            const newPlace = new Place({
              country: country.name,
              uf,
              stateCode,
              stateName,
              cities
            })
            await newPlace.save()
          }
          catch (error) {
            console.log(`Error while saving ${stateName}`);
            console.error(error);
          }
        }






      }
    }




  }


}