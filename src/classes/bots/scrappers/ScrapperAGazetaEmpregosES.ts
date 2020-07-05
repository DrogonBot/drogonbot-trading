import cheerio from 'cheerio';

import { PostSource } from '../../../resources/Post/post.types';
import { GenericHelper } from '../../../utils/GenericHelper';
import { ConnectionHelper } from '../helpers/ConnectionHelper';
import { DataExtractorHelper } from '../helpers/DataExtractorHelper';
import { PostScrapperHelper } from '../helpers/PostScrapperHelper';
import { IScrapperLink } from '../types/bots.types';


export class ScrapperAGazetaEmpregosES {

  public static postLinks: IScrapperLink[] | null = null

  public static crawlLinks = async (externalSource: string): Promise<IScrapperLink[]> => {

    console.log(`🤖: Crawling links for ${externalSource}`);

    const html = await ConnectionHelper.request(
      externalSource
    );


    return PostScrapperHelper.extractPostLinks(ScrapperAGazetaEmpregosES.name, externalSource, html, '.item-title a')


  }

  public static crawlPageData = async (link: string, postDataOverride?) => {

    console.log(`Requesting html from link ${link}`);
    const html = await ConnectionHelper.request(link)

    const $ = cheerio.load(html);


    const title = $(`meta[property="og:title"]`).attr('content')


    let rawContent = $(`meta[property="og:description"]`).attr('content') || ""

    console.log(title);
    console.log(rawContent);

    const rawCity = await PostScrapperHelper.getCity("ES", `${title} - ${rawContent}`) || "Vitória"

    // remove html tags
    rawContent = GenericHelper.stripHtml(rawContent)


    const { sector, jobRoleBestMatch } = await PostScrapperHelper.findJobRolesAndSector(rawContent, title)


    const complementaryData = await DataExtractorHelper.extractJobData(rawContent)

    const jobData = {
      ...complementaryData,
      title,
      content: rawContent,
      externalUrl: link,
      country: "Brazil",
      source: PostSource.Blog,
      city: rawCity,
      sector,
      jobRoles: [jobRoleBestMatch],
      ...postDataOverride,
    }




    return jobData

  }






}