import cheerio from 'cheerio';

import { PostSource } from '../../resources/Post/post.types';
import { ConnectionHelper } from '../helpers/ConnectionHelper';
import { DataExtractorHelper } from '../helpers/DataExtractorHelper';
import { PostScrapperHelper } from '../helpers/PostScrapperHelper';
import { IScrapperLink } from '../types/bots.types';


export class ScrapperEmpregoSP {

  public static postLinks: IScrapperLink[] | null = null

  public static crawlLinks = async (externalSource: string): Promise<IScrapperLink[]> => {

    console.log(`🤖: Crawling links for ${externalSource}`);

    const html = await ConnectionHelper.request(
      externalSource
    );

    return PostScrapperHelper.extractPostLinks(ScrapperEmpregoSP.name, externalSource, html, '.more-link a')
  }

  public static crawlPageData = async (link: string, postDataOverride?) => {

    console.log(`Requesting html from link ${link}`);
    const html = await ConnectionHelper.request(link)

    const $ = cheerio.load(html);


    const title = $(`.post-title`).text()

    let rawContent = PostScrapperHelper.extractContent(html, '.post-body');
    rawContent = rawContent.replace(/Aten[\s\S\n]+todos candidatos./igm, '')



    let locationText;
    try {
      locationText = rawContent.match(/Local de Trabalho: .+\n/g)![0];
    }
    catch (error) {
      console.error(error);
      locationText = "São Paulo";
    }




    const rawCity = await PostScrapperHelper.getCity("SP", locationText) || "São Paulo"

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
      city: rawCity,
    }

    return jobData

  }






}