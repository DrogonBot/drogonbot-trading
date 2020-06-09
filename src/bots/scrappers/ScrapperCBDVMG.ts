import cheerio from 'cheerio';

import { PostSource } from '../../resources/Post/post.types';
import { GenericHelper } from '../../utils/GenericHelper';
import { ConnectionHelper } from '../helpers/ConnectionHelper';
import { DataExtractorHelper } from '../helpers/DataExtractorHelper';
import { PostScrapperHelper } from '../helpers/PostScrapperHelper';
import { IScrapperLink } from '../types/bots.types';



export class ScrapperCBDVMG {

  public static postLinks: IScrapperLink[] | null = null

  public static crawlLinks = async (externalSource: string): Promise<IScrapperLink[]> => {

    console.log(`🤖: Crawling links for ${externalSource}`);

    const html = await ConnectionHelper.requestHtml(
      externalSource
    );

    const $ = cheerio.load(html);

    const postList = $('.readmore a')

    let links: string[] = []

    postList.each(function (i, el) {
      const link = $(el).attr('href')
      if (link) {
        links = [...links, link]
      }
    })

    console.log(`🤖: ${links.length} ${ScrapperCBDVMG.name} links crawled successfully!`);
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


    const title = $('.entry-title').text()



    let rawContent = PostScrapperHelper.extractContent(html, '.entry-content');

    rawContent = rawContent.replace(new RegExp('(adsbygoogle = window.adsbygoogle || []).push({});', 'g'), "");
    rawContent = rawContent.replace('** As empresas enviam as vagas pra CBDV através do formulário. Elas são responsáveis pela vaga **', '')
    rawContent = rawContent.replace(`Se você conhecer alguém que se encaixe nesse perfil, compartilhe para ele. Vamos ajudar o máximo de pessoas que conseguirmos. Lembre se: Tudo que vai volta… – Vagas Urgentes BH –`, '')

    rawContent = rawContent.trim()


    const rawCity = await PostScrapperHelper.getCity("MG", `${title} - ${rawContent}`) || "Belo Horizonte"

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