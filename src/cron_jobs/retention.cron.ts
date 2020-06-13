import DateDiff from 'date-diff';
import cron from 'node-cron';

import { IUser, User } from '../resources/User/user.model';
import { PushNotificationHelper } from '../utils/PushNotificationHelper';
import { TS } from '../utils/TS';



export class RetentionCron {
  public static inactiveUserReminder() {

    cron.schedule("0 0 */3 * *", async () => {

      console.log("🕒  RetentionCron => Inactive User Reminder... 🕒");



      const users: IUser[] = await User.find({}) // select all users

      for (const user of users) {

        const lastActivity = new Date(user.updatedAt);
        const today = new Date()

        const diffInDays = new DateDiff(today, lastActivity);

        if (diffInDays >= 7) { // if there's more than a week since last activity, send a push with a reminder message

          PushNotificationHelper.sendPush([user.pushToken], {
            sound: "default",
            body: TS.string('user', 'cronInactiveUserReminderText', {
              firstName: user.givenName || user.name
            }),
          })
        }
      }
    });
  }
}