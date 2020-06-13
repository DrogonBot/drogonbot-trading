

export class GenericHelper {

  public static groupBy = (xs, key) => {
    return xs.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };


  public static getUserIp(req) {

    return req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      (req.connection.socket ? req.connection.socket.remoteAddress : null);


  }

  public static stripHtml(html) {
    return html.replace(/(<([^>]+)>)/ig, "");
  }

  public static arrayFlatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
      return flat.concat(Array.isArray(toFlatten) ? GenericHelper.arrayFlatten(toFlatten) : toFlatten);
    }, []);
  }

  public static sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


}