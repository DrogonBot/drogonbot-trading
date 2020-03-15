import cheerio from 'cheerio';

import { GenericHelper } from '../../utils/GenericHelper';
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

    const html = await ConnectionHelper.requestHtml(link, ScrapperHelper.chosenProxy)

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