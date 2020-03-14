import cheerio from 'cheerio';

import { ConnectionHelper } from '../helpers/ConnectionHelper';
import { DataExtractorHelper } from '../helpers/DataExtractorHelper';
import { PostScrapperHelper } from '../helpers/PostScrapperHelper';
import { ScrapperHelper } from '../helpers/ScrapperHelper';

export class ScrapperOLX {

  public static crawlLinks = async (externalSource: string): Promise<string[]> => {

    console.log(`🤖: Fetching crawling links for ${externalSource}`);


    const html = await ConnectionHelper.requestHtml(
      externalSource,
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

  public static crawlPageData = async (link: string, postDataOverride?) => {

    // const html = await ScrapperHelper.loadLocalHtml('../data/olx_auxiliar_servicos_gerais.html');

    const html = await ConnectionHelper.requestHtml(link, ScrapperHelper.chosenProxy)


    const $ = cheerio.load(html);

    const title = $('[class="h3us20-5 heHIon"] h1').text()
    const zipCode = $('[class="h3us20-2 fMOiyI"] [data-testid="ad-properties"] div:first-child div dd').text()
    const neighborhood = $('[class="h3us20-2 fMOiyI"] [data-testid="ad-properties"] div:last-child div dd').text()
    const rawCity = $('[class="h3us20-2 fMOiyI"] [data-testid="ad-properties"] div:nth-child(2) div dd').text()
    let rawContent = $('[class="sc-bZQynM eEEnMS"]').text()


    const { sector, jobRoleBestMatch } = await PostScrapperHelper.findJobRolesAndSector(title, rawContent)

    // Remove garbage content
    rawContent = rawContent.replace('Fique atento com excessos de facilidades e desconfie de ofertas milagrosas.Cuidado com ofertas de emprego que solicitam o pagamento de uma taxa.Faça uma pesquisa sobre a empresa que está oferecendo a vaga.Fique atento com excessos de facilidades e desconfie de ofertas milagrosas.Cuidado com ofertas de emprego que solicitam o pagamento de uma taxa.', '')

    const complementaryData = DataExtractorHelper.extractJobData(rawContent)

    return {
      ...complementaryData,
      ...postDataOverride,
      title,
      content: rawContent,
      externalUrl: link,
      zipCode,
      neighborhood,
      sector,
      jobRoles: [jobRoleBestMatch],
    }




  }






}