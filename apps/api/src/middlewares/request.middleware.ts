import { RouterHelper } from '@drogonbot/helpers';

import { TS } from '../libs/TS';


export class RequestMiddleware {

  public static allowedRequestKeys = (allowedKeys: string[]) => {

    return async (req, res, next) => {

      // check if all request fields passed are allowed on this request

      const forbiddenKeys = RouterHelper.checkForbiddenRequestKeys(req.body, allowedKeys)
      if (forbiddenKeys) {
        return res.status(400).send({
          status: "error",
          message: TS.string(
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





}