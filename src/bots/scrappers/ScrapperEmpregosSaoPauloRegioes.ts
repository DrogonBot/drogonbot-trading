import cheerio from 'cheerio';

import { PostSource } from '../../resources/Post/post.types';
import { GenericHelper } from '../../utils/GenericHelper';
import { ConnectionHelper } from '../helpers/ConnectionHelper';
import { DataExtractorHelper } from '../helpers/DataExtractorHelper';
import { PostScrapperHelper } from '../helpers/PostScrapperHelper';
import { IScrapperLink } from '../types/bots.types';



export class ScrapperEmpregosSaoPauloRegioes {

  public static postLinks: IScrapperLink[] | null = null

  public static crawlLinks = async (externalSource: string): Promise<IScrapperLink[]> => {

    console.log(`🤖: Crawling links for ${externalSource}`);

    const html = await ConnectionHelper.requestHtml(
      externalSource
    );

    const $ = cheerio.load(html);

    const postList = $('.post-bottom a[title]')

    let links: string[] = []

    postList.each(function (i, el) {
      const link = $(el).attr('href')
      if (link) {
        links = [...links, link]
      }
    })

    console.log(`🤖: ${links.length} ${ScrapperEmpregosSaoPauloRegioes.name} links crawled successfully!`);
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


    let title = $('h2').text()

    title = title.replace('SeguidoresBlog Archive', '')

    let rawContent = $('.post-body').text() || ""

    const rawCity = await PostScrapperHelper.getCity("SP", `${title} - ${rawContent}`) || "São Paulo"

    // remove html tags
    rawContent = GenericHelper.stripHtml(rawContent)

    rawContent = rawContent.replace('(adsbygoogle = window.adsbygoogle || []).push({});', '')

    const { sector, jobRoleBestMatch } = await PostScrapperHelper.findJobRolesAndSector(title, rawContent)

    rawContent = rawContent.replace(new RegExp('\n', 'g'), " ");

    const complementaryData = await DataExtractorHelper.extractJobData(rawContent)

    rawContent = rawContent.replace('     Não perca a oportunidade,sua vida vai ser muito melhor com novo emprego Ideal, permita mudanças e largue na frente cadastrando e enviando seu currículo em nosso site Vagas de Empregos São Paulo e Regiões,temos as melhores vagas tanto no site quanto em grupos de whatsapp,facebook ou telegram entre e conquiste seu futuro com um novo emprego,nossas vagas são postadas diariamente totalmente grátis. Leia atentamente os anuncio antes de cadastrar ou enviar seu currículo.    ', '')


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