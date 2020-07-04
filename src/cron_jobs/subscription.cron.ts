import cron from 'node-cron';

import { SubscriptionStatus } from '../resources/Subscription/subscription.types';
import { User } from '../resources/User/user.model';
import { Subscription } from './../resources/Subscription/subscription.model';

export class SubscriptionCron {

  public static subscriptionDecrementDays = () => {


    // Every day at 11 am UTC = 4am Vancouver
    cron.schedule("0 11 * * *", async () => {

      console.log('subscriptionDecrementDays()');

      const subscriptions = await Subscription.find({
        status: SubscriptionStatus.Active
      })

      for (const subscription of subscriptions) {

        if (subscription.subscriberDays > 0) {
          // remove one subscriber day for each subscription
          subscription.subscriberDays -= 1;
          await subscription.save();
        }

        if (subscription.subscriberDays <= 0) {

          subscription.status = SubscriptionStatus.Inactive; // set our subscription as inactive
          await subscription.save();

          // remove user premium, if there're no subscriperDays left...
          try {
            const user = await User.findOne({ _id: subscription.userId });
            if (user) {
              user.isPremium = false;
              await user.save();
            }
          }
          catch (error) {
            console.error(error);
          }
        }
      }



    });

  }




}