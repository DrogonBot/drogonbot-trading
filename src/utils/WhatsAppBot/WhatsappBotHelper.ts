import axios from 'axios';
import _ from 'lodash';
import sharp from 'sharp';

import { EnvType } from '../../constants/types/env.types';
import { Post } from '../../resources/Post/post.model';
import { ConsoleColor, ConsoleHelper } from '../ConsoleHelper';
import { GenericHelper } from '../GenericHelper';
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

  private static _fetchGroupPosts = async (group: IWhatsAppGroup) => {

    let citiesQuery = {}
    let sectorQuery = {}
    let jobRolesQuery = {}

    if (group.jobRoles) {
      const jobRolesData = group.jobRoles?.map((jobRole) => jobRole)

      jobRolesQuery = {
        jobRoles: { "$in": jobRolesData },
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
    }).limit(10).sort({ 'createdAt': 'descending' })

    posts = _.shuffle(posts)

    return posts;
  }

  private static _shortPostTitle = (title: string, maxLength: number) => {
    return title.length >= maxLength ? title.substr(0, maxLength) + "..." : title
  }

  public static postOnGroups = async () => {

    // loop through each group
    for (const group of whatsAppGroups) {

      ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `🤖: WhatsApp Bot => Posting new jobs at ${group.name}!`)

      // start asking people to add you to contact list!


      if (!group.isPartnerGroup) {
        const n = _.random(10);

        if (n <= 5) { // 50% chance

          const addMessages = [`📞 Ei pessoal! Por favor, me adicionem em sua lista de contatos para garantir que Você receba todas as vagas sem problemas!`, `📞 Ei gente, me adicionem em seu contato para que você receba todas as vagas normalmente. Obrigada!`, `📞 Importante: me adicione em seus contatos para que você receba todas as vagas sem erros.`]

          await WhatsAppBotHelper.request("POST", "/sendMessage", {
            chatId: group.chatId,
            body: _.sample(addMessages),
          })
        }
      }

      const posts = await WhatsAppBotHelper._fetchGroupPosts(group)


      // ! OWN GROUPS POSTING

      if (!group.isPartnerGroup) {

        for (const post of posts) {

          console.log(`[${post.jobRoles[0]}/${post.sector}] - ${post.city}/${post.stateCode} => ${post.title}`);

          if (process.env.ENV === EnvType.Production) {

            const postTitle = post.title.length >= 35 ? post.title.substr(0, 35) + "..." : post.title

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


          }

          if (process.env.ENV === EnvType.Production && group.isEndOfLineage) {
            post.isPostedOnWhatsApp = true;
            await post.save();
          }

          await GenericHelper.sleep(1000 * (12 + _.random(20)))
        }
      } else {

        // ! PARTNER GROUP POSTING! SHOULD GENERATE A LIST ONLY, WITH 1 POST.
        let listContent = `⚠ Vagas exclusivas do ${group.stateCode} ⚠ \n👉 Mais vagas? Acesse nossos grupos: https://bit.ly/emprego-urgente-${group.stateCode.toLowerCase()}\n\n`

        for (const post of posts) {
          listContent += `${WhatsAppBotHelper._shortPostTitle(post.title, 30)}: ${process.env.WEB_APP_URL}/posts/${post.slug}\n\n`
        }

        listContent += `\n👉 Mais vagas? Acesse nossos grupos: https://bit.ly/emprego-urgente-${group.stateCode.toLowerCase()}`

        console.log(listContent);

        const response = await WhatsAppBotHelper.request("POST", "/sendMessage", {
          chatId: group.chatId,
          body: listContent,
        })

        console.log(response.data);


      }



      await GenericHelper.sleep(1000 * _.random(60))
    }
    ConsoleHelper.coloredLog(ConsoleColor.BgGreen, ConsoleColor.FgWhite, '🤖: Finished posting on WhatsApp Groups!')





  }



}