import { PostSource } from '../../resources/Post/post.types';
import { scrappingTargets } from '../data/scrappingTargets';
import { IScrappingTarget, PagePattern, TargetPriority } from '../types/bots.types';
import { BotHelper } from './BotHelper';


export class ScrappingTargetHelper {

  public static getScrappingTargetList = (filterByPriority?: TargetPriority | false, sortByPriority?: boolean, stateCode?: string | false, source?: PostSource, name?: string) => {


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

    if (name) {
      results = results.filter((result) => result.name === name)
    }



    if (source) {
      results = results.filter((result) => result.source === source)
    }

    return results;
  }

  public static startScrappers = async (results: IScrappingTarget[]) => {


    for (const result of results) {

      switch (result.pagePattern) {
        case PagePattern.Feed:
          await BotHelper.initScrapper(result.name, result.scrapperClass, result.source, {
            crawlFeedFunction: result.scrapperClass.crawlPageFeed
          }, PagePattern.Feed, result.externalSource, result.postDataOverride, result.bypassPostContentFilter)

          break;
        case PagePattern.ListAndInternalPosts:
          await BotHelper.initScrapper(result.name, result.scrapperClass, result.source, {
            crawlLinksFunction: result.scrapperClass.crawlLinks,
            crawlPageDataFunction: result.scrapperClass.crawlPageData
          }, PagePattern.ListAndInternalPosts, result.externalSource, result.postDataOverride, result.bypassPostContentFilter)
          break;
      }
    }
  }



}