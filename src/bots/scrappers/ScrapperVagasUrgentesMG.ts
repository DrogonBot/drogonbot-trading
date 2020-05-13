import cheerio from 'cheerio';

import { PostSource } from '../../resources/Post/post.types';
import { GenericHelper } from '../../utils/GenericHelper';
import { ConnectionHelper } from '../helpers/ConnectionHelper';
import { DataExtractorHelper } from '../helpers/DataExtractorHelper';
import { PostScrapperHelper } from '../helpers/PostScrapperHelper';
import { IScrapperLink } from '../types/bots.types';



export class ScrapperVagasUrgentesMG {

  public static postLinks: IScrapperLink[] | null = null

  public static crawlLinks = async (externalSource: string): Promise<IScrapperLink[]> => {

    console.log(`🤖: Crawling links for ${externalSource}`);

    const html = await ConnectionHelper.requestHtml(
      externalSource
    );

    const $ = cheerio.load(html);

    const postList = $('.post-title a')

    let links: string[] = []

    postList.each(function (i, el) {
      const link = $(el).attr('href')
      if (link) {
        links = [...links, link]
      }
    })

    console.log(`🤖: ${links.length} ${ScrapperVagasUrgentesMG.name} links crawled successfully!`);
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


    let title = $('.post-title').text()

    title = title.replace('Vagas Urgentes MG (DESTAQUE)', '')


    let rawContent = $('.post-body').text() || ""

    rawContent = rawContent.replace('(adsbygoogle = window.adsbygoogle || []).push({});', '')
    rawContent = rawContent.replace('Twitter', '')
    rawContent = rawContent.replace('Facebook', '')
    rawContent = rawContent.replace('Comentar vaga', '')
    rawContent = rawContent.replace(RegExp(`Cadastrada às .+`, 'g'), "");
    rawContent = rawContent.replace('Imprescindível mencionar no assunto o nome da vaga + Vagas Urgentes MG.', '')
    rawContent = rawContent.replace('Seja o primeiro a curtir e tenha mais chances! ', '')
    rawContent = rawContent.replace('Dicas do Vagas Urgentes MG para conseguir sua vaga de emprego:', '')
    rawContent = rawContent.replace('Melhore suas chances de conseguir esta vagaFaça um curso online', '')
    rawContent = rawContent.replace('- Esta pode ser a vaga de emprego urgente da sua vida, por isso leia a vaga com toda atenção e envie seu currículo para o endereço descrito no texto.', '')
    rawContent = rawContent.replace(`- Leia toda a vaga e só envie seu cv se realmente estiver dentro do perfil solicitado pela empresa
- No final da vaga você sempre vai achar a forma de contato com a empresa que está divulgando a vaga
- Não distribua indiscriminadamente seu currículo, copie e cole no corpo do e-mail quando achar que a vaga vale a pena. Só envie seu currículo se realmente a vaga te interessar
- Só envie seu currículo em anexo se for solicitado claramente pela empresa
- Seu cv é um documento, seja honesto e claro nas informações. Não coloque informações de documentos nele
- Revise o cv, corrija qualquer erro ortográfico, verifique se as informações de contato estão claras e logo no início. Não esqueça de informar seu nome.
- Caso você não seja qualificado para a vaga que deseja, tente se qualificar, indicamos os:
Cursos 24 horas São cursos reconhecidos pelo MEC, online e com ótimos preços.
- Informe no assunto do e-mail o nome da vaga + o nome do site Vagas Urgentes MG
- Não retiramos as vagas do site, por isso verifique a data da vaga antes de enviar seu currículo
- O site Vagas Urgentes (VG URG) não divulga e  nem cadastra currículos, não cobramos para você ter acesso as vagas. Nós indicamos um afiliado - Manager - caso você queira cadastrar e divulgar seu cv
- O site Vagas Urgentes MG só divulga as vagas, qualquer informação além da descrita, por favor, entre em contato com diretamente com a empresa pela forma de contato fornecida na vaga. Boa sorte!`, '')
    rawContent = rawContent.replace(`Dicas do Vagas Urgentes MG  para conseguir sua vaga de emprego:
- Esta pode ser a vaga de emprego urgente da sua vida, por  isso leia a vaga com toda atenção e envie seu currículo  para o endereço descrito no texto.
- Leia toda a vaga e só envie seu cv se realmente  estiver dentro do perfil solicitado pela empresa
- No final da vaga você sempre vai achar a forma de  contato com a empresa que está divulgando a vaga
- Não distribua indiscriminadamente seu  currículo, copie e cole no corpo do e-mail quando achar que a vaga vale a  pena. Só envie seu currículo se realmente a vaga te  interessar
-  Só envie seu currículo em anexo se for solicitado claramente pela  empresa
- Seu  currículo é um documento, seja honesto e claro nas  informações. Não coloque informações de  documentos nele
- Revise o  cv, corrija qualquer erro ortográfico, verifique se as  informações de contato estão claras e logo no  início. Não esqueça de informar seu nome.
- Caso você não  seja qualificado para a vaga que deseja, tente se qualificar, indicamos  os: Cursos 24  horas São cursos reconhecidos  pelo MEC, online e com ótimos preços.
- Informe no assunto do e-mail o nome da vaga + o nome do  site Vagas Urgentes MG
-  Não retiramos as vagas do site, por isso verifique a data da vaga antes  de enviar seu currículo- Não recebemos  e nem fazemos cadastro de cv's

- O site Vagas Urgentes MG só divulga as vagas,  qualquer informação além da descrita, por favor, entre em  contato com diretamente com a empresa pela forma de contato fornecida na vaga.  Boa sorte!
`, '')
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


    return jobData

  }






}