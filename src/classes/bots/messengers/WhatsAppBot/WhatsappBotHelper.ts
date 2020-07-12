import _ from 'lodash';

import { EnvType } from '../../../../constants/types/env.types';
import { IPostModel, Post } from '../../../../resources/Post/post.model';
import { ConsoleColor, ConsoleHelper } from '../../../../utils/ConsoleHelper';
import { GenericHelper } from '../../../../utils/GenericHelper';
import { MessengerBotHelper } from '../../helpers/MessengerBotHelper';
import { IWhatsAppGroup } from '../../types/whatsappbot.types';
import {
  defaultThumbnailBase64,
  WHATSAPP_BOT_FREE_POSTS_PER_MESSAGE,
  WHATSAPP_BOT_MINIMUM_FREE_POSTS_PER_LIST,
  WHATSAPP_BOT_PREMIUM_POSTS_PER_MESSAGE,
  whatsappAxios,
} from './whatsappbot.constants';
import { whatsAppGroups } from './whatsappGroups.constants';

export class WhatsAppBotHelper extends MessengerBotHelper {

  public static request = async (method, endpoint: string, data?: Object | null) => {

    const response = await whatsappAxios.request({
      method,
      url: `${endpoint}?token=${process.env.WHATSAPP_TOKEN}`,
      data,
    })

    return response;
  }

  private static _fetchGroupPosts = async (group: IWhatsAppGroup, qty: number, premiumOnly: boolean) => {

    let citiesQuery = {}
    let sectorQuery = {}
    let jobRolesQuery = {}

    if (group.jobRoles) {

      jobRolesQuery = {
        jobRoles: { "$in": group.jobRoles },
      }

    }


    // Filter by cities
    if (group.cities) {
      const citiesData = group.cities?.map((city) => {
        return {
          city
        }
      })

      citiesQuery = {
        $or: citiesData
      }

    }

    // Filter by sectors
    if (group.sectors) {
      const sectorData = group.sectors?.map((sector) => {
        return {
          sector
        }
      })

      sectorQuery = {
        $or: sectorData
      }
    }

    let posts = await Post.find({
      active: true,
      premiumOnly,
      stateCode: group.stateCode,
      $and: [
        jobRolesQuery,
        citiesQuery,
        sectorQuery,
      ],
      isPostedOnWhatsApp: false
    }).limit(qty).sort({ 'createdAt': 'descending' })

    posts = _.shuffle(posts)

    return posts;
  }

  private static _thumbnailPost = async (posts: IPostModel[], group: IWhatsAppGroup, dontRepeatPosts: boolean) => {

    const limitedPosts = _.slice(posts, 0, 15) // thumbnail posts are limited to 15 only!

    for (const post of limitedPosts) {

      if (post.isPostedOnWhatsApp) {
        continue;
      }

      console.log(`[${post.jobRoles[0]}/${post.sector}] - ${post.city}/${post.stateCode} => ${post.title}`);

      if (process.env.ENV === EnvType.Production) {

        const postTitle = WhatsAppBotHelper.shortPostTitle(post, 35)

        // fetch thumbnail image
        let imageBase64
        try {
          imageBase64 = await WhatsAppBotHelper.getBase64Thumbnail(`${process.env.WEB_APP_URL}/images/seo/${encodeURIComponent(post.sector)}.jpg`)
        }
        catch (error) {
          ConsoleHelper.coloredLog(ConsoleColor.BgRed, ConsoleColor.FgWhite, `🤖: Failed to fetch thumbnail image for post post ${post.slug}. Check the error below!`)
          console.error(error);
          // on error, set default thumbnail...
          imageBase64 = defaultThumbnailBase64
        }

        // submit post with generated thumbnail
        try {
          const response = await WhatsAppBotHelper.request("POST", "/sendLink", {
            chatId: group.chatId,
            title: postTitle,
            body: `${process.env.WEB_APP_URL}/posts/${post.slug}?ref=whatsapp`,
            previewBase64: `data:image/jpeg;base64,${imageBase64}`
          })

          console.log(response.data);
        }
        catch (error) {
          ConsoleHelper.coloredLog(ConsoleColor.BgRed, ConsoleColor.FgWhite, `🤖: Failed to publish post ${post.slug}. Check the error below!`)
          console.error(error);
        }


        if (dontRepeatPosts) {
          await Post.updateOne({ _id: post._id }, { isPostedOnWhatsApp: true })
        }



        // random delay between each posting interval
        await GenericHelper.sleep(1000 * (6 + _.random(10)))

      } else {
        console.log(`You're running on development. Please turn on PRODUCTION mode!`);
      }
    }

  }

  private static _listPost = async (posts: IPostModel[], group: IWhatsAppGroup, dontRepeatPosts: boolean) => {

    const listContent = await WhatsAppBotHelper.generatePostList("WHATSAPP", group.stateCode, posts, group.isPartnerGroup, dontRepeatPosts)

    console.log(listContent);


    const response = await WhatsAppBotHelper.request("POST", "/sendMessage", {
      chatId: group.chatId,
      body: listContent,
    })

    console.log(response.data);
  }

  public static postOnGroups = async () => {

    // loop through each group. We'll use the index to check if we should or not repeat posts
    for (const [i, group] of whatsAppGroups.entries()) {

      ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `🤖: WhatsApp Bot => Looking for new jobs to ${group.name}...`)

      const premiumPosts = await WhatsAppBotHelper._fetchGroupPosts(group, WHATSAPP_BOT_PREMIUM_POSTS_PER_MESSAGE, true)
      const freePosts = await WhatsAppBotHelper._fetchGroupPosts(group, WHATSAPP_BOT_FREE_POSTS_PER_MESSAGE, false)

      if (freePosts.length >= WHATSAPP_BOT_MINIMUM_FREE_POSTS_PER_LIST) { // minimum post length to submit a message...

        // start asking people to add you to contact list!
        if (!group.isPartnerGroup) {


          const n = _.random(10);


          if (n <= 2) { // 20% chance
            console.log('asking to add on list');
            const addMessages = [`📞 Ei pessoal! Por favor, me adicionem em sua lista de contatos para garantir que você recebam todas as vagas sem problemas!`, `📞 Ei gente, me adicionem em seu contato para que vocês recebam todas as vagas normalmente. Obrigado!`, `📞 Importante: me adicione em seus contatos para que vocês recebam todas as vagas sem erros.`]

            await GenericHelper.sleep(1000 * (6 + _.random(3)))

            await WhatsAppBotHelper.request("POST", "/sendMessage", {
              chatId: group.chatId,
              body: _.sample(addMessages),
            })
          }

          if ((n >= 3 && n <= 5) && !group.isPartnerGroup) {

            const randomMessages = [`💸 Quer ganhar um extra enquanto procura um emprego? Torne-se um Divulgador? Acesse: https://empregourgente.com/posts/share`, `💸 PAGAMOS para você divulgar nosso grupo do WhatsApp em redes sociais. Saiba mais em https://empregourgente.com/posts/share`]


            await GenericHelper.sleep(1000 * 6 + _.random(3))

            await WhatsAppBotHelper.request("POST", "/sendMessage", {
              chatId: group.chatId,
              body: _.sample(randomMessages),
            })
          }
          if ((n >= 5 && n <= 10) && !group.isPartnerGroup) {

            const randomMessages = [`💸 Quer ganhar R$20? Use meu link de indicação para abrir uma conta grátis no PagBank pelo celular. Faça uma recarga de celular ou pague uma conta, e pronto! ;D
            https://indicapagbank.page.link/HmvD8ZiehE6fRLzT8`, `💸 Quer receber R$20? Use meu link abaixo para abrir uma conta grátis no PagBank pelo celular. Faça uma recarga de celular ou pague uma conta, e pronto!
            https://indicapagbank.page.link/HmvD8ZiehE6fRLzT8`]


            await GenericHelper.sleep(1000 * 6 + _.random(3))

            await WhatsAppBotHelper.request("POST", "/sendMessage", {
              chatId: group.chatId,
              body: _.sample(randomMessages),
            })
          }


          if ((n >= 3 && n <= 7) && !group.isPartnerGroup && !group.isNicheGroup) { // 50% chance

            const subgroupLink = `https://bitly.com/emprego-urgente-${group.stateCode.toLowerCase()}`

            const randomMessages = [`🔔 Quer receber apenas notificações de vagas da *SUA ÁREA*? Acesse nossos subgrupos: ${subgroupLink}`, `🔔 Cansado(a) de tantas notificações de vagas fora da sua área? Acesse nossos subgrupos: ${subgroupLink}`, `🔔 Pessoal, entre em nossos *subgrupos divididos por área profissional* clicando aqui: ${subgroupLink}. Dessa forma vocês receberão notificações de oportunidades relevantes. `]


            await GenericHelper.sleep(1000 * 6 + _.random(3))

            await WhatsAppBotHelper.request("POST", "/sendMessage", {
              chatId: group.chatId,
              body: _.sample(randomMessages),
            })


          }



        }

        // if its a leaf group, dont repeat posts
        // if its last group, do not repeat posts!
        // if next group is from another state, lets set a variable telling our bot to do not post this post again
        const dontRepeatPosts = group.isLeaf || (i === whatsAppGroups.length - 1) ? true : (group.stateCode !== whatsAppGroups[i + 1].stateCode)

        const allPosts = _.shuffle([...freePosts, ...premiumPosts])

        // await WhatsAppBotHelper._listPost(allPosts, group, dontRepeatPosts);

        if (!group.isPartnerGroup) {
          await WhatsAppBotHelper._thumbnailPost(allPosts, group, dontRepeatPosts);
        } else {
          await WhatsAppBotHelper._listPost(allPosts, group, dontRepeatPosts);
        }

      } else {
        console.log('No new jobs found...');
      }

      // if (!group.isPartnerGroup) {
      //   await WhatsAppBotHelper._thumbnailPost(posts, group);
      // } else {
      //   await WhatsAppBotHelper._listPost(posts, group);
      // }



      await GenericHelper.sleep(1000 * (6 + _.random(10)))
    }
    ConsoleHelper.coloredLog(ConsoleColor.BgGreen, ConsoleColor.FgWhite, '🤖: Finished posting on WhatsApp Groups!')





  }



}