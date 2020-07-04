import moment from 'moment';
import cron from 'node-cron';

import { SUBSCRIPTION_DESCRIPTION } from '../resources/Subscription/subscription.constant';
import { SubscriptionStatus } from '../resources/Subscription/subscription.types';
import { Transaction } from '../resources/Transaction/transaction.model';
import { TransactionStatus, TransactionTypes } from '../resources/Transaction/transaction.types';
import { User } from '../resources/User/user.model';
import { SUBSCRIPTION_PRICE } from './../resources/Subscription/subscription.constant';
import { Subscription } from './../resources/Subscription/subscription.model';
import { JunoPaymentHelper } from './../utils/JunoPayment/JunoPaymentHelper';

export class SubscriptionCron {
  public static submitBoletoChargeNearExpiration = () => {
    // Every day at 11 am UTC = 4am Vancouver
    cron.schedule("0 11 * * *", async () => {

      console.log("🕒  SubscriptionCron: submitBoletoChargeNearExpiration() 🕒");



      // check which subscriptions has 10, 5 and 2 days to expire...

      const subscriptions = await Subscription.find({
        status: SubscriptionStatus.Active,
        paymentType: TransactionTypes.BOLETO,
        $or: [{ subscriberDays: 10 }, { subscriberDays: 5 }, { subscriberDays: 2 }]
      })



      for (const subscription of subscriptions) {

        // check if a pending charge request was already provided.

        const last10days = moment(new Date()).subtract(10, 'days').format('YYYY-MM-DD[T00:00:00.000Z]')

        const pendingTransaction = await Transaction.findOne({
          status: TransactionStatus.CREATED,
          createdAt: { $gte: last10days }
        })



        const user = await User.findOne({ _id: subscription.userId })

        if (!user) {
          console.log('submitBoletoChargeNearExpiration() => Could not submit new charge. User not found.');
          return
        }

        if (!user.cpf) {
          console.log("Impossible to generate a new boleto charge, since this user has no CPF. ");
          return
        }

        if (pendingTransaction) {
          // if there's a pending transaction on the latest 10 days, lets just submit its payment link


          // submit charge
          await JunoPaymentHelper.notifyUserAboutPayment(user, "Boleto", pendingTransaction.amount, pendingTransaction.dueDate.toISOString(), pendingTransaction.paymentLink)

        } else {

          // if there's NOT PENDING TRANSACTION, we should generate a new boleto charge

          // boleto due date should be on subscription expiry date
          const subscriptionExpiryDate = moment(new Date()).add(subscription.subscriberDays, "days").format("YYYY-MM-DD")

          await JunoPaymentHelper.getAccessToken();

          const order = await JunoPaymentHelper.generateBoletoCharge(SUBSCRIPTION_DESCRIPTION, SUBSCRIPTION_PRICE, "SUBSCRIPTION", subscriptionExpiryDate, user, user.getFirstName(), user.cpf, user.email)



        }
      }
    })
  }

  public static subscriptionDecrementDays = () => {


    // Every day at 11 am UTC = 4am Vancouver
    cron.schedule("0 11 * * *", async () => {

      console.log("🕒  SubscriptionCron: subscriptionDecrementDays() 🕒");

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