import cheerio from 'cheerio';

import { PostSource } from '../../../resources/Post/post.types';
import { GenericHelper } from '../../../utils/GenericHelper';
import { BotHelper } from '../helpers/BotHelper';
import { ConnectionHelper } from '../helpers/ConnectionHelper';
import { DataExtractorHelper } from '../helpers/DataExtractorHelper';
import { PostScrapperHelper } from '../helpers/PostScrapperHelper';
import { IScrapperLink } from '../types/bots.types';



export class ScrapperGrupoResolveSP {

  public static postLinks: IScrapperLink[] | null = null

  public static crawlLinks = async (externalSource: string): Promise<IScrapperLink[]> => {

    console.log(`🤖: Crawling links for ${externalSource}`);

    const html = await ConnectionHelper.request(
      externalSource
    );

    // ! This link fetching has some specificities and I've skipped refactoring.

    const $ = cheerio.load(html, { decodeEntities: BotHelper.fixEncoding ? false : true });

    const postList = $('a[href*=consultarvagas]')

    let links: string[] = []

    postList.each(function (i, el) {
      let link = $(el).attr('href')

      if (!link?.includes('http')) { // if link does not include a dot, its probably a relative path. Lets include the root path to it

        link = externalSource.substr(0, externalSource.length) + link;
        link = link.replace('consultarvagas_2.asp', '')
      }

      if (link) {
        links = [...links, link]
      }
    })

    console.log(`🤖: ${links.length} ${ScrapperGrupoResolveSP.name} links crawled successfully!`);
    console.log(links);

    return links.map((link) => {
      return {
        link,
        scrapped: false
      }
    });


  }

  public static crawlPageData = async (link: string, postDataOverride?) => {

    console.log(`Requesting html from link ${link}`);
    const html = await ConnectionHelper.request(link)

    const $ = cheerio.load(html);


    const title = $('table td .subtitulo').text().trim()


    let rawContent = PostScrapperHelper.extractContent(html, 'table td');


    rawContent = rawContent.replace(RegExp(`Vaga No. .+`, 'g'), "");
    rawContent = rawContent.replace('Visualizar Vaga', '')

    rawContent = rawContent.trim()


    const rawCity = await PostScrapperHelper.getCity("SP", `${title} - ${rawContent}`) || "São Paulo"

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