import { appEnv, ENV } from '../constants/Env.constant';
import { EnvironmentTypes } from '../types/Global.types';
import { ICreditCard, ICreditCardCheck, ICreditCardCheckItem } from '../types/Payment.types';

export class PaymentHelper {
  private static _getInvalidFields = (creditCardCheck: ICreditCardCheck) => {
    const ccKv = Object.entries(
      creditCardCheck
    ).map(([key, value]: [string, ICreditCardCheckItem]) => ({ key, value }));
    return ccKv.filter((field) => !field.value.isValid);
  };

  public static getInvalidFieldsString = (
    creditCardCheck: ICreditCardCheck
  ) => {
    const invalidFields = PaymentHelper._getInvalidFields(creditCardCheck);

    const invalidFieldsLabels = invalidFields.map((field) => field.value.label);

    return invalidFieldsLabels.join(", ").trim();
  };

  public static areAllFieldsValid = (creditCardCheck) => {
    const invalidFields = PaymentHelper._getInvalidFields(creditCardCheck);

    if (invalidFields.length >= 1) {
      return false;
    }

    return true;
  };

  public static validateAndGenerateCreditCardHash = async (
    creditCard: ICreditCard
  ) => {
    // @ts-ignore
    const checkout = new DirectCheckout(
      appEnv.payment.juno.publicToken,
      ENV === EnvironmentTypes.Development ? false : true
    );

    const expirationMonth = creditCard.expiry.split("/")[0];
    const expirationYear = creditCard.expiry.split("/")[1];

    const preparedCreditCardNumber = creditCard.number.replace(
      new RegExp(" ", "g"),
      ""
    );

    const creditCardCheck = {
      name: {
        isValid: creditCard.name.length >= 1,
        label: "nome",
      },
      number: {
        isValid: checkout.isValidCardNumber(preparedCreditCardNumber),
        label: "número do cartão de crédito",
      },
      expiry: {
        isValid: checkout.isValidExpireDate(
          expirationMonth,
          `20${expirationYear}`
        ),
        label: "data de expiração do cartão",
      },

      cvc: {
        isValid: checkout.isValidSecurityCode(
          creditCard.number,
          creditCard.cvc
        ),
        label: "número do CVC",
      },
    };

    console.log(creditCard);

    if (!PaymentHelper.areAllFieldsValid(creditCardCheck)) {
      const invalidFieldsString = PaymentHelper.getInvalidFieldsString(
        creditCardCheck
      );
      alert(
        `Os seguintes campos estão inválidos: ${invalidFieldsString}. Por favor, corrija e tente novamente.`
      );
      return;
    }

    const preparedCardData = {
      cardNumber: preparedCreditCardNumber,
      holderName: creditCard.name,
      securityCode: creditCard.cvc,
      expirationMonth,
      expirationYear: `20${expirationYear}`,
    };

    return new Promise((resolve, reject) => {
      try {
        checkout.getCardHash(
          preparedCardData,
          function(cardHash) {
            resolve(cardHash);
          },
          function(error) {
            /* Erro - A variável error conterá o erro ocorrido ao obter o hash */
            console.log(error);
            reject(error);
          }
        );
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });

    // console.log(checkout.getCardType(preparedCreditCardNumber));
  };
}
