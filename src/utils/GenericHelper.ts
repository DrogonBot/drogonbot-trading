

export class GenericHelper {

  public static getUserIp(req) {

    return req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      (req.connection.socket ? req.connection.socket.remoteAddress : null);


  }

  public static arrayFlatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
      return flat.concat(Array.isArray(toFlatten) ? GenericHelper.arrayFlatten(toFlatten) : toFlatten);
    }, []);
  }


}