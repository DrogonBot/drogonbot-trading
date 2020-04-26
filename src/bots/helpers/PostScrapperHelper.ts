import stringSimilarity from 'string-similarity';

import { AccountEmailManager } from '../../emails/account.email';
import { ILeadModel } from '../../resources/Lead/lead.model';
import { Post } from '../../resources/Post/post.model';
import { IPost } from '../../resources/Post/post.types';
import { Sector } from '../../resources/Sector/sector.model';
import { ISector } from '../../resources/Sector/sector.types';
import { IUser, User } from '../../resources/User/user.model';
import { GenericHelper } from '../../utils/GenericHelper';
import { LanguageHelper } from '../../utils/LanguageHelper';
import { PushNotificationHelper } from '../../utils/PushNotificationHelper';
import { IBestMatchAndSector } from '../types/bots.types';



export class PostScrapperHelper {

  public static checkForBannedWords = (content: string) => {

    const bannedWords = ['procuro emprego', 'procuro vaga', 'renda extra', 'marketing multinível', 'grátis', 'compro', 'vendo', 'extra', 'trabalhar em casa', 'home office', 'digitador', 'preciso de um emprego', 'divulgador', 'ganhe dinheiro', "desempregado", "curso de", "mim ajuda", "me ajuda", "pdf", "baixe", "orçamento", "grátis", "multinível", "divulgando", "divulgar", "trabalhe de casa", "procura-se emprego", "meu nome", "patrão", "indicar pessoas", "trabalhe em casa", "sem dinheiro", "desempregada", "preço", "sem sair de casa", "liberdade financeira", "reais por dia", "grupo de emprego", "bem-vindo", "boas-vindas", "mensalidade de", "procuro trabalho", "preciso muito de trabalhar", "culto", "tik tok", "como ganhar dinheiro", "Grátis", "cursos", "afiliados", "Bem-vindos", "sócio", "chat.whatsapp", "infoproduto", "marketing digital", "curso", "home office", "zcu.io", "igvagas", "chat.whatsapp.com", "agazetaempregos"]

    const lowerCaseContent = content.toLowerCase();

    for (const word of bannedWords) {


      const bannedKeywordFound = new RegExp(word, 'gi').test(lowerCaseContent)

      if (bannedKeywordFound) {
        console.log(`Forbidden word found: ${word}`);
        return word
      }
    }

    return false;
  }

  public static isPostInvalid = async (post: IPost) => {
    const existentPosts = await Post.find({ content: post.content })

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

  private static _tryRoleMatch = async (sectors, content, title?) => {
    for (const role of sectors) {

      if (title) {
        const preparedTitle = title.replace('\n', ' ').toLowerCase()
        const verifyTitle1 = preparedTitle.includes(` ${role.toLowerCase()}`)
        const verifyTitle2 = preparedTitle.includes(` ${role.toLowerCase()} `)
        if (verifyTitle1 || verifyTitle2) {

          const sectorData = await PostScrapperHelper.getSector(role)
          return {
            jobRoleBestMatch: role,
            sector: sectorData
          }
        }

      }

      const preparedContent = content.replace('\n', ' ').toLowerCase()
      const verifyContent1 = preparedContent.includes(` ${role.toLowerCase()}`)
      const verifyContent2 = preparedContent.includes(` ${role.toLowerCase()} `)

      if (verifyContent1 || verifyContent2) {

        const sectorData = await PostScrapperHelper.getSector(role)
        return {
          jobRoleBestMatch: role,
          sector: sectorData
        }
      }
    }
    return false
  }

  public static findJobRolesAndSector = async (content, title?): Promise<IBestMatchAndSector> => {
    let bestMatchOverall;

    const sectorsData = await Sector.find({})
    const sectorRolesRaw = sectorsData.map((sectorEl: ISector) => sectorEl.keywords)
    const sectors = GenericHelper.arrayFlatten(sectorRolesRaw)

    try {
      // First step: Let's try a full match

      const roleMatch = await PostScrapperHelper._tryRoleMatch(sectors, content, title)
      if (roleMatch) {
        return roleMatch // if we got a match, just stop the script execution
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

  public static notifyUsersEmail = async (user: IUser | ILeadModel, post: IPost) => {

    const accountEmailManager = new AccountEmailManager();

    await accountEmailManager.postEmailNotification(
      user.email,
      LanguageHelper.getLanguageString('post', 'jobsNotificationSubject', { jobRole: post.jobRoles[0] }),
      "comment-notification", {
      jobsNotificationFirstPhrase: LanguageHelper.getLanguageString('post', 'jobsNotificationFirstPhrase', { userName: user.name }),
      jobsNotificationSecondParagraph: LanguageHelper.getLanguageString('post', 'jobsNotificationSecondParagraph'),
      jobsNotificationClosing: LanguageHelper.getLanguageString('post', 'jobsNotificationClosing'),

      postSummary: `
      ${post.title}
      <br />
      <br />
      <td align="center" style="word-break: break-word; font-family: &quot;Nunito Sans&quot;, Helvetica, Arial, sans-serif; font-size: 16px;">
                                    <a href="https://vagasempregourgente.com/posts/${post.slug}" class="f-fallback button" target="_blank" style="color: #FFF; border-color: #3869d4; border-style: solid; border-width: 10px 18px; background-color: #3869D4; display: inline-block; text-decoration: none; border-radius: 3px; box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16); -webkit-text-size-adjust: none; box-sizing: border-box;">${LanguageHelper.getLanguageString('post', 'jobsNotificationPostCTA')}</a>
                                  </td>
      `
    }
    );

  }

  public static notifyUsersPushNotification = async (post: IPost) => {

    const jobRole = post.jobRoles[0] // on this situation, the post only have 1 jobRole (was just added)

    try {
      // find users that have a particular jobRole
      const users = await User.find({ genericPositionsOfInterest: { "$in": [jobRole] } })


      for (const user of users) {

        console.log(`🤖 Push notification: Warning user ${user.email} about the post [${jobRole}] - ${post.title}`);

        // then send a push notification to them, with this post
        const owner = await User.findOne({
          _id: post?.owner
        })

        await PushNotificationHelper.sendPush([user.pushToken], {
          sound: "default",
          body: LanguageHelper.getLanguageString('post', 'postNotification', {
            jobRole
          }),
          data: {
            toScreen: "IndividualFeed",
            params: {
              // @ts-ignore
              post,
              user: owner
            }
          }
        })
      }



    }
    catch (error) {
      console.error(error);

    }







  }


}