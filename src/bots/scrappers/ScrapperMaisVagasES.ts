import cheerio from 'cheerio';

import { PostSource } from '../../resources/Post/post.types';
import { ConnectionHelper } from '../helpers/ConnectionHelper';
import { DataExtractorHelper } from '../helpers/DataExtractorHelper';
import { PostScrapperHelper } from '../helpers/PostScrapperHelper';
import { IScrapperLink } from '../types/bots.types';


export class ScrapperMaisVagasES {

  public static postLinks: IScrapperLink[] | null = null

  public static crawlLinks = async (externalSource: string): Promise<IScrapperLink[]> => {

    console.log(`🤖: Crawling links for ${externalSource}`);

    const html = await ConnectionHelper.requestHtml(
      externalSource
    );

    return PostScrapperHelper.extractPostLinks(ScrapperMaisVagasES.name, externalSource, html, 'a.job_listing-clickbox')
  }

  public static crawlPageData = async (link: string, postDataOverride?) => {

    console.log(`Requesting html from link ${link}`);
    const html = await ConnectionHelper.requestHtml(link)

    const $ = cheerio.load(html);


    let title = $(`meta[property="og:title"]`).attr('content')

    title = title?.replace('Mais Vagas ES - ', '')

    let rawContent = PostScrapperHelper.extractContent(html, '.job_listing-description');
    rawContent = rawContent.replace('Entre em nosso canal no Telegram e receba diariamente em tempo real publicações de vagas de emprego. Clique aqui e entre agora!', '')

    const locationText = $(`.google_map_link`).text()
    const rawCity = await PostScrapperHelper.getCity("ES", locationText) || "Vitória"

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