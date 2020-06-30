import axios from 'axios';
import _ from 'lodash';
import sharp from 'sharp';

import { EnvType } from '../../constants/types/env.types';
import { Post } from '../../resources/Post/post.model';
import { ConsoleColor, ConsoleHelper } from '../ConsoleHelper';
import { GenericHelper } from '../GenericHelper';
import { IPostModel } from './../../resources/Post/post.model';
import { defaultThumbnailBase64, whatsappAxios } from './whatsappbot.constants';
import { IWhatsAppGroup } from './whatsappbot.types';
import { whatsAppGroups } from './whatsappGroups.constants';

export class WhatsAppBotHelper {

  public static request = async (method, endpoint: string, data?: Object | null) => {

    const response = await whatsappAxios.request({
      method,
      url: `${endpoint}?token=${process.env.WHATSAPP_TOKEN}`,
      data,
    })

    return response;
  }

  public static getBase64Thumbnail = async (url: string) => {


    console.log(url);

    const response = await axios
      .get(url, {
        responseType: 'arraybuffer'
      })

    const imageBuffer = Buffer.from(response.data, 'binary')

    const resizedImage = await sharp(imageBuffer).resize(150, 150).toBuffer();

    return resizedImage.toString('base64')

  }

  private static _fetchGroupPosts = async (group: IWhatsAppGroup, qty: number) => {

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
      stateCode: group.stateCode,
      $and: [
        jobRolesQuery,
        citiesQuery,
        sectorQuery,
        { $or: [{ isPostedOnWhatsApp: { $exists: false } }, { isPostedOnWhatsApp: { $exists: true, $eq: false } }] }
      ]
    }).limit(qty).sort({ 'createdAt': 'descending' })

    posts = _.shuffle(posts)

    return posts;
  }

  private static _shortPostTitle = (title: string, maxLength: number, sector: string) => {
    return title.length >= maxLength ? `${WhatsAppBotHelper._getSectorEmoji(sector)} *${title.substr(0, maxLength)}...*` : `${WhatsAppBotHelper._getSectorEmoji(sector)} *${title}*`
  }

  private static _getSectorEmoji = (sector: string) => {

    switch (sector) {
      case "Atendimento ao cliente":
        return "💁🏼"
      case "Administração":
        return "🏢"
      case "Advocacia & Direito":
        return "⚖️"
      case "Agricultura":
        return "🐄"
      case "Alimentação & Restaurantes":
        return "🍛"
      case "Arquitetura":
        return "🏛️"
      case "Artes Cênicas":
        return "🎭"
      case "Artes Plásticas":
        return "🎨"
      case "Astronomia":
        return "🚀"
      case "Biblioteconomia":
        return "📚"
      case "Beleza & Estética":
        return "💅🏻"
      case "Ciências Aeronáuticas":
        return "✈️";
      case "Ciências Biológicas, Oceanografia":
        return "🐸"
      case "Finanças, Ciências Contábeis, Estatística e Matemática":
        return "📊"
      case "Ciências Econômicas":
        return "🏦"
      case "Ciências Sociais":
      case "Serviço Social":
        return "👐"
      case "Cinema e Vídeo":
        return "🎥"
      case "Comércio Exterior & Relações Públicas":
        return "🚢"
      case "Comunicação & Marketing":
        return "📺"
      case "TI, Tecnologia da Informação":
        return "🤓"
      case "Dança":
        return "🕺"
      case "Decoração":
        return "🏵️"
      case "Indústria, Offshore e Metalurgia":
      case "Desenho Industrial":
        return "🏭"
      case "Design":
        return "🐦"
      case "Educação Física":
        return "🏋️"
      case "Construção Civil":
      case "Engenharia":
        return "🏗️"
      case "Farmácia":
        return "💉"
      case "Filosofia":
        return "🏛️"
      case "Física":
        return "⚛️"
      case "Fotografia":
        return "📷"
      case "Hotelaria & Turismo":
        return "🛌"
      case "Letras & Lingüística":
      case "Jornalismo & Produtor de Conteúdo":
        return "📝"
      case "Logística, Transporte e Operações":
        return "🛣️"
      case "Veterinária":
        return "🐕"
      case "Moda & Indústria Têxtil":
        return "👜"
      case "Pedagogia":
        return "👶"
      case "RH & Recursos Humanos":
        return "👔"
      case "Saúde & Cuidados":
        return "👩‍⚕️"
      case "Segurança & Patrimônio":
        return "👮"
      case "Vendas & Comércio":
        return "💰"
      case "Limpeza":
        return "🧹"
      default:
        return "💼"
    }



  }

  private static _thumbnailPost = async (posts: IPostModel[], group: IWhatsAppGroup) => {

    const limitedPosts = _.slice(posts, 0, 15) // thumbnail posts are limited to 15 only!

    for (const post of limitedPosts) {

      if (post.isPostedOnWhatsApp) {
        continue;
      }

      console.log(`[${post.jobRoles[0]}/${post.sector}] - ${post.city}/${post.stateCode} => ${post.title}`);

      if (process.env.ENV === EnvType.Production) {

        const postTitle = WhatsAppBotHelper._shortPostTitle(post.title, 35, post.sector)

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

        if (group.isEndOfLineage) {
          post.isPostedOnWhatsApp = true;
          await post.save();
        }

        // random delay between each posting interval
        await GenericHelper.sleep(1000 * (6 + _.random(10)))

      }
    }

  }

  private static _listPost = async (posts: IPostModel[], group: IWhatsAppGroup, dontRepeatPosts: boolean) => {


    const inviteOrJoinGroupText = group.isPartnerGroup ? `👉 Mais vagas? Acesse nossos grupos: https://bit.ly/emprego-urgente-${group.stateCode.toLowerCase()}` : `✌ Convide amigos! https://bit.ly/emprego-urgente-${group.stateCode.toLowerCase()}`


    // ! PARTNER GROUP POSTING! SHOULD GENERATE A LIST ONLY
    let listContent = `⚠ *${posts.length} Nova${posts.length > 1 ? `s` : ''} Vaga${posts.length > 1 ? `s` : ''} - ${group.stateCode}* ⚠ \n${inviteOrJoinGroupText}\n\n`

    for (const post of posts) {

      if (post.isPostedOnWhatsApp) {
        continue;
      }



      listContent += `${WhatsAppBotHelper._shortPostTitle(post.title, 30, post.sector)}: ${process.env.WEB_APP_URL}/posts/${post.slug}\n\n`

      if (dontRepeatPosts) {
        await Post.updateOne({ _id: post._id }, { isPostedOnWhatsApp: true })
      }
    }

    listContent += `\n${inviteOrJoinGroupText}`

    console.log(listContent);

    const response = await WhatsAppBotHelper.request("POST", "/sendMessage", {
      chatId: group.chatId,
      body: listContent,
    })

    console.log(response.data);
  }


  // ! MAIN FUNCION
  public static postOnGroups = async () => {

    // loop through each group
    for (const [i, group] of whatsAppGroups.entries()) {

      ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `🤖: WhatsApp Bot => Looking for new jobs to ${group.name}...`)



      const posts = await WhatsAppBotHelper._fetchGroupPosts(group, 15)


      if (posts.length > 0) { // minimum post length to submit a message...

        // start asking people to add you to contact list!


        if (!group.isPartnerGroup) {
          const n = _.random(10);

          if (n <= 3) { // 30% chance

            const addMessages = [`📞 Ei pessoal! Por favor, me adicionem em sua lista de contatos para garantir que você recebam todas as vagas sem problemas!`, `📞 Ei gente, me adicionem em seu contato para que vocês recebam todas as vagas normalmente. Obrigada!`, `📞 Importante: me adicione em seus contatos para que vocês recebam todas as vagas sem erros.`]

            await GenericHelper.sleep(1000 * (6 + _.random(3)))

            await WhatsAppBotHelper.request("POST", "/sendMessage", {
              chatId: group.chatId,
              body: _.sample(addMessages),
            })
          }
        }

        // if its last group, do not repeat posts!
        // if next group is from another state, lets set a variable telling our bot to do not post this post again
        const dontRepeatPosts = (i === whatsAppGroups.length - 1) ? true : (group.stateCode !== whatsAppGroups[i + 1].stateCode)

        await WhatsAppBotHelper._listPost(posts, group, dontRepeatPosts);
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