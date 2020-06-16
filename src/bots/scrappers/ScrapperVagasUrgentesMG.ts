import cheerio from 'cheerio';

import { PostSource } from '../../resources/Post/post.types';
import { ConnectionHelper } from '../helpers/ConnectionHelper';
import { DataExtractorHelper } from '../helpers/DataExtractorHelper';
import { PostScrapperHelper } from '../helpers/PostScrapperHelper';
import { IScrapperLink } from '../types/bots.types';



export class ScrapperVagasUrgentesMG {

  public static postLinks: IScrapperLink[] | null = null

  public static crawlLinks = async (externalSource: string): Promise<IScrapperLink[]> => {

    console.log(`🤖: Crawling links for ${externalSource}`);

    const html = await ConnectionHelper.request(
      externalSource
    );

    return PostScrapperHelper.extractPostLinks(ScrapperVagasUrgentesMG.name, externalSource, html, '.post-title a')

  }

  public static crawlPageData = async (link: string, postDataOverride?) => {

    console.log(`Requesting html from link ${link}`);
    const html = await ConnectionHelper.request(link)

    const $ = cheerio.load(html);

    let title = $('.post-title').text()

    title = title.replace('Vagas Urgentes MG (DESTAQUE)', '')

    let rawContent = PostScrapperHelper.extractContent(html, '.post-body');
    rawContent = rawContent.replace(/Imprescindível[\s\S]+/g, '')
    rawContent = rawContent.replace(/Dicas do Vagas Urgentes MG[\s\S]+/g, '')

    const rawCity = await PostScrapperHelper.getCity("MG", `${title} - ${rawContent}`) || "Belo Horizonte"


    const { sector, jobRoleBestMatch } = await PostScrapperHelper.findJobRolesAndSector(rawContent, title)


    const complementaryData = await DataExtractorHelper.extractJobData(rawContent)

    let fixedEmail = complementaryData.email;
    fixedEmail = fixedEmail.replace('colocando', '')
    fixedEmail = fixedEmail.replace(',', '')

    const jobData = {
      ...complementaryData,
      title,
      email: fixedEmail,
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