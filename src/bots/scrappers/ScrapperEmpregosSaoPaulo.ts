import cheerio from 'cheerio';

import { PostSource } from '../../resources/Post/post.types';
import { GenericHelper } from '../../utils/GenericHelper';
import { ConnectionHelper } from '../helpers/ConnectionHelper';
import { DataExtractorHelper } from '../helpers/DataExtractorHelper';
import { PostScrapperHelper } from '../helpers/PostScrapperHelper';
import { IScrapperLink } from '../types/bots.types';



export class ScrapperEmpregosSaoPaulo {

  public static postLinks: IScrapperLink[] | null = null

  public static crawlLinks = async (externalSource: string): Promise<IScrapperLink[]> => {

    console.log(`🤖: Crawling links for ${externalSource}`);

    const html = await ConnectionHelper.requestHtml(
      externalSource
    );

    const $ = cheerio.load(html);

    const postList = $('.more-link')

    let links: string[] = []

    postList.each(function (i, el) {
      const link = $(el).attr('href')
      if (link) {
        links = [...links, link]
      }
    })

    console.log(`🤖: ${links.length} ${ScrapperEmpregosSaoPaulo.name} links crawled successfully!`);
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


    const title = $('meta[property="og:title"]').attr('content')

    let rawContent = $('meta[property="og:description"]').attr('content') || ""

    const rawCity = await PostScrapperHelper.getCity("SP", `${title} - ${rawContent}`) || "São Paulo"

    // remove html tags
    rawContent = GenericHelper.stripHtml(rawContent)

    const { sector, jobRoleBestMatch } = await PostScrapperHelper.findJobRolesAndSector(rawContent, title)

    rawContent = rawContent.replace(new RegExp('\n', 'g'), " ");

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