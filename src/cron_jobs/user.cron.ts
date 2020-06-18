import cron from 'node-cron';

import { USER_WEEKLY_CREDITS_THRESHOLD } from '../constants/credits.constant';
import { Log } from '../resources/Log/log.model';
import { User } from '../resources/User/user.model';



export class UsersCron {

  public static refreshUserCredits = () => {


    // “At 00:00 on Friday.”
    cron.schedule("0 0 * * FRI", async () => {
      console.log("🕒  UsersCron => Refreshing user credits... 🕒");

      const users = await User.find({})

      for (const user of users) {

        if (!user.credits) {
          user.credits = USER_WEEKLY_CREDITS_THRESHOLD;
          await user.save();

          const creditRestored = new Log({
            emitter: user._id,
            action: 'USER_CREDITS_RESTORED',
            target: user.credits
          })
          await creditRestored.save()

        }

        if (user.credits <= USER_WEEKLY_CREDITS_THRESHOLD) {
          user.credits = USER_WEEKLY_CREDITS_THRESHOLD;
          await user.save();

          const creditRestored = new Log({
            emitter: user._id,
            action: 'USER_CREDITS_RESTORED',
            target: user.credits
          })
          await creditRestored.save()

        }
      }
    });
  }
}