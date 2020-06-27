import _ from 'lodash';

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

  public static postOnGroups = async () => {

    // loop through each group
    for (const group of whatsAppGroups) {

      ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `🤖: WhatsApp Bot => Posting new jobs at ${group.name}!`)

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
          const content = `
        👇 ${postTitle} 👇
        https://empregourgente.com/posts/${post.slug}
        `

          const response = await WhatsAppBotHelper.request("POST", "/sendMessage", {
            chatId: group.chatId,
            body: content
          })

          console.log(response.data);
        }

        if (process.env.ENV === EnvType.Production && group.isEndOfLineage) {
          post.isPostedOnWhatsApp = true;
          await post.save();
        }

        await GenericHelper.sleep(1000 * _.random(10))
      }
      await GenericHelper.sleep(1000 * _.random(60 * 3))
    }
    ConsoleHelper.coloredLog(ConsoleColor.BgGreen, ConsoleColor.FgWhite, '🤖: Finished posting on WhatsApp Groups!')





  }



}