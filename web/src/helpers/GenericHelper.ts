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

  public static generateUrlParams = (baseUrl, params) => {
    const values = Object.keys(params).map(key => params[key]);

    const everyNull = values.every(value => value === null || undefined);

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
}
