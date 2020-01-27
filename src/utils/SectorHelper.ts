import stringSimilarity from 'string-similarity';

import { ISectorModel } from '../resources/Sector/sector.model';
import { GenericHelper } from './GenericHelper';

export interface ISectorKeywordMatch {
  target: string,
  rating: number;
  sectorName: string;
}

export class SectorHelper {
  public static findSectorsWithKeyword(keyword: string, sectors: ISectorModel[]): ISectorKeywordMatch {

    const keywords = GenericHelper.arrayFlatten(sectors.map((sector) => {

      // This uses a module package to calculate our words similarity, then filter it with a 20% threshold.

      const bestMatchesKeywords = sector.keywords.length > 0 ? stringSimilarity.findBestMatch(keyword, sector.keywords).ratings.filter((result) => result.rating > 0.2) : []

      const output = bestMatchesKeywords.map((matches) => {

        matches.sectorName = sector.name;

        return matches;

      })

      return output

    }))
    // Then, we sort it DESC
    const sortedBestMatchesStrings = keywords.sort((x, y) => x.rating < y.rating ? 1 : -1);

    return sortedBestMatchesStrings



  }
}