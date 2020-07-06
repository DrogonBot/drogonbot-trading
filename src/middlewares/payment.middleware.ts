import { JunoPayment } from '../classes/payment/JunoPayment/JunoPayment';


export class PaymentMiddleware {

  public static JunoAuthorize = async (req, res, next) => {

    const junoPayment = new JunoPayment()

    await junoPayment.getAccessToken();

    next()

  }
}