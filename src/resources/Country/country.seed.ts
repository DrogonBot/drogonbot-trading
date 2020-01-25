import { Country } from './country.model';



export class CountrySeeder {

  public static async seed() {



    const countries = await Country.find({})

    if (!countries.length) {
      const countryData = require('./country.data.json')


      for (const country of countryData) {

        console.log(`Populating country => ${country.name}`);

        try {
          const addedCountry = new Country({
            name: country.name,
            code: country.code
          })

          await addedCountry.save();
        }
        catch (error) {

          console.log(`Failed to save country: ${country.name}`);
        }




      }
    }








  }


}