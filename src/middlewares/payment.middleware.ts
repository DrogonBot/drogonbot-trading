import { JunoPaymentHelper } from '../JunoPayment/JunoPaymentHelper';


export class PaymentMiddleware {

  public static JunoAuthorize = async (req, res, next) => {

    await JunoPaymentHelper.getAccessToken();

    next()

  }
}