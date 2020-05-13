import cheerio from 'cheerio';

import { PostSource } from '../../resources/Post/post.types';
import { GenericHelper } from '../../utils/GenericHelper';
import { ConnectionHelper } from '../helpers/ConnectionHelper';
import { DataExtractorHelper } from '../helpers/DataExtractorHelper';
import { PostScrapperHelper } from '../helpers/PostScrapperHelper';
import { IScrapperLink } from '../types/bots.types';



export class ScrapperRecrutamentoInteligenteMG {

  public static postLinks: IScrapperLink[] | null = null

  public static crawlLinks = async (externalSource: string): Promise<IScrapperLink[]> => {

    console.log(`🤖: Crawling links for ${externalSource}`);

    const html = await ConnectionHelper.requestHtml(
      externalSource
    );

    const $ = cheerio.load(html);

    const postList = $('.pagina-principal-vagas a.btn-vaga-ver-mais')

    let links: string[] = []

    postList.each(function (i, el) {
      let link = $(el).attr('href')

      if (!link?.includes('.')) { // if link does not include a dot, its probably a relative path. Lets include the root path to it
        link = externalSource.substr(0, externalSource.length - 1) + link;
      }

      if (link) {
        links = [...links, link]
      }
    })

    console.log(`🤖: ${links.length} ${ScrapperRecrutamentoInteligenteMG.name} links crawled successfully!`);
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


    const title = $('#nomeVaga h1').text().trim()

    let rawContent = $('.detalhesVagaTexto').text().trim() + $('#informacoesBasicasVagas').text().trim() || ""

    rawContent = rawContent.replace('Não encontrou nenhuma vaga? Deixe o seu CV em nosso banco de talentos.', '')
    rawContent = rawContent.replace('Outras Oportunidades', '')
    rawContent = rawContent.replace('Clique aqui', '')
    rawContent = rawContent.replace('Candidatar-se para essa vaga', '')
    rawContent = rawContent.replace(`Sobre Grupo Selpe
    Hoje há muito além do que soluções em gestão de pessoas, recrutamento e seleção. Nós acreditamos no desenvolvimento de pessoas e em um processo seletivo que seja simples, extremamente eficiente e executado com o máximo de qualidade.

Entregamos profissionais com capacidades e habilidades de evoluírem dentro das companhias, agregando valor e desenvolvendo todo o negócio de nossos clientes.

Para isso, investimos nossos esforços em adquirir e desenvolver em novas tecnologias, conquistar parcerias estratégicas e desenvolver um ambiente que permita surgir o principal: inovação. Todo este trabalho alinhado ao fato de sermos um dos pioneiros no Brasil na terceirização de serviços de Recrutamento e Seleção nos permitiram conquistar mais de 50 anos de experiência acumulada.`, '')

    rawContent = rawContent.trim()


    const rawCity = await PostScrapperHelper.getCity("MG", `${title} - ${rawContent}`) || "Belo Horizonte"

    // remove html tags
    rawContent = GenericHelper.stripHtml(rawContent)


    const { sector, jobRoleBestMatch } = await PostScrapperHelper.findJobRolesAndSector(title, rawContent)


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

    console.log(jobData);


    return jobData

  }






}