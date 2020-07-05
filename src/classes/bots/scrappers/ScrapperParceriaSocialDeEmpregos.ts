import cheerio from 'cheerio';

import { PostSource } from '../../../resources/Post/post.types';
import { ConnectionHelper } from '../helpers/ConnectionHelper';
import { DataExtractorHelper } from '../helpers/DataExtractorHelper';
import { PostScrapperHelper } from '../helpers/PostScrapperHelper';
import { IScrapperLink } from '../types/bots.types';



export class ScrapperParceriaSocialDeEmpregos {

  public static postLinks: IScrapperLink[] | null = null

  public static crawlLinks = async (externalSource: string): Promise<IScrapperLink[]> => {

    console.log(`🤖: Crawling links for ${externalSource}`);

    const html = await ConnectionHelper.request(
      externalSource
    );

    return PostScrapperHelper.extractPostLinks(ScrapperParceriaSocialDeEmpregos.name, externalSource, html, '.entry-title a')
  }

  public static crawlPageData = async (link: string, postDataOverride?) => {

    console.log(`Requesting html from link ${link}`);
    const html = await ConnectionHelper.request(link)

    const $ = cheerio.load(html);


    const title = $('h1.entry-title').text()

    let rawContent = PostScrapperHelper.extractContent(html, '.entry-content');
    rawContent = rawContent.replace(/AUTOR[\s\S]+/gim, '')
    rawContent = rawContent.replace('(adsbygoogle = window.adsbygoogle || []).push({});', '')

    const rawCity = await PostScrapperHelper.getCity("SP", `${title} - ${rawContent}`) || "São Paulo"

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