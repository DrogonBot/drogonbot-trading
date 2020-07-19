import { TradingDirection } from '../typescript/trading.types';


export class TradingSystem {

  public isPriceNearMA = (tradingDirection: TradingDirection, price: number, MA: number, ATR: number) => {

    switch (tradingDirection) {
      case TradingDirection.Long:
        return price > MA && price < (MA + ATR)

      case TradingDirection.Short:
        return price < MA && price > (MA - ATR)
    }
  }



}