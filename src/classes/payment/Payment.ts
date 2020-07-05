import { Transaction } from '../../resources/Transaction/transaction.model';
import { TransactionStatus, TransactionTypes } from '../../resources/Transaction/transaction.types';
import { ConsoleColor, ConsoleHelper } from '../../utils/ConsoleHelper';



export class Payment {

  public recordTransactionOrder = async (userId: string, providerName: string, orderId: string, code: string, reference: string, amount: number, paymentLink: string, dueDate: string, type: TransactionTypes) => {

    // if order was generated successfully, lets create a transaction in our db
    if (code) {

      try {
        const newTransaction = new Transaction({
          providerName,
          orderId,
          userId,
          code,
          type,
          reference,
          status: TransactionStatus.CREATED,
          amount,
          paymentLink,
          dueDate,
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


}