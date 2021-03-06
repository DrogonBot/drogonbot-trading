import { MiddlewareHelper } from '../libs/MiddlewareHelper';
import { TS } from '../libs/TS';





export class UserMiddleware {

  public static restrictUserType = (type) => {

    return async (req, res, next) => {

      const { user } = await MiddlewareHelper.getUserFromRequest(req);

      if (user) {
        if (user.type !== type) {

          return res.status(401).send({
            status: 'error',
            message: TS.string('user', 'userTypeUnauthorized')
          });
        }
      }

      next()
    }





  }
}