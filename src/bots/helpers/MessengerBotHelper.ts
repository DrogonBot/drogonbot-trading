import axios from 'axios';
import _ from 'lodash';
import sharp from 'sharp';

import { IPostModel, Post } from './../../resources/Post/post.model';


export class MessengerBotHelper {

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

  public static shortPostTitle = (title: string, maxLength: number, useEmoji: boolean, sector?: string) => {


    if (useEmoji && sector) {
      return title.length >= maxLength ? `${MessengerBotHelper._getSectorEmoji(sector)} *${title.substr(0, maxLength)}...*` : `${MessengerBotHelper._getSectorEmoji(sector)} *${title}*`
    } else {
      return title.length >= maxLength ? `*${title.substr(0, maxLength)}...*` : `*${title}*`
    }


  }

  public static generatePostList = async (platform: "WHATSAPP" | "TELEGRAM", stateCode: string, posts: IPostModel[], isPartnerGroup: boolean = false, dontRepeatPosts: boolean) => {

    const premiumPosts = _.slice(posts.filter((post) => post.premiumOnly), 0, 4) // max 3 posts only
    const freePosts = posts.filter(post => !post.premiumOnly)

    const inviteOrJoinGroupText = isPartnerGroup ? `👉 Mais vagas? Acesse nossos grupos: https://bit.ly/emprego-urgente-${stateCode.toLowerCase()}` : `✌ Convide amigos! https://bit.ly/emprego-urgente-${stateCode.toLowerCase()}`

    const dontRepeatPostsQuery = (platform === "WHATSAPP" ? { isPostedOnWhatsApp: true } : { isPostedOnTelegram: true })

    // ! PARTNER GROUP POSTING! SHOULD GENERATE A LIST ONLY
    const allPostsLength = premiumPosts.length + freePosts.length
    let listContent = `⚠ *${allPostsLength} Nova${allPostsLength > 1 ? `s` : ''} Vaga${allPostsLength > 1 ? `s` : ''} - ${stateCode}* ⚠ \n${inviteOrJoinGroupText}\n\n`

    if (premiumPosts.length > 0) {
      // list of premium posts
      listContent += `🌟 *Vagas para ASSINANTES* 🌟\nMais info.: https://empregourgente.com/payment\n\n`

      for (const premiumPost of premiumPosts) {
        listContent += `- ${MessengerBotHelper.shortPostTitle(premiumPost.title, 30, false)}: ${process.env.WEB_APP_URL}/posts/${premiumPost.slug}?ref=whatsapp\n\n`
        if (dontRepeatPosts) {
          await Post.updateOne({ _id: premiumPost._id }, dontRepeatPostsQuery)
        }
      }
    }



    if (freePosts.length > 0) {
      // list free posts
      listContent += `✨ *Vagas 100% Gratuitas* ✨\n\n`

      for (const freePost of freePosts) {

        listContent += `- ${MessengerBotHelper.shortPostTitle(freePost.title, 30, false)}: ${process.env.WEB_APP_URL}/posts/${freePost.slug}?ref=whatsapp\n\n`

        if (dontRepeatPosts) {
          await Post.updateOne({ _id: freePost._id }, dontRepeatPostsQuery)
        }
      }
    }

    if (posts.length >= 3) {
      listContent += `\n${inviteOrJoinGroupText}`
    }

    return listContent

  }
}