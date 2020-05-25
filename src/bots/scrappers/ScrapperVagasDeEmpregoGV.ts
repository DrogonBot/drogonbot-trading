import cheerio from 'cheerio';

import { PostSource } from '../../resources/Post/post.types';
import { GenericHelper } from '../../utils/GenericHelper';
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

    const $ = cheerio.load(html);

    const postList = $('h2.entry-title a')

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

    console.log(`🤖: ${links.length} ${ScrapperVagasDeEmpregoGV.name} links crawled successfully!`);
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


    let title = $(`meta[property="og:title"]`).attr('content')

    title = title?.replace(' - Vagas de Emprego GV', '')

    let rawContent = ""

    $('.entry-inner p').each(function (i, p) {
      const element = $(p)

      rawContent += element.text() + '\n'
    });
    rawContent = rawContent.replace(new RegExp('VAGAS DE EMPREGO GV: IMPORTANTE.', 'g'), "");
    rawContent = rawContent.replace(new RegExp('É importante que o envio do currículo seja feito apenas se o candidato realmente estiver dentro do perfil exigido pela empresa ou instituição.', 'g'), "");
    rawContent = rawContent.replace(new RegExp('Duvide de qualquer cobrança vinda em razão de alguma oportunidade anunciada.', 'g'), "");
    rawContent = rawContent.replace(new RegExp('O site Vagas de Emprego GV é totalmente gratuito, portanto, não cobramos nenhum valor ou qualquer tipo de taxa dos candidatos às vagas aqui divulgadas e nem das empresas que encaminham vagas para divulgação.', 'g'), "");
    rawContent = rawContent.replace(new RegExp('Leia com atenção todas as informações da(s) vaga(s) antes mesmo de se candidatar.', 'g'), "");
    rawContent = rawContent.replace(new RegExp('O site Vagas de Emprego GV apenas divulga as oportunidades. Não temos responsabilidade com as vagas postadas, não recebemos nem cadastramos currículos, tampouco participamos de qualquer fase do processo de recrutamento e seleção.', 'g'), "");
    rawContent = rawContent.replace(new RegExp('Todas as informações aqui existentes foram reproduzidas do site e/ou redes sociais da empresa e estão públicas na Internet.', 'g'), "");
    rawContent = rawContent.replace(new RegExp('O site Vagas de Emprego GV é totalmente gratuito, portanto, não cobramos nenhum valor ou qualquer tipo de taxa dos candidatos às vagas aqui divulgadas.', 'g'), "");
    rawContent = rawContent.replace(new RegExp('Todas as informações aqui existentes foram reproduzidas do site e/ou redes sociais da instituição e estão públicas na Internet.', 'g'), "");
    rawContent = rawContent.replace(new RegExp('Vagas de Emprego GV', 'g'), "Emprego Urgente");
    rawContent = rawContent.trim()


    const rawCity = await PostScrapperHelper.getCity("ES", `${title} - ${rawContent}`) || "Vitória"

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