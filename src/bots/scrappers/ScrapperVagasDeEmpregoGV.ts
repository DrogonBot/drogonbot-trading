import cheerio from 'cheerio';

import { PostSource } from '../../resources/Post/post.types';
import { ConnectionHelper } from '../helpers/ConnectionHelper';
import { DataExtractorHelper } from '../helpers/DataExtractorHelper';
import { PostScrapperHelper } from '../helpers/PostScrapperHelper';
import { IScrapperLink } from '../types/bots.types';


export class ScrapperVagasDeEmpregoGV {

  public static postLinks: IScrapperLink[] | null = null

  public static crawlLinks = async (externalSource: string): Promise<IScrapperLink[]> => {

    console.log(`🤖: Crawling links for ${externalSource}`);

    const html = await ConnectionHelper.requestHtml(
      externalSource
    );

    return PostScrapperHelper.extractPostLinks(ScrapperVagasDeEmpregoGV.name, externalSource, html, 'h2.entry-title a')


  }

  public static crawlPageData = async (link: string, postDataOverride?) => {

    console.log(`Requesting html from link ${link}`);
    const html = await ConnectionHelper.requestHtml(link)

    const $ = cheerio.load(html);

    let title = $(`meta[property="og:title"]`).attr('content')
    title = title?.replace(' - Vagas de Emprego GV', '')

    let rawContent = PostScrapperHelper.extractContent(html, '.entry-inner');
    rawContent = rawContent.replace(/VAGAS DE EMPREGO GV: IMPORTANTE[\s\S]+/g, '')

    const rawCity = await PostScrapperHelper.getCity("ES", `${title} - ${rawContent}`) || "Vitória"

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