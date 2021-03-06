import { TS } from '../libs/TS';



export class GlobalMiddleware {
  public static checkMethods = (req, res, next) => {
    const { method, path } = req;

    if (method === "GET") {
      return res.status(401).send({
        status: "error",
        message: TS.string(null, "methodNotAllowed")
      });
    } else {
      console.log(`Express Middleware => ${method} / ${path}`);

      next();
    }
  };

  public static maintenanceMode = (req, res, next) => {
    console.log('Refusing connection - maintenance mode');
    return res.status(401).send({
      status: "error",
      message: TS.string(null, "appMaintenanceMode")
    });
  };


}
