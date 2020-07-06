import _ from 'lodash';
import TelegramBot from 'node-telegram-bot-api';

import { Post } from '../../../../resources/Post/post.model';
import { ConsoleColor, ConsoleHelper } from '../../../../utils/ConsoleHelper';
import { GenericHelper } from '../../../../utils/GenericHelper';
import { MessengerBotHelper } from '../../helpers/MessengerBotHelper';
import { telegramChannels } from './telegrambot.constants';



export class TelegramBotHelper extends MessengerBotHelper {

  public static bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN || "");

  public static postOnGroups = async () => {

    const bot = TelegramBotHelper.bot;

    if (bot.isPolling()) {
      await bot.stopPolling()
    }

    const sortedChannels = _.shuffle(telegramChannels)

    try {
      for (const channel of sortedChannels) {


        // fetch related posts
        const query: { stateCode: string, city?: string } = {
          stateCode: channel.stateCode,
        }
        if (channel.city !== "all") {
          query.city = channel.city
        }

        const posts = await Post.find({
          ...query,
          isPostedOnTelegram: false,
          active: true
        }).limit(20).sort({ 'createdAt': 'descending' })

        ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `🤖: Publishing ${posts.length} posts on channel: ${channel.stateCode}/${channel.city}`)

        // now start looping through posts...

        await bot.startPolling();


        const listContent = await MessengerBotHelper.generatePostList("TELEGRAM", channel.stateCode, posts, false, true)

        const msg = await bot.sendMessage(channel.chatId, listContent)
        console.log(msg);

        await GenericHelper.sleep(3000);


        await bot.stopPolling();
      }

      ConsoleHelper.coloredLog(ConsoleColor.BgGreen, ConsoleColor.FgWhite, '🤖: Finished posting on Telegram Groups!')



    }
    catch (error) {
      console.error(error);

    }

  }

}