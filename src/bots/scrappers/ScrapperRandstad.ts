import cheerio from 'cheerio';

import { PostSource } from '../../resources/Post/post.types';
import { ConnectionHelper } from '../helpers/ConnectionHelper';
import { DataExtractorHelper } from '../helpers/DataExtractorHelper';
import { PostScrapperHelper } from '../helpers/PostScrapperHelper';
import { IScrapperLink } from '../types/bots.types';

export class ScrapperRandstad {

  public static postLinks: IScrapperLink[] | null = null

  public static crawlLinks = async (externalSource: string): Promise<IScrapperLink[]> => {

    console.log(`🤖: Crawling links for ${externalSource}`);

    const html = await ConnectionHelper.requestHtml(
      externalSource
    );

    return PostScrapperHelper.extractPostLinks(ScrapperRandstad.name, externalSource, html, '.btn.btn-prim[id*="JobsListView"]')
  }

  public static crawlPageData = async (link: string, postDataOverride?) => {

    console.log(`Requesting html from link ${link}`);
    const html = await ConnectionHelper.requestHtml(link)

    const $ = cheerio.load(html);

    const title = $(`#js_jobTitle`).text()

    let rawContent = PostScrapperHelper.extractContent(html, '.job-desc-section');
    rawContent = rawContent.replace(/Partilhar[\s\S]+/g, '')

    const { stateCode, city } = await PostScrapperHelper.getProvinceAndCity(`${title} ${rawContent}`, postDataOverride)

    const { sector, jobRoleBestMatch } = await PostScrapperHelper.findJobRolesAndSector(rawContent, title)

    const complementaryData = await DataExtractorHelper.extractJobData(rawContent)

    const jobData = {
      ...complementaryData,
      title,
      content: rawContent,
      externalUrl: link,
      country: "Brazil",
      source: PostSource.Blog,
      sector,
      jobRoles: [jobRoleBestMatch],
      ...postDataOverride,
      stateCode,
      city,
    }




    return jobData

  }






}