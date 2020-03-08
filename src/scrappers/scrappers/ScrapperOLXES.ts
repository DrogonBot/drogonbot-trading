import cheerio from 'cheerio';

import { DataExtractorHelper } from '../helpers/DataExtractorHelper';
import { ScrapperHelper } from '../helpers/ScrapperHelper';


export class ScrapperOLXES {


  public static crawlLinks = async (): Promise<string[]> => {

    console.log('🤖: Fetching crawling links...');




    const html = await ScrapperHelper.crawlHtml(
      'https://es.olx.com.br/vagas-de-emprego',
      ScrapperHelper.chosenProxy
    );

    const $ = cheerio.load(html);

    const postList = $('.OLXad-list-link ')

    let links: string[] = []

    postList.each(function (i, el) {
      const link = $(el).attr('href')
      if (link) {
        links = [...links, link]
      }
    })

    console.log('🤖: Links scrawled successfully!');
    console.log(links);

    return links;


  }

  public static crawlPageData = async (link: string) => {

    // const html = await ScrapperHelper.loadLocalHtml('../data/olx_auxiliar_servicos_gerais.html');


    const html = await ScrapperHelper.crawlHtml(link, ScrapperHelper.chosenProxy)


    const $ = cheerio.load(html);

    const title = $('[class="h3us20-5 heHIon"] h1').text()
    const zipCode = $('[class="h3us20-2 fMOiyI"] [data-testid="ad-properties"] div:first-child div dd').text()
    const neighborhood = $('[class="h3us20-2 fMOiyI"] [data-testid="ad-properties"] div:last-child div dd').text()
    const rawCity = $('[class="h3us20-2 fMOiyI"] [data-testid="ad-properties"] div:nth-child(2) div dd').text()
    let rawContent = $('[class="sc-bZQynM eEEnMS"]').text()


    const { sector, jobRoleBestMatch } = await ScrapperHelper.findJobRolesAndSector(title, rawContent)

    // Remove garbage content
    rawContent = rawContent.replace('Fique atento com excessos de facilidades e desconfie de ofertas milagrosas.Cuidado com ofertas de emprego que solicitam o pagamento de uma taxa.Faça uma pesquisa sobre a empresa que está oferecendo a vaga.Fique atento com excessos de facilidades e desconfie de ofertas milagrosas.Cuidado com ofertas de emprego que solicitam o pagamento de uma taxa.', '')

    const complementaryData = DataExtractorHelper.extractJobData(rawContent)

    return {
      ...complementaryData,
      title,
      content: rawContent,
      externalUrl: link,
      zipCode,
      country: "Brazil",
      stateCode: "ES",
      city: rawCity || "Vitória",
      neighborhood,
      sector: sector.name,
      jobRoles: [jobRoleBestMatch],

    }




  }






}