import { Country } from '../Country/country.model';
import { Sector } from './sector.model';


interface ISectorData {
  country: string;
  name: string;
}

export class SectorSeeder {

  public static async seed() {

    const countries = ['brazil'] // add more countries here. It will load the corresponding .json data file

    for (const countryName of countries) {
      // check if there're no places registered
      const sectorsData: ISectorData[] = require(`./sector.data.${countryName}.json`)
      const sectors = await Sector.find({});

      if (!sectors.length) {


        for (const sectorData of sectorsData) {

          console.log(`SEED: Adding sector data for => ${sectorData.name}`);

          // find corresponding country model

          try {

            const newSector = new Sector({
              country: sectorData.country,
              name: sectorData.name
            })

            newSector.save()
          }
          catch (error) {
            console.error(error);

          }





        }




      }
    }




  }


}