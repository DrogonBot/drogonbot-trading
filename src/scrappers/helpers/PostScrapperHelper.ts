import stringSimilarity from 'string-similarity';

import { IPost, Post } from '../../resources/Post/post.model';
import { ISector, Sector } from '../../resources/Sector/sector.model';
import { GenericHelper } from '../../utils/GenericHelper';
import { IBestMatchAndSector } from './ScrapperHelper';


export class PostScrapperHelper {

  private static _checkForBannedWords = (content: string) => {

    const bannedWords = ['renda extra', 'marketing multinível', 'grátis', 'compro', 'vendo', 'extra', 'trabalhar em casa', 'home office', 'digitador']

    const lowerContent = content.toLowerCase();

    for (const word of bannedWords) {
      if (lowerContent.includes(word.toLowerCase())) {
        return true
      }
    }

    return false;
  }

  public static isPostInvalid = async (post: IPost) => {
    const existentPosts = await Post.find({
      $or: [{ title: post.title }, { content: post.content }, { externalUrl: post.externalUrl }]
    })

    if (existentPosts.length >= 1) {
      console.log(`🤖: Skipping because this post already exists!`)
      return true
    }


    // if (PostScrapperHelper._checkForBannedWords(post.content)) {
    //   console.log(`🤖: Skipping scrapping! This post contains a forbidden word.`)
    //   return true
    // }


    if (post.content && post.content.length <= 70) {
      console.log(`🤖: Skipping because post description is too short! Maybe its not a post!`)
      return true
    }


    if (!post.email && !post.phone && !post.externalUrl) {
      console.log(`🤖: Skipping! No email, phone or external url found for post ${post.title}`)
      return true
    }
  }


  public static getTitle = (post): string => {
    try {
      return post.split('\n')[0]
    }
    catch (error) {
      return ""
    }
  }

  private static getSector = async (jobRole) => {
    // now, based on the jobRoleBestMatch, lets find which sector does this position belongs too
    try {
      const sector = await Sector.findOne({ keywords: { "$in": [jobRole] } })
      if (sector) {
        return sector.name
      }
    }
    catch (error) {
      console.log(`Couldn't the sector for ${jobRole}!`);
      return "Outros"
    }

    return "Outros"
  }

  public static findJobRolesAndSector = async (content, title?): Promise<IBestMatchAndSector> => {
    let bestMatchOverall;

    const sectorsData = await Sector.find({})
    const sectorRolesRaw = sectorsData.map((sectorEl: ISector) => sectorEl.keywords)
    const sectors = GenericHelper.arrayFlatten(sectorRolesRaw)

    try {
      // First step: Let's try a full match

      for (const role of sectors) {
        if (content.replace('\n', ' ').toLowerCase().includes(` ${role.toLowerCase()}`)) {

          console.log('ROLE MATCH');
          console.log(role);

          const sectorData = await PostScrapperHelper.getSector(role)
          return {
            jobRoleBestMatch: role,
            sector: sectorData
          }
        }
      }
      // Second step: If a full match is not possible, let's analyze the post content
      const uppercaseMatches = content.match(/[A-Z]+\W/g) ? content.match(/[A-Z]+\W/g).join(' ').toLowerCase() : [];

      const bestTitleMatches = title ? stringSimilarity.findBestMatch(title, sectors).bestMatch : []
      const bestContentMatches = stringSimilarity.findBestMatch(content, sectors).bestMatch
      const bestUppercaseMatches = (uppercaseMatches.length >= 1 ? stringSimilarity.findBestMatch(uppercaseMatches, sectors).bestMatch : [])   // sometimes companies leave the position name in uppercase


      const bestMatches = [bestTitleMatches, bestContentMatches, bestUppercaseMatches].sort((x, y) => x.rating > y.rating ? -1 : 1).filter((match) => {
        if (match.target) { // we do this to avoid empty matches
          return match
        }
      });



      bestMatchOverall = bestMatches[0].target

    }
    catch (error) {
      // if not found, throw an error
      console.log(error);
      throw new Error('Position not found!')
    }

    const sector = await PostScrapperHelper.getSector(bestMatchOverall)

    return {
      jobRoleBestMatch: bestMatchOverall,
      sector
    }
  }


}