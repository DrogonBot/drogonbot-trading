import randomstring from 'randomstring';
import getSlug from 'speakingurl';

import { AffiliateProduct } from '../resources/AffiliateProduct/affiliate.model';
import { IAffiliateProduct } from '../resources/AffiliateProduct/affiliate.types';
import { IPost } from '../resources/Post/post.types';

export class PostHelper {

  public static generateTitleSlug = (title: string) => {

    const randomString = randomstring.generate({
      length: 5,
      charset: 'alphabetic'
    });


    return getSlug(`${title}-${randomString}`, { lang: 'pt' })
  }

  public static getRelatedAffiliateProducts = async (post: IPost) => {


    let output: IAffiliateProduct[] = [];

    const specificProducts = await AffiliateProduct.find({
      keywords: { "$in": [post.jobRoles[0]] }
    })
    if (specificProducts.length) {
      for (const specificProduct of specificProducts) {
        output = [
          ...output,
          specificProduct
        ]
      }

    } else {

      // if no specific products are found, add sector level products
      const sectorProducts = await AffiliateProduct.find({
        sector: post.sector
      })


      for (const sectorProduct of sectorProducts) {
        output = [
          ...output,
          sectorProduct
        ]
      }
    }

    const genericProducts = await AffiliateProduct.find({
      sector: "ALL"
    })

    return [
      ...output,
      ...genericProducts
    ]



  }


}