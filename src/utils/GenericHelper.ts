

export class GenericHelper {

  public static getUserIp(req) {

    return req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      (req.connection.socket ? req.connection.socket.remoteAddress : null);


  }

  public static stripHtml(html) {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
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