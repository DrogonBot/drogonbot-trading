import cheerio from 'cheerio';

import { PostSource } from '../../resources/Post/post.types';
import { ConnectionHelper } from '../helpers/ConnectionHelper';
import { DataExtractorHelper } from '../helpers/DataExtractorHelper';
import { PostScrapperHelper } from '../helpers/PostScrapperHelper';
import { IScrapperLink } from '../types/bots.types';


export class ScrapperEmpregosES {

  public static postLinks: IScrapperLink[] | null = null

  public static crawlLinks = async (externalSource: string): Promise<IScrapperLink[]> => {

    console.log(`🤖: Crawling links for ${externalSource}`);

    const html = await ConnectionHelper.requestHtml(
      externalSource
    );

    const $ = cheerio.load(html);

    const postList = $('a.more-link') // it should be a list with "a" elements

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

    console.log(`🤖: ${links.length} ${ScrapperEmpregosES.name} links crawled successfully!`);
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

    const title = $(`meta[property="og:title"]`).attr('content')

    let rawContent = PostScrapperHelper.extractContent(html, '.entry');

    rawContent = rawContent.replace('• VAGAS EM PRIMEIRA MÃO, PARTICIPE DOS NOSSOS GRUPOS. ', '')
    rawContent = rawContent.replace('TELEGRAM: https://t.me/joinchat/LqDO-RT4lp5sbW8EjRW9kQ', '')
    rawContent = rawContent.replace('WHATSAPP: https://chat.whatsapp.com/HjZRLmc9J893PLvFdNBc19', '')
    rawContent = rawContent.replace('INSTAGRAM: https://www.instagram.com/empregosnoes/', '')
    rawContent = rawContent.replace(/CONFIRA AS VAGAS RECENTES COMPARTILHAR[\s\S]+/g, '')

    const rawCity = await PostScrapperHelper.getCity("ES", `${title} ${rawContent}`) || "Vitória"

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