import cheerio from 'cheerio';

import { Post } from '../../resources/Post/post.model';
import { User } from '../../resources/User/user.model';
import { GenericHelper } from '../../utils/GenericHelper';
import { DataExtractorHelper } from '../helpers/DataExtractorHelper';
import { ScrapperHelper } from '../helpers/ScrapperHelper';


export class ScrapperESOlx {

  public static proxyList;
  public static chosenProxy;

  public static init = async () => {

    console.log(`🤖: Initializing ScrapperESOlx`);

    const proxyList = await ScrapperHelper.fetchProxyList();

    ScrapperESOlx.proxyList = proxyList;
    ScrapperESOlx.chosenProxy = ScrapperHelper.rotateProxy(ScrapperESOlx.proxyList);


    // First step, try getting the target links ========================================




    // const links = await ScrapperESOlx.crawlLinks(chosenProxy);
    const links = await ScrapperHelper.tryRequestUntilSucceeds(ScrapperESOlx.crawlLinks)

    const owner = await User.findOne({ email: process.env.ADMIN_EMAIL })

    for (const link of links) {
      await GenericHelper.sleep(10000)

      // check if link wasn't already scrapped!
      const postFound = await Post.find({ externalUrl: link })

      if (postFound.length >= 1) {
        console.log(`🤖: Hmm... This post is already scrapped! Skipping...`);
        continue
      }


      try {
        console.log(`🤖: Scrapping data from ...${link}`);

        const postData = await ScrapperHelper.tryRequestUntilSucceeds(ScrapperESOlx.crawlPageData, [link])

        if (owner) {
          const newPost = new Post({ ...postData, owner: owner._id })
          newPost.save()
          console.log(`🤖: New post saved into database!`);
        } else {
          console.log(`🤖: User with e-mail ${process.env.ADMIN_EMAIL} not found! It's necessary for saving our posts!`)
          console.log(`🤖: Failed to scrap data from ${link}!`)
        }

      }
      catch (error) {
        console.log(`🤖: Failed to scrap data from ${link}!`)
        console.log(error);
      }
    }




  };



  public static crawlLinks = async (): Promise<string[]> => {

    console.log('🤖: Fetching crawling links...');




    const html = await ScrapperHelper.crawlHtml(
      'https://es.olx.com.br/vagas-de-emprego',
      ScrapperESOlx.chosenProxy
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


    const html = await ScrapperHelper.crawlHtml(link, ScrapperESOlx.chosenProxy)


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