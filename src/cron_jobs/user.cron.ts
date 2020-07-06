import moment from 'moment';
import cron from 'node-cron';

import { USER_WEEKLY_CREDITS_EARNED } from '../constants/credits.constant';
import { Log } from '../resources/Log/log.model';
import { User } from '../resources/User/user.model';


export class UsersCron {

  public static deleteOldLogs = () => {

    cron.schedule("0 0 * * *", async () => {

      console.log("🕒 UsersCron => deleting old logs 🕒");

      const date30daysAgo = moment(new Date()).subtract('30', 'days').format('YYYY-MM-DD[T00:00:00.000Z]');

      await Log.deleteMany({
        createdAt: { $lte: date30daysAgo },
        $and: [
          { action: { $ne: "USER_CREDIT_CONSUMED" } },
          { action: { $ne: "USER_COMPUTE_PROMOTED_CLICK" } }
        ]

      }, (err) => {

        if (err) {
          console.log(err);
        }
      })



    })

  }

  //!Disabled for now
  public static refreshUserCredits = () => {


    // “At 00:00 on Friday.”
    cron.schedule("0 0 * * FRI", async () => {
      console.log("🕒 UsersCron => Refreshing user credits... 🕒");

      const users = await User.find({})

      for (const user of users) {

        if (!user.credits) {
          user.credits = USER_WEEKLY_CREDITS_EARNED;
          await user.save();

          const creditRestored = new Log({
            emitter: user._id,
            action: 'USER_CREDITS_RESTORED',
            target: user.credits
          })
          await creditRestored.save()

        }

        if (user.credits <= USER_WEEKLY_CREDITS_EARNED) {
          user.credits = USER_WEEKLY_CREDITS_EARNED;
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