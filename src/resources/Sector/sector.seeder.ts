import { Sector } from './sector.model';



export class SectorSeeder {

  public static async seed() {

    const countries = ['brazil'] // add more countries here. It will load the corresponding .json data file

    for (const countryName of countries) {
      // check if there're no places registered
      const sectorsData = require(`./sector.data.${countryName}.json`)
      const sectors = await Sector.find({});

      if (!sectors.length) {

        console.log(`SEED: Populating sectors data for ${countryName}...`);

        sectorsData.forEach(async ({ country, name }) => {

          console.log(`populating => ${name}`);

          try {
            const newSector = await new Sector({
              country,
              name
            })
            await newSector.save()
          }
          catch (error) {
            console.log(`Error while saving ${name}`);
            console.error(error);
          }
        })



      }
    }




  }


}