import cheerio from 'cheerio';

import { PostSource } from '../../../resources/Post/post.types';
import { ConnectionHelper } from '../helpers/ConnectionHelper';
import { DataExtractorHelper } from '../helpers/DataExtractorHelper';
import { PostScrapperHelper } from '../helpers/PostScrapperHelper';
import { IScrapperLink } from '../types/bots.types';



export class ScrapperSeuJobs {

  public static postLinks: IScrapperLink[] | null = null

  public static crawlLinks = async (externalSource: string): Promise<IScrapperLink[]> => {

    console.log(`🤖: Crawling links for ${externalSource}`);

    const html = await ConnectionHelper.request(
      externalSource
    );

    const $ = cheerio.load(html);

    return PostScrapperHelper.extractPostLinks(ScrapperSeuJobs.name, externalSource, html, '.job_listings a[href*=seujobs]')

  }

  public static crawlPageData = async (link: string, postDataOverride?) => {

    console.log(`Requesting html from link ${link}`);
    const html = await ConnectionHelper.request(link)

    const $ = cheerio.load(html);


    const title = $('header > h1').text().trim()

    const rawContent = PostScrapperHelper.extractContent(html, '.entry-content');

    const locationTag = $('.google_map_link').text().trim();

    const place = await PostScrapperHelper.getProvinceAndCity(locationTag, postDataOverride)

    const { sector, jobRoleBestMatch } = await PostScrapperHelper.findJobRolesAndSector(rawContent, title)

    const complementaryData = await DataExtractorHelper.extractJobData(rawContent)

    const jobData = {
      ...complementaryData,
      title,
      content: rawContent,
      externalUrl: link,
      country: "Brazil",
      source: PostSource.Blog,
      stateCode: place?.stateCode || "SP",
      sector,
      jobRoles: [jobRoleBestMatch],
      ...postDataOverride,
      city: place?.city || "São Paulo",
    }




    return jobData

  }






}