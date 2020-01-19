import { Place } from './place.model';




export class PlaceSeeder {


  public static async seed() {

    const countries = ['brazil'] // add more countries here. It will load the corresponding .json data file

    for (const countryName of countries) {
      // check if there're no places registered
      const placesData = require(`./place.data.${countryName}.json`)
      const places = await Place.find({});

      if (!places.length) {

        console.log(`SEED: Populating places data for ${countryName}...`);

        placesData.forEach(async ({ country, uf, stateCode, stateName, cities }) => {

          console.log(`populating => ${country}/${stateName}`);

          try {
            const newPlace = await new Place({
              country,
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
        })



      }
    }




  }


}