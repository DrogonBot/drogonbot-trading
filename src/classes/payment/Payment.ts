import moment from 'moment';

import { AccountEmailManager } from '../../emails/account.email';
import { GenericEmailManager } from '../../emails/generic.email';
import { SUBSCRIPTION_SUBSCRIBER_DAYS_ADDED } from '../../resources/Subscription/subscription.constant';
import { Subscription } from '../../resources/Subscription/subscription.model';
import { SubscriptionStatus } from '../../resources/Subscription/subscription.types';
import { Transaction } from '../../resources/Transaction/transaction.model';
import { ITransaction, TransactionStatus, TransactionTypes } from '../../resources/Transaction/transaction.types';
import { IUser } from '../../resources/User/user.model';
import { ConsoleColor, ConsoleHelper } from '../../utils/ConsoleHelper';
import { TS } from '../../utils/TS';



export class Payment {

  public recordTransactionOrder = async (userId: string, providerName: string, orderId: string, orderCode: string, orderReference: string, orderAmount: number, orderPaymentLink: string, orderDueDate: string, orderType: TransactionTypes) => {

    // if order was generated successfully, lets create a transaction in our db
    if (orderCode) {

      try {
        const newTransaction = new Transaction({
          providerName,
          orderId,
          userId,
          code: orderCode,
          type: orderType,
          reference: orderReference,
          status: TransactionStatus.CREATED,
          amount: orderAmount,
          paymentLink: orderPaymentLink,
          dueDate: orderDueDate,
        })
        await newTransaction.save();

        return newTransaction

      }
      catch (error) {
        ConsoleHelper.coloredLog(ConsoleColor.BgRed, ConsoleColor.FgWhite, `💰: Payment - Failed while trying to generate your transaction!`)
        console.error(error);
        return false
      }

    }
  }

  public notifyUserAboutPayment = async (user, paymentMethod: string, orderAmount: number, orderDueDate: string, orderPaymentUrl: string) => {
    const accountEmailManager = new AccountEmailManager();

    const subject = TS.string('transaction', 'invoiceNotificationSubject', {
      product: TS.string("subscription", "genericSubscription"),
      paymentMethod
    })

    await accountEmailManager.sendEmail(user.email, subject, 'invoice', {
      invoiceNotificationGreetings: TS.string("transaction", 'invoiceNotificationGreetings', {
        firstName: user.getFirstName()
      }),
      invoiceNotificationFirstPhrase: TS.string('transaction', 'invoiceNotificationFirstPhrase'),
      invoiceItemTitle: TS.string('transaction', 'invoiceItemTitle'),
      invoiceItem: TS.string('subscription', 'genericSubscription'),
      invoiceAmountDueTitle: TS.string('transaction', 'invoiceAmountDueTitle'),
      invoiceAmount: `${TS.string(null, 'currency')} ${orderAmount}`,
      invoiceDueByTitle: TS.string('transaction', 'invoiceDueByTitle'),
      invoiceDueBy: moment(orderDueDate).format("DD/MM/YYYY"),
      invoicePaymentUrl: orderPaymentUrl,
      invoicePayCTA: TS.string('transaction', 'invoicePayCTA'),
      invoiceEndPhrase: TS.string('transaction', 'invoiceEndPhrase')
    })


  }

  public updateSubscriptionData = async (user: IUser, fetchedTransaction: ITransaction) => {

    if (user) {
      // Check if this user already has a subscription

      const subscription = await Subscription.findOne({ userId: user._id })

      if (!subscription) {

        // generate subscription in our system
        const newSubscription = new Subscription({
          userId: fetchedTransaction.userId,
          paymentType: fetchedTransaction.type,
          status: SubscriptionStatus.Active,
          subscriberDays: SUBSCRIPTION_SUBSCRIBER_DAYS_ADDED // 30 days of subscription
        })
        await newSubscription.save();
      } else {

        console.log('updating subscription...');

        subscription.paymentType = fetchedTransaction.type;
        //  update subscription
        subscription.status = SubscriptionStatus.Active;
        // subscription.expirationDate =
        subscription.subscriberDays += SUBSCRIPTION_SUBSCRIBER_DAYS_ADDED; // increment more 30 days on subscription

        await subscription.save();
      }
      // set user as premium
      try {
        if (user) {
          user.isPremium = true;
          await user.save();
        }

        // notify  user
        const genericEmailManager = new GenericEmailManager()
        await genericEmailManager.sendEmail(user.email, TS.string("subscription", "subscriptionPaid"), "notification", {
          notificationGreetings: TS.string("transaction", "notificationGreetings", { firstName: user.getFirstName() }),
          notificationMessage: TS.string("subscription", "subscriptionPaymentConfirmationMessage"),
          notificationEndPhrase: TS.string("transaction", 'notificationEndPhrase', {
            company: process.env.APP_NAME
          })
        })

      }
      catch (error) {
        console.error(error);

      }
    }


  }


}