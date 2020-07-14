import _ from 'lodash';
import TelegramBot from 'node-telegram-bot-api';

import { Post } from '../../../../resources/Post/post.model';
import { ConsoleColor, ConsoleHelper } from '../../../../utils/ConsoleHelper';
import { GenericHelper } from '../../../../utils/GenericHelper';
import { ChatBotFather } from '../ChatBotFather';
import { telegramChannels } from './telegramchatbot.constant';



export class TelegramChatBot extends ChatBotFather {

  public bot: TelegramBot;

  constructor() {
    super();
    this.bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN || "");
  }

  public static getGroupLink = (stateCode: string) => {

    const chatId = (telegramChannels.find((channel) => channel.stateCode === stateCode)?.chatId)?.replace("@", "")
    return `https://t.me/${chatId}`

  }

  public postOnGroups = async () => {

    // This is to avoid bot instances overlapping, causing nasty errors on docker.
    if (this.bot.isPolling()) {
      await this.bot.stopPolling()
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

        if (posts.length === 0) {
          console.log('🤖: TelegramBot: No new posts found. Skipping');
          return
        }

        ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `🤖: Publishing ${posts.length} posts on channel: ${channel.stateCode}/${channel.city}`)

        // now start looping through posts...

        await this.bot.startPolling();

        const listContent = await this.generatePostList("TELEGRAM", channel.stateCode, posts, false, true)

        const msg = await this.bot.sendMessage(channel.chatId, listContent)
        console.log(msg);

        await GenericHelper.sleep(3000);


        await this.bot.stopPolling();
      }

      ConsoleHelper.coloredLog(ConsoleColor.BgGreen, ConsoleColor.FgWhite, '🤖: Finished posting on Telegram Groups!')

    }
    catch (error) {
      console.error(error);

    }

  }

}