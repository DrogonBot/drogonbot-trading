



export class SidewaysMarketHelper {

  public static isMarketSideways = (shortMA: number, longMA: number, ATRNow: number) => {

    const filter = (shortMA - longMA) / ATRNow
    if (filter < 2) {
      return true
    }

    return false
  }
}