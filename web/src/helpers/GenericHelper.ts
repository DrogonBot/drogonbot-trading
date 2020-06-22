export class GenericHelper {
  public static parseMaskedInput = (
    unit: string,
    delimiter: ".",
    value: string
  ): number => {
    const parsedValue = value
      .replace(unit, "")
      .replace(/\./g, "")
      .replace(/\,/g, delimiter);

    return parseFloat(parsedValue);
  };

  public static clientAlert = (message: string) => {
    if (typeof window !== "undefined") {
      // if we're on the client
      alert(message);
    }
  };

  public static generateUrlParams = (baseUrl, params) => {
    const values = Object.keys(params).map((key) => params[key]);

    const everyNull = values.every((value) => value === null || undefined);

    if (everyNull) {
      return baseUrl;
    }

    baseUrl += `?`;

    Object.entries(params).map(([key, value]) => {
      if (value) {
        baseUrl += `${key}=${value}&`;
      }
    });

    baseUrl = baseUrl.slice(0, baseUrl.length - 1);

    return baseUrl;
  };

  public static crossBrowserUrlRedirect = (url: string, newPage?: false) => {
    if (newPage) {
      GenericHelper.windowOpen(url);
    }

    // https://stackoverflow.com/a/31223302/3192151
    setTimeout(function() {
      document.location.href = url;
    }, 250);
  };

  public static windowOpen(url: string) {
    // Reference: https://stackoverflow.com/questions/20696041/window-openurl-blank-not-working-on-imac-safari

    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isSafari) {
      // Safari doesn't like window.open, so lets use this alternative method.

      window.location.assign(url);
      return;
    }

    // for all other *decent* browsers, lets use window.open
    window.open(url);

    return;
  }
}
