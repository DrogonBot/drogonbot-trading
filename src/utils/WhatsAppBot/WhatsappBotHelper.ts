import axios from 'axios';
import _ from 'lodash';
import sharp from 'sharp';

import { EnvType } from '../../constants/types/env.types';
import { Post } from '../../resources/Post/post.model';
import { ConsoleColor, ConsoleHelper } from '../ConsoleHelper';
import { GenericHelper } from '../GenericHelper';
import { whatsappAxios } from './whatsappbot.constants';
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

  public static postOnGroups = async () => {





    // loop through each group
    for (const group of whatsAppGroups) {

      ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `🤖: WhatsApp Bot => Posting new jobs at ${group.name}!`)

      // start asking people to add you to contact list!


      const n = _.random(10);

      if (n <= 5) { // 50% chance

        const addMessages = [`📞 Ei pessoal! Por favor, me adicionem em sua lista de contatos para garantir que Você receba todas as vagas sem problemas!`, `📞 Ei gente, me adicionem em seu contato para que você receba todas as vagas normalmente. Obrigada!`, `📞 Importante: me adicione em seus contatos para que você receba todas as vagas sem erros.`]

        const response = await WhatsAppBotHelper.request("POST", "/sendMessage", {
          chatId: group.chatId,
          body: _.sample(addMessages),
        })
      }

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

      for (const post of posts) {

        console.log(`[${post.jobRoles[0]}/${post.sector}] - ${post.city}/${post.stateCode} => ${post.title}`);

        if (process.env.ENV === EnvType.Production) {

          const postTitle = post.title.length >= 35 ? post.title.substr(0, 35) + "..." : post.title



          const imageBase64 = await WhatsAppBotHelper.getBase64Thumbnail(`${process.env.WEB_APP_URL}/images/seo/${encodeURIComponent(post.sector)}.jpg`)

          const response = await WhatsAppBotHelper.request("POST", "/sendLink", {
            chatId: group.chatId,
            title: postTitle,
            body: `${process.env.WEB_APP_URL}/posts/${post.slug}?ref=whatsapp`,
            previewBase64: `data:image/jpeg;base64,${imageBase64}`
          })

          console.log(response.data);
        }

        if (process.env.ENV === EnvType.Production && group.isEndOfLineage) {
          post.isPostedOnWhatsApp = true;
          await post.save();
        }

        await GenericHelper.sleep(1000 * (12 + _.random(30)))
      }
      await GenericHelper.sleep(1000 * _.random(60 * 3))
    }
    ConsoleHelper.coloredLog(ConsoleColor.BgGreen, ConsoleColor.FgWhite, '🤖: Finished posting on WhatsApp Groups!')





  }



}