import _ from 'lodash';

import { EnvType } from '../../../../constants/types/env.types';
import { IPostModel, Post } from '../../../../resources/Post/post.model';
import { ConsoleColor, ConsoleHelper } from '../../../../utils/ConsoleHelper';
import { GenericHelper } from '../../../../utils/GenericHelper';
import { IChatChannel } from '../../types/whatsappbot.types';
import { ChatBotFather } from '../ChatBotFather';
import { TelegramChatBot } from '../TelegramBot/TelegramChatBot';
import {
  defaultThumbnailBase64,
  WHATSAPP_BOT_FREE_POSTS_PER_MESSAGE,
  WHATSAPP_BOT_MINIMUM_FREE_POSTS_PER_LIST,
  WHATSAPP_BOT_PREMIUM_POSTS_PER_MESSAGE,
  whatsappAxios,
} from './whatsappchatbot.constant';
import { whatsAppGroups } from './whatsappGroups.constant';

export class WhatsAppChatBot extends ChatBotFather {

  constructor() {
    super()
  }

  public request = async (method, endpoint: string, data?: Object | null) => {

    const response = await whatsappAxios.request({
      method,
      url: `${endpoint}?token=${process.env.WHATSAPP_TOKEN}`,
      data,
    })

    return response;
  }

  private _postLinkThumbnail = async (imagePath: string, chatId: string, messageTitle: string, messageBody: string) => {
    // fetch thumbnail image
    let imageBase64
    try {
      imageBase64 = await this.getBase64Thumbnail(imagePath)
    }
    catch (error) {
      ConsoleHelper.coloredLog(ConsoleColor.BgRed, ConsoleColor.FgWhite, `🤖: Failed to fetch thumbnail image. Check the error below!`)
      console.error(error);
      // on error, set default thumbnail...
      imageBase64 = defaultThumbnailBase64
    }


    // submit post with generated thumbnail
    try {
      const response = await this.request("POST", "/sendLink", {
        chatId,
        title: messageTitle,
        body: messageBody,
        previewBase64: `data:image/jpeg;base64,${imageBase64}`
      })

      console.log(response.data);

      // random delay between each posting interval
      await GenericHelper.sleep(1000 * (6 + _.random(10)))
    }
    catch (error) {
      ConsoleHelper.coloredLog(ConsoleColor.BgRed, ConsoleColor.FgWhite, `🤖: Failed to publish post  Check the error below!`)
      console.error(error);
    }
  }

  private _advertiseTelegram = async (group: IChatChannel) => {

    const messageVariations = [`👉 Participe de nosso grupo do Telegram! Priorizamos melhores e exclusivas vagas para lá.`, `👉 Quer ter acesso a ainda MAIS vagas? Participe de nosso grupo do Telegram!`, `👉 Por favor, participe do Telegram! Postamos melhores oportunidades por lá! Baixa ai, é rapidinho :)`]

    const telegramLink = TelegramChatBot.getGroupLink(group.stateCode);

    const message = _.sample(messageVariations)

    await this._postLinkThumbnail(`${process.env.API_URL}/images/telegram.png`, group.chatId, `Grupo no Telegram para ${group.stateCode}`, `${message} Acesse: ${telegramLink}`,)
  }

  private _thumbnailPost = async (posts: IPostModel[], group: IChatChannel, dontRepeatPosts: boolean) => {

    const limitedPosts = _.slice(posts, 0, 15) // thumbnail posts are limited to 15 only!

    for (const [i, post] of limitedPosts.entries()) {

      if (post.isPostedOnWhatsApp) {
        continue;
      }

      console.log(`[${post.jobRoles[0]}/${post.sector}] - ${post.city}/${post.stateCode} => ${post.title}`);

      if (process.env.ENV === EnvType.Production) {

        const postTitle = this.shortPostTitle(post, 35)

        await this._postLinkThumbnail(`${process.env.WEB_APP_URL}/images/seo/${encodeURIComponent(post.sector)}.jpg`, group.chatId, postTitle, `${process.env.WEB_APP_URL}/posts/${post.slug}?utm_source=whatsapp&utm_medium=chat`)


        if (dontRepeatPosts) {
          await Post.updateOne({ _id: post._id }, { isPostedOnWhatsApp: true })
        }

      } else {
        console.log(`You're running on development. Please turn on PRODUCTION mode!`);
      }
    }

  }

  private _listPost = async (posts: IPostModel[], group: IChatChannel, dontRepeatPosts: boolean) => {

    const listContent = await this.generatePostList("WHATSAPP", group.stateCode, posts, group.isPartnerGroup, dontRepeatPosts)

    console.log(listContent);


    const response = await this.request("POST", "/sendMessage", {
      chatId: group.chatId,
      body: listContent,
    })

    console.log(response.data);
  }

  public postOnGroups = async () => {

    // loop through each group. We'll use the index to check if we should or not repeat posts
    for (const [i, group] of whatsAppGroups.entries()) {

      ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `🤖: WhatsApp Bot => Looking for new jobs to ${group.name}...`)

      const premiumPosts = await this._fetchGroupPosts("WHATSAPP", group, WHATSAPP_BOT_PREMIUM_POSTS_PER_MESSAGE, true)
      const freePosts = await this._fetchGroupPosts("WHATSAPP", group, WHATSAPP_BOT_FREE_POSTS_PER_MESSAGE, false)
      const allPosts = _.shuffle([...freePosts, ...premiumPosts])

      if (freePosts.length >= WHATSAPP_BOT_MINIMUM_FREE_POSTS_PER_LIST) { // minimum post length to submit a message...

        // start asking people to add you to contact list!
        if (!group.isPartnerGroup) {

          const n = _.random(10);

          if (n <= 2 && allPosts.length > 0) { // 20% chance
            const addMessages = [`📞 Ei pessoal! Por favor, me adicionem em sua lista de contatos para garantir que você recebam todas as vagas sem problemas!`, `📞 Ei gente, me adicionem em seu contato para que vocês recebam todas as vagas normalmente. Obrigado!`, `📞 Importante: me adicione em seus contatos para que vocês recebam todas as vagas sem erros.`]

            await GenericHelper.sleep(1000 * (6 + _.random(3)))

            await this.request("POST", "/sendMessage", {
              chatId: group.chatId,
              body: _.sample(addMessages),
            })
          }

          if (n >= 3 && n <= 10) { // 70% chance
            console.log('Telegram invitation');

            await this._advertiseTelegram(group)
          }

          if ((n >= 3 && n <= 7) && !group.isPartnerGroup && !group.isNicheGroup) { // 50% chance

            const subgroupLink = `https://bitly.com/emprego-urgente-${group.stateCode.toLowerCase()}`

            const randomMessages = [`🔔 Quer receber apenas notificações de vagas da *SUA ÁREA*? Acesse nossos subgrupos: ${subgroupLink}`, `🔔 Cansado(a) de tantas notificações de vagas fora da sua área? Acesse nossos subgrupos: ${subgroupLink}`, `🔔 Pessoal, entre em nossos *subgrupos divididos por área profissional* clicando aqui: ${subgroupLink}. Dessa forma vocês receberão notificações de oportunidades relevantes. `]


            await GenericHelper.sleep(1000 * 6 + _.random(3))

            await this.request("POST", "/sendMessage", {
              chatId: group.chatId,
              body: _.sample(randomMessages),
            })
          }
        }

        // if its a leaf group, dont repeat posts
        // if its last group, do not repeat posts!
        // if next group is from another state, lets set a variable telling our bot to do not post this post again
        const dontRepeatPosts = group.isLeaf || (i === whatsAppGroups.length - 1) ? true : (group.stateCode !== whatsAppGroups[i + 1].stateCode)


        // await WhatsAppBotHelper._listPost(allPosts, group, dontRepeatPosts);

        if (!group.isPartnerGroup) {
          await this._thumbnailPost(allPosts, group, dontRepeatPosts);
        } else {
          await this._listPost(allPosts, group, dontRepeatPosts);
        }

      } else {
        console.log('No new jobs found...');
      }

      // if (!group.isPartnerGroup) {
      //   await WhatsAppBotHelper._thumbnailPost(posts, group);
      // } else {
      //   await WhatsAppBotHelper._listPost(posts, group);
      // }
    }
    ConsoleHelper.coloredLog(ConsoleColor.BgGreen, ConsoleColor.FgWhite, '🤖: Finished posting on WhatsApp Groups!')

  }



}