import { PostSource } from '../../resources/Post/post.types';
import { scrappingTargets } from '../data/scrappingTargets';
import { ScrapperFacebook } from '../scrappers/ScrapperFacebook';
import { ScrapperOLX } from '../scrappers/ScrapperOLX';
import { IScrappingTarget, PagePattern, TargetPriority } from '../types/bots.types';
import { BotHelper } from './BotHelper';


export class ScrappingTargetHelper {

  public static getScrappingTargetList = (filterByPriority?: TargetPriority | false, sortByPriority?: boolean, stateCode?: string | false, source?: PostSource) => {


    let results = scrappingTargets;



    if (filterByPriority) {
      results = results.filter((result) => result.priority === filterByPriority)
    }

    if (stateCode) {
      results = results.filter((result) => result.postDataOverride.stateCode === stateCode.toUpperCase())
    }

    if (sortByPriority) {
      results = results.sort((x, y) => x.priority > y.priority ? -1 : 1);
    }



    if (source) {
      results = results.filter((result) => result.source === source)
    }

    return results;
  }

  public static startScrappers = async (results: IScrappingTarget[]) => {


    for (const result of results) {
      switch (result.source) {
        case PostSource.Facebook:
          await BotHelper.initScrapper(result.name, result.source, {
            crawlFeedFunction: ScrapperFacebook.crawlPageFeed
          }, PagePattern.Feed, result.externalSource, result.postDataOverride)

          break;
        case PostSource.OLX:
          await BotHelper.initScrapper(result.name, result.source, {
            crawlLinksFunction: ScrapperOLX.crawlLinks,
            crawlPageDataFunction: ScrapperOLX.crawlPageData
          }, PagePattern.ListAndInternalPosts, result.externalSource, result.postDataOverride)
          break;
      }
    }
  }


}