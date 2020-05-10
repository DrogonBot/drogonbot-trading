import { AffiliateProduct } from './affiliate.model';
import hotmartProducts from './hotmart.data.json';

export class AffiliateSeeder {

  public static async seed() {

    const affiliateProducts = await AffiliateProduct.find({})

    if (!affiliateProducts.length) {

      for (const product of hotmartProducts) {

        // add hotmart affiliates
        console.log(`AffiliateProduct: Hotmart => ${product.name}`);
        const newProduct = new AffiliateProduct({
          platform: "hotmart",
          name: product.name,
          sector: product.sector,
          link: product.link,
          image: product.image,
          keywords: product.keywords
        })
        await newProduct.save();
      }
    }
  }
}