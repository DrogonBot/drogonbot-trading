import { PostSource } from '../../resources/Post/post.types';
import { scrappingTargets } from '../data/scrappingTargets';
import { ScrapperFacebook } from '../scrappers/ScrapperFacebook';
import { ScrapperOLX } from '../scrappers/ScrapperOLX';
import { IScrappingTarget, PagePattern, TargetPriority } from '../types/bots.types';
import { BotHelper } from './BotHelper';


export interface IScrappingTargetFilter {
  key: string,
  value: string
}

export class ScrappingTargetHelper {

  public static getScrappingTargetList = (filterByPriority: TargetPriority, sortByPriority: boolean, stateCode: string) => {


    let results = scrappingTargets;


    if (filterByPriority) {
      results = results.filter((result) => result.priority === filterByPriority)
    }

    if (stateCode) {
      results = results.filter((result) => result.dataOverride.stateCode === stateCode.toUpperCase())
    }

    if (sortByPriority) {
      return results.sort((x, y) => x.priority > y.priority ? -1 : 1);
    }

    return results;
  }

  public static startScrappers = async (results: IScrappingTarget[]) => {


    for (const result of results) {
      switch (result.source) {
        case PostSource.Facebook:
          await BotHelper.initScrapper(result.name, {
            crawlFeedFunction: ScrapperFacebook.crawlPageFeed
          }, PagePattern.Feed, result.externalSource, result.dataOverride)

          break;
        case PostSource.OLX:
          await BotHelper.initScrapper(result.name, {
            crawlLinksFunction: ScrapperOLX.crawlLinks,
            crawlPageDataFunction: ScrapperOLX.crawlPageData
          }, PagePattern.ListAndInternalPosts, result.externalSource, result.dataOverride)
          break;
      }
    }
  }


}