import cron from 'node-cron';

import { USER_MONTHLY_CREDITS_THRESHOLD } from '../constants/user.constant';
import { User } from '../resources/User/user.model';


export class UsersCron {

  public static refreshUserCredits = () => {


    // At 00:00 on day-of-month 1
    cron.schedule("0 0 1 * *", async () => {
      console.log("🕒  UsersCron => Refreshing user credits... 🕒");

      const users = await User.find({})

      for (const user of users) {

        if (!user.credits) {
          user.credits = USER_MONTHLY_CREDITS_THRESHOLD;
          await user.save();
        }

        if (user.credits <= USER_MONTHLY_CREDITS_THRESHOLD) {
          user.credits = USER_MONTHLY_CREDITS_THRESHOLD;
          await user.save();
        }
      }
    });
  }
}