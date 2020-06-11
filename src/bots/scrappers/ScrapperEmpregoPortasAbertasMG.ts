import cheerio from 'cheerio';

import { PostSource } from '../../resources/Post/post.types';
import { GenericHelper } from '../../utils/GenericHelper';
import { ConnectionHelper } from '../helpers/ConnectionHelper';
import { DataExtractorHelper } from '../helpers/DataExtractorHelper';
import { PostScrapperHelper } from '../helpers/PostScrapperHelper';
import { IScrapperLink } from '../types/bots.types';


export class ScrapperEmpregoPortasAbertasMG {

  public static postLinks: IScrapperLink[] | null = null

  public static crawlLinks = async (externalSource: string): Promise<IScrapperLink[]> => {

    console.log(`🤖: Crawling links for ${externalSource}`);

    const html = await ConnectionHelper.requestHtml(
      externalSource
    );

    return PostScrapperHelper.extractPostLinks(ScrapperEmpregoPortasAbertasMG.name, externalSource, html, '.post a[href*="/p/"]')

  }

  public static crawlPageData = async (link: string, postDataOverride?) => {

    console.log(`Requesting html from link ${link}`);
    const html = await ConnectionHelper.requestHtml(link)

    const $ = cheerio.load(html);


    const title = $(`.post-title.entry-title`).text()


    let rawContent = PostScrapperHelper.extractContent(html, '.post-body');



    rawContent = rawContent.replace('Esta e outras vagas confira no nosso site: www.empregoportasabertas.com', '')
    rawContent = rawContent.replace('Vagas adicionadas diariamente', '')

    console.log(title);
    console.log(rawContent);

    const rawCity = await PostScrapperHelper.getCity("MG", `${title} ${rawContent}`) || "Belo Horizonte"

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