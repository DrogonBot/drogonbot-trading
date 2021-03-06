

export class GenericHelper {

  public static getUserIp(req) {

    return req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      (req.connection.socket ? req.connection.socket.remoteAddress : null);
  }

  public static stripHtml(html) {
    return html.replace(/(<([^>]+)>)/ig, "");
  }

  // Add a delay before some action... Useful for bots emulating human behavior
  public static sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


}