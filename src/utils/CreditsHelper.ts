import { CreditStatus, ICredit } from './../resources/Credit/credit.types';




export class CreditsHelper {

  public static getCreditsInfo = (credits: ICredit[]) => {
    const paidCredits = credits.filter((credit) => credit.status === CreditStatus.PAID)
    const unpaidCredits = credits.filter((credit) => credit.status === CreditStatus.UNPAID)

    let totalIncome = 0;
    let pendingPayment = 0;
    let totalPaidCredits = 0;

    for (const credit of credits) {
      totalIncome += credit.quantity * credit.value;

      if (credit.status === CreditStatus.UNPAID) {
        pendingPayment += credit.quantity * credit.value
      }

      if (credit.status === CreditStatus.PAID) {
        totalPaidCredits += credit.quantity * credit.value
      }
    }

    return {
      totalCredits: credits.length,
      paidCredits: paidCredits.length,
      unpaidCredits: unpaidCredits.length,
      totalPaidCredits,
      totalIncome,
      pendingPayment,
    }

  }



}