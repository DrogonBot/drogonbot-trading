import cheerio from 'cheerio';

import { PostSource } from '../../resources/Post/post.types';
import { ConnectionHelper } from '../helpers/ConnectionHelper';
import { DataExtractorHelper } from '../helpers/DataExtractorHelper';
import { PostScrapperHelper } from '../helpers/PostScrapperHelper';
import { IScrapperLink } from '../types/bots.types';

export class ScrapperTrabalhaBrasil {

  public static postLinks: IScrapperLink[] | null = null

  public static crawlLinks = async (externalSource: string): Promise<IScrapperLink[]> => {

    console.log(`🤖: Crawling links for ${externalSource}`);

    const html = await ConnectionHelper.requestHtml(
      externalSource
    );

    return PostScrapperHelper.extractPostLinks(ScrapperTrabalhaBrasil.name, externalSource, html, 'a.job-vacancy')
  }

  public static crawlPageData = async (link: string, postDataOverride?) => {

    console.log(`Requesting html from link ${link}`);
    const html = await ConnectionHelper.requestHtml(link)

    const $ = cheerio.load(html);

    let title = $(`h1.job-title`).text()
    title = title.replace(/- Cód. \d+/gi, "");

    const rawContent = PostScrapperHelper.extractContent(html, '.job-text');

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