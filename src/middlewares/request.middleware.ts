import requestIp from 'request-ip';

import { LanguageHelper } from '../utils/LanguageHelper';
import { RouterHelper } from '../utils/RouterHelper';

export class RequestMiddleware {

  public static allowedRequestKeys = (allowedKeys: string[]) => {

    return async (req, res, next) => {

      // check if all request fields passed are allowed on this request

      const forbiddenKeys = RouterHelper.checkForbiddenRequestKeys(req.body, allowedKeys)
      if (forbiddenKeys) {
        return res.status(400).send({
          status: "error",
          message: LanguageHelper.getLanguageString(
            null,
            "globalInvalidKeys", {
            forbiddenKeys
          }
          )
        });
      }

      next()
    }
  }

  public static getRequestIP = (req, res, next) => {
    const clientIp = requestIp.getClientIp(req);
    req.clientIp = clientIp;
    next();
  };



}