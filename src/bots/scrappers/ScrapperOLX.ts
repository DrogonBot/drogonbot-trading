import cheerio from 'cheerio';

import { PostSource } from '../../resources/Post/post.types';
import { GenericHelper } from '../../utils/GenericHelper';
import { ConnectionHelper } from '../helpers/ConnectionHelper';
import { DataExtractorHelper } from '../helpers/DataExtractorHelper';
import { PostScrapperHelper } from '../helpers/PostScrapperHelper';
import { IScrapperLink } from '../types/bots.types';



export class ScrapperOLX {

  public static postLinks: IScrapperLink[] | null = null

  public static crawlLinks = async (externalSource: string): Promise<IScrapperLink[]> => {

    console.log(`🤖: Crawling links for ${externalSource}`);

    const html = await ConnectionHelper.requestHtml(
      externalSource
    );

    const $ = cheerio.load(html);

    const postList = $('a[data-lurker-detail="list_id"]')

    let links: string[] = []

    postList.each(function (i, el) {
      const link = $(el).attr('href')
      if (link) {
        links = [...links, link]
      }
    })

    console.log(`🤖: ${links.length} OLX Links crawled successfully!`);
    console.log(links);

    return links.map((link) => {
      return {
        link,
        scrapped: false
      }
    });


  }

  public static crawlPageData = async (link: string, postDataOverride?) => {

    const html = await ConnectionHelper.requestHtml(link)

    const $ = cheerio.load(html);

    const title = $('[class="h3us20-5 heHIon"] h1').text()
    const zipCode = $('[class="h3us20-2 fMOiyI"] [data-testid="ad-properties"] div:first-child div dd').text()
    const neighborhood = $('[class="h3us20-2 fMOiyI"] [data-testid="ad-properties"] div:last-child div dd').text()
    const rawCity = $('[class="h3us20-2 fMOiyI"] [data-testid="ad-properties"] div:nth-child(2) div dd').text()
    let rawContent = $('meta[name="twitter:description"]').attr('content') || ""

    // remove html tags
    rawContent = GenericHelper.stripHtml(rawContent)


    const { sector, jobRoleBestMatch } = await PostScrapperHelper.findJobRolesAndSector(title, rawContent)

    rawContent = rawContent.replace(new RegExp('\n', 'g'), " ");

    const complementaryData = await DataExtractorHelper.extractJobData(rawContent)

    const jobData = {
      ...complementaryData,
      title,
      content: rawContent,
      externalUrl: link,
      country: "Brazil",
      source: PostSource.OLX,
      city: rawCity,
      zipCode,
      neighborhood,
      sector,
      jobRoles: [jobRoleBestMatch],
      ...postDataOverride,
    }



    return jobData




  }






}