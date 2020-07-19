import { DEFAULT_ATR_MULTIPLE, DEFAULT_BROKER_COMISSION, DEFAULT_MAX_RISK_PER_TRADE } from '../constants/backtest.constant';
import { IAssetPrice } from '../resources/Asset/asset.types';
import { Trade } from '../resources/Trade/trade.model';
import { TradeType } from '../resources/Trade/trade.types';
import { TradeDirection } from '../typescript/trading.types';
import { ConsoleColor, ConsoleHelper } from '../utils/ConsoleHelper';
import { PositionSizingHelper } from '../utils/PositionSizingHelper';


export class TradingSystem {

  public startTrade = async (symbol: string, price: IAssetPrice, ATR: number, initialCapital: number, tradeDirection: TradeDirection, backTestId: string) => {

    // calculate position sizing
    ConsoleHelper.coloredLog(ConsoleColor.BgGreen, ConsoleColor.FgWhite, `ENTRY: Adding entry at ${price.date} - ${price.close}`)

    const { maxAllocation,
      units,
      initialStop } = PositionSizingHelper.ATRPositionSizing(initialCapital, DEFAULT_MAX_RISK_PER_TRADE, price.close, ATR, DEFAULT_ATR_MULTIPLE)


    // Create new trade
    const newTrade = new Trade({
      type: TradeType.BackTest,
      direction: tradeDirection,
      backTestId,
      symbol,
      riskR: DEFAULT_MAX_RISK_PER_TRADE,
      quantity: units,
      allocatedCapital: maxAllocation,
      entryPrice: price.close,
      entryDate: price.date,
      // exitPrice: Number,
      // exitDate: Number,
      currentStop: initialStop,
      commission: DEFAULT_BROKER_COMISSION,
    })
    await newTrade.save()

    return newTrade;


  }

  public isPriceNearMA = (tradingDirection: TradeDirection, price: number, MA: number, ATR: number) => {

    switch (tradingDirection) {
      case TradeDirection.Long:
        return price > MA && price < (MA + ATR)

      case TradeDirection.Short:
        return price < MA && price > (MA - ATR)
    }
  }



}