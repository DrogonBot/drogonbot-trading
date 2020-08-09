import { MiddlewareHelper } from '../utils/MiddlewareHelper';
import { TS } from '../utils/TS';

const userAuthMiddleware = async (req, res, next) => {
  try {

    const { user, token } = await MiddlewareHelper.getUserFromRequest(req);

    if (!user) {
      return res.status(401).send({
        status: 'error',
        message: TS.string('user', 'userNotFoundByToken')
      });
    }

    req.token = token;
    req.user = user;
    // proceed with user access
    next();
  } catch (error) {
    return res.status(401).send({
      status: 'error',
      message: TS.string('user', 'userNotAuthenticated')
    });
  }
};

export { userAuthMiddleware };
