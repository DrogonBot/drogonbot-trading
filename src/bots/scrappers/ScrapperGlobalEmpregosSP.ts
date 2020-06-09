import cheerio from 'cheerio';

import { PostSource } from '../../resources/Post/post.types';
import { BotHelper } from '../helpers/BotHelper';
import { ConnectionHelper } from '../helpers/ConnectionHelper';
import { DataExtractorHelper } from '../helpers/DataExtractorHelper';
import { PostScrapperHelper } from '../helpers/PostScrapperHelper';
import { IScrapperLink } from '../types/bots.types';



export class ScrapperGlobalEmpregosSP {

  public static postLinks: IScrapperLink[] | null = null

  public static crawlLinks = async (externalSource: string): Promise<IScrapperLink[]> => {

    console.log(`🤖: Crawling links for ${externalSource}`);

    const html = await ConnectionHelper.requestHtml(
      externalSource
    );

    const $ = cheerio.load(html, { decodeEntities: BotHelper.fixEncoding ? false : true });

    const postList = $('a.botao-detalhes')

    let links: string[] = []

    postList.each(function (i, el) {
      let link = $(el).attr('href')

      if (!link?.includes('http')) { // if link does not include a dot, its probably a relative path. Lets include the root path to it
        link = externalSource.substr(0, externalSource.length - 1) + link;
      }

      if (link) {
        links = [...links, link]
      }
    })

    console.log(`🤖: ${links.length} ${ScrapperGlobalEmpregosSP.name} links crawled successfully!`);
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
    const html = await ConnectionHelper.requestHtml(link)

    const $ = cheerio.load(html);


    let title = $('h1.panel-title').text().trim()

    title = title.replace(RegExp(`Oportunidade .+ -`, 'g'), "");
    title = title.replace('Global', '')

    const rawContent = PostScrapperHelper.extractContent(html, '.container-fluid.bloco');

    const rawCity = await PostScrapperHelper.getCity("SP", $('#CIDADE').text()) || "São Paulo"

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