import randomstring from 'randomstring';
import getSlug from 'speakingurl';

export class PostHelper {

  public static generateTitleSlug = (title: string) => {

    const randomString = randomstring.generate({
      length: 5,
      charset: 'alphabetic'
    });


    return getSlug(`${title}-${randomString}`, { lang: 'pt' })
  }



}