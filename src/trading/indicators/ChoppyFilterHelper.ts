



export class ChoppyFilterHelper {

  public static isMarketChoppy = (shortMA: number, longMA: number, ATRNow: number) => {

    const filter = (shortMA - longMA) / ATRNow
    if (filter < 2) {
      return true
    }

    return false
  }
}