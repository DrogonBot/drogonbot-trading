import cheerio from 'cheerio';
import htmlToText from 'html-to-text';
import stringSimilarity from 'string-similarity';

import { Place } from '../../resources/Place/place.model';
import { Post } from '../../resources/Post/post.model';
import { IPost, ISimilarityMatch } from '../../resources/Post/post.types';
import { Sector } from '../../resources/Sector/sector.model';
import { ISector } from '../../resources/Sector/sector.types';
import { GenericHelper } from '../../utils/GenericHelper';
import { IBestMatchAndSector } from '../types/bots.types';
import { BotHelper } from './BotHelper';


export class PostScrapperHelper {

  public static checkForBannedWords = (content: string) => {

    const bannedWords = ['sóci', 'procuro emprego', 'procuro vaga', 'renda extra', 'marketing multinível', 'grátis', 'compro', 'vendo', 'extra', 'trabalhar em casa', 'digitador', 'preciso de um emprego', 'divulgador', 'divulga', 'divulgação', 'ganhe dinheiro', "desempregado", "mim ajuda", "me ajuda", "pdf", "baixe", "grátis", "multinível", "divulgando", "divulgar", "trabalhe de casa", "procura-se emprego", "meu nome", "patrão", "indicar pessoas", "trabalhe em casa", "sem dinheiro", "desempregada", "preço", "sem sair de casa", "liberdade financeira", "reais por dia", "grupo de emprego", "bem-vindo", "boas-vindas", "mensalidade de", "procuro trabalho", "preciso muito de trabalhar", "culto", "tik tok", "como ganhar dinheiro", "Grátis", "afiliados", "Bem-vindos", "sóc", "chat.whatsapp", "infoproduto", "marketing digital", "zcu.io", "igvagas", "chat.whatsapp.com", "grupo de vagas", "empregourgente.com", "telegram", "99660-9099", "tiktok", "grupo de whatsapp", "api.whatsapp.com", "atacado", "DONO DO SEU PRÓPRIO NEGÓCIO", "empregossaopauloeregioes", "https://linkme.bio/empregossp7/", "compra do kit de produtos", "grupo do whatsapp", "proprio lar", "https://rpst.page.link", "vendedor online", "vendas online", "empreendedor", "polishop", "/groups/", "encomenda", "sociedade", "investidor", "investimento", "agrega", "https://linkme.bio/empregossp7/", "< OPORTUNIDADE >", "seja seu chefe", "negócio próprio", "parceria", "agrego", "PRÓPRIO NEGÓCIO", "casa de show", "corpo inteiro", "boite", "strip", "(11)986464981", "https://vagasempregourgente.com", "pegasustransportesbr@gmail.com", "apenas um celular", "gratuito", "gratuita", "ganhar dinheiro", "candidatos692@gmail.com", "< OPORTUNIDADE >", "Oportunidade", "wa.me", "rebrand.ly", "hotmart", "a procura", "faço", "Ofereço", "Presto serviço", "orçamento", "canecas", "personalizadas", "992723650"]

    const lowerCaseContent = content.toLowerCase();

    for (const word of bannedWords) {


      const bannedKeywordFound = new RegExp(`\\b${word}\\b`, 'gi').test(lowerCaseContent)

      if (bannedKeywordFound) {
        console.log(`Forbidden word found: ${word}`);
        return word
      }
    }

    return false;
  }

  public static isPostInvalid = async (post: IPost) => {
    const existentPosts = await Post.find({ content: post.content, active: true })

    if (existentPosts.length >= 1) {
      console.log(`🤖: Skipping because this post already exists! => ${post.title}`)
      return true
    }


    const bannedWord = PostScrapperHelper.checkForBannedWords(post.content) || PostScrapperHelper.checkForBannedWords(post.title)
    if (bannedWord) {
      console.log(`🤖: ${post.title} Skipping scrapping! This post contains a forbidden word: ${bannedWord}.`)
      return true
    }


    // if (post.content && post.content.length <= 70) {
    //   console.log(`🤖: Skipping because post description is too short (${post.content.length} characters only)! Maybe its not a post!`)
    //   return true
    // }


    if (!post.email && !post.phone && !post.externalUrl) {
      console.log(`🤖: Skipping! No email, phone or external url found for post ${post.title}`)
      return true
    }

    return false
  }


  public static getTitle = (post): string => {
    try {
      return post.split('\n')[0] || post.split('\n\n')[0]
    }
    catch (error) {
      return ""
    }
  }

  public static extractPostLinks = (scrapperName: string, externalSource: string, sourceHtml: string, selector: string,) => {

    const $ = cheerio.load(sourceHtml, { decodeEntities: BotHelper.fixEncoding ? false : true });

    const postList = $(selector)



    let links: string[] = []

    const externalSourceUrl = new URL(externalSource)
    const rootUrl = externalSourceUrl.origin;

    postList.each(function (i, el) {
      const link = $(el).prop('href')

      if (link[0] === "/") { // if it starts with a /, then its a relative path!, we must add the rootUrl to it...

        links = [
          ...links,
          `${rootUrl}${link}`
        ]
      } else {
        // if its already an absolute path, just add it
        links = [
          ...links,
          `${link}`
        ]
      }

    })

    console.log(`🤖: ${links.length} ${scrapperName} links crawled successfully!`);
    console.log(links);

    return links.map((link) => {
      return {
        link,
        scrapped: false
      }
    });
  }

  public static extractContent = (sourceHtml: string, selector: string) => {

    const $ = cheerio.load(sourceHtml);

    let content = $(selector).html() || $(selector).text()
    // parse html to text
    content = htmlToText.fromString(content, {
      wordwrap: null,
      ignoreHref: true,
      noLinkBrackets: true,
      ignoreImage: true
    })
    content = content.trim()

    return content
  }


  public static getProvinceAndCity = async (content, postDataOverride) => {

    if (content.includes('/')) {
      content = content.replace('/', ' ')
    }


    try {
      const places = await Place.find({})

      for (const place of places) {

        // loop until we find the matching stateCode
        const stateCodeFound = new RegExp(`\\b${place.stateCode}\\b`, 'gi').test(content)


        if (stateCodeFound) {

          // once we find this stateCode, search for the city
          // Here we test every city against our post content. If we find it, then that's because this post is probably associated with it
          for (const city of place.cities) {

            const cityFound = new RegExp(`\\b${city.cityName}*\\b`, 'gi').test(content)

            if (cityFound) {

              return {
                city: city.cityName,
                stateCode: place.stateCode
              };
            }

          }
        }


      }

      // if no stateCode is found, lets use the postDataOverride one
      console.log('using postDataOverride...');

      const inferedPlaces = await Place.findOne({ stateCode: postDataOverride.stateCode })

      for (const city of inferedPlaces!.cities) {
        const cityFound = new RegExp(`\\b${city.cityName}\\b`, 'gi').test(content)
        if (cityFound) {
          return {
            city: city.cityName,
            stateCode: postDataOverride.stateCode
          };
        }
      }

      // if nothing is found, default to post data override
      return { stateCode: postDataOverride.stateCode, city: postDataOverride.city }




    }
    catch (error) {
      console.error(error);
      return { stateCode: postDataOverride.stateCode, city: postDataOverride.city }
    }

  }

  public static getCity = async (stateCode, content) => {

    try {
      const place = await Place.findOne({ stateCode })

      if (!place) {
        return false;
      }
      // Here we test every city against our post content. If we find it, then that's because this post is probably associated with it
      for (const city of place.cities) {
        const cityFound = new RegExp(city.cityName, 'gi').test(content)

        if (cityFound) {
          return city.cityName;
        }
        continue;
      }
      // if nothing is found
      return false;
    }
    catch (error) {
      console.error(error);

    }


  }

  private static _getSector = async (jobRole) => {

    // now, based on the jobRoleBestMatch, lets find which sector does this position belongs too

    try {
      console.log(`Getting sector for [${jobRole}]...`);
      // Find job role with something similar ("LIKE"), no case sensitive
      const sector = await Sector.findOne({ keywords: { "$in": [new RegExp(`.*${jobRole}.*`, "i")] } })
      if (sector) {
        console.log(`Getting sector for [${jobRole}] => ${sector.name}`);
        return sector.name
      } else {
        console.log(`Couldn't the sector for ${jobRole}!`);
      }
    }
    catch (error) {
      console.log(`Couldn't the sector for ${jobRole}!`);
      return "Outros"
    }

    return "Outros"
  }

  private static _tryRoleMatch = async (title: string, content: string, keywords: string[]): Promise<IBestMatchAndSector> => {

    try {
      const lowerCaseKeywords = keywords.map((keyword) => keyword.toLowerCase())

      // first, replace \n with spaces

      content = content.replace(new RegExp('\n', 'g'), " ");

      if (title) {
        console.log(`Title: ${title}`);
        title = title.replace(new RegExp('\n', 'g'), " ");
        // tries exact title match
        for (const keyword of keywords) {

          const titleMatchExact = new RegExp(`\\b${keyword}\\b`, 'gi').test(title)
          if (titleMatchExact) {
            const keywordSector = await PostScrapperHelper._getSector(keyword);
            console.log(`Title EXACT match: [${keyword}]`);

            return {
              jobRoleBestMatch: keyword,
              sector: keywordSector
            }
          }
        }

        // Try through similarity on title only
        const similarTitle: ISimilarityMatch = stringSimilarity.findBestMatch(title.toLowerCase(), lowerCaseKeywords).bestMatch;
        console.log(similarTitle);
        if (similarTitle.rating >= 0.4) {
          console.log('SIMILAR TITLE');
          console.log(`${title} => ${similarTitle.target}`);
          const sectorKeyword = await PostScrapperHelper._getSector(similarTitle.target);
          console.log(`Title SIMILARITY match: [${similarTitle.target}] of ${Math.floor(similarTitle.rating * 100)}%`);
          return {
            jobRoleBestMatch: similarTitle.target,
            sector: sectorKeyword
          }
        }
      }



      // exact content match
      for (const keyword of keywords) {
        const contentMatchExact = new RegExp(`\\b${keyword}\\b`, 'gi').test(content)
        if (contentMatchExact) {
          const keywordSector = await PostScrapperHelper._getSector(keyword);
          console.log(`Content EXACT match: [${keyword}]`);
          return {
            jobRoleBestMatch: keyword,
            sector: keywordSector
          }
        }
      }


      console.log(`NO MATCH: [Outros]`);
      const sector = await PostScrapperHelper._getSector("Outros");
      return {
        jobRoleBestMatch: "Outros",
        sector
      }
    }
    catch (error) {
      console.error(error);
      console.log(`ERROR MATCH: [Outros]`);
      const sector = await PostScrapperHelper._getSector("Outros");
      return {
        jobRoleBestMatch: "Outros",
        sector
      }
    }

  }

  public static findJobRolesAndSector = async (content, title?): Promise<IBestMatchAndSector> => {


    const sectorsData = await Sector.find({})
    const sectorRolesRaw = sectorsData.map((sectorEl: ISector) => sectorEl.keywords)
    const jobRoles = GenericHelper.arrayFlatten(sectorRolesRaw)

    const result = await PostScrapperHelper._tryRoleMatch(title, content, jobRoles)

    return result;



  }






}