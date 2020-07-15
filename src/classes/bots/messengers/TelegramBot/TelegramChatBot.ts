import _ from 'lodash';
import TelegramBot from 'node-telegram-bot-api';

import { ConsoleColor, ConsoleHelper } from '../../../../utils/ConsoleHelper';
import { GenericHelper } from '../../../../utils/GenericHelper';
import { ChatBotFather } from '../ChatBotFather';
import { TELEGRAM_BOT_PREMIUM_POSTS_PER_MESSAGE } from './telegramchatbot.constant';
import { telegramChannels } from './telegramGroups.constant';



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

        const premiumPosts = await this._fetchGroupPosts("TELEGRAM", channel, TELEGRAM_BOT_PREMIUM_POSTS_PER_MESSAGE, true)
        const freePosts = await this._fetchGroupPosts("TELEGRAM", channel, TELEGRAM_BOT_PREMIUM_POSTS_PER_MESSAGE, false)
        const allPosts = _.shuffle([...freePosts, ...premiumPosts])

        if (allPosts.length === 0) {
          ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `🤖: Skipping post publishing because no new posts were found for channel: ${channel.stateCode}`)

          continue;
        }

        ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `🤖: Publishing ${allPosts.length} posts on channel: ${channel.stateCode}`)

        // now start looping through posts...

        await this.bot.startPolling();

        const listContent = await this.generatePostList("TELEGRAM", channel.stateCode, allPosts, false, true)

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