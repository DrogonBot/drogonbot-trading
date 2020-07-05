import axios from 'axios';
import sharp from 'sharp';

import { IPostModel, Post } from '../../../resources/Post/post.model';
import { IPost } from '../../../resources/Post/post.types';


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

  public static shortPostTitle = (post: IPost, maxLength: number): string => {

    const { title, premiumOnly, sector } = post

    let titleString = ""

    if (premiumOnly) {
      titleString += `🌟 *[P/ ASSINANTES]* `
    } else {
      titleString += `${MessengerBotHelper._getSectorEmoji(sector)} `
    }

    if (title.length >= maxLength) {
      titleString += `*${title.substr(0, maxLength)}...:* `
    } else {
      titleString += `*${title}*`
    }

    return titleString
  }

  public static generatePostList = async (platform: "WHATSAPP" | "TELEGRAM", stateCode: string, posts: IPostModel[], isPartnerGroup: boolean = false, dontRepeatPosts: boolean) => {


    const inviteOrJoinGroupText = isPartnerGroup ? `👉 Mais vagas? Acesse nossos grupos: https://bit.ly/emprego-urgente-${stateCode.toLowerCase()}` : `✌ Convide amigos! https://bit.ly/emprego-urgente-${stateCode.toLowerCase()}`

    const dontRepeatPostsQuery = (platform === "WHATSAPP" ? { isPostedOnWhatsApp: true } : { isPostedOnTelegram: true })

    // ! PARTNER GROUP POSTING! SHOULD GENERATE A LIST ONLY

    let listContent = `⚠ *${posts.length} Nova${posts.length > 1 ? `s` : ''} Vaga${posts.length > 1 ? `s` : ''} - ${stateCode}* ⚠ \n${inviteOrJoinGroupText}\n\n`

    if (posts.length > 0) {

      for (const post of posts) {

        listContent += `${MessengerBotHelper.shortPostTitle(post, 30)}: ${process.env.WEB_APP_URL}/posts/${post.slug}?ref=whatsapp\n\n`

        if (dontRepeatPosts) {
          await Post.updateOne({ _id: post._id }, dontRepeatPostsQuery)
        }
      }
    }

    if (posts.length >= 3) {
      listContent += `\n${inviteOrJoinGroupText}`
    }

    return listContent

  }
}