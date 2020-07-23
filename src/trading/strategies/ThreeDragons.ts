import { TradeDirection } from '../../resources/Trade/trade.types';
import { ConsoleColor, ConsoleHelper } from '../../utils/ConsoleHelper';
import { TradingDataInterval } from '../constant/tradingdata.constant';
import { ATRHelper } from '../indicators/ATRHelper';
import { MovingAverageHelper } from '../indicators/MovingAverageHelper';
import { IndicatorSeriesType } from '../indicators/types/indicator.types';
import { BackTestingSystem } from './BackTestingSystem';

export class ThreeDragons extends BackTestingSystem {
  private _systemName: string;
  public symbols: string[];
  public interval: TradingDataInterval;

  constructor(symbols: string[], interval: TradingDataInterval, ATRStopMultiple: number = 3) {
    super()
    this._systemName = "Three Dragons"
    this.symbols = symbols;
    this.interval = interval;
    this.ATRStopMultiple = ATRStopMultiple
  }

  public backTest = async () => {
    // initialize backtest (load assets data, etc)
    ConsoleHelper.coloredLog(ConsoleColor.BgMagenta, ConsoleColor.FgWhite, `🤖 Initializing ${this._systemName} strategy backtest with the following symbols: ${this.symbols}`)

    await this.startBackTesting(this.symbols, this.interval)

    // calculate indicators
    await this.calculateIndicators()

    console.log('🤖 Starting backtest!');


  }

  public calculateIndicators = async () => {

    for (const symbol of this.symbols) {

      console.log(`🤖: Calculating indicators for ${symbol} (${this.interval})`);

      const ATR = await ATRHelper.calculate(symbol, this.interval, 14)
      const SMA200 = await MovingAverageHelper.calculateSMA(symbol, this.interval, 200, IndicatorSeriesType.Close)
      const SMA50 = await MovingAverageHelper.calculateSMA(symbol, this.interval, 50, IndicatorSeriesType.Close)



      this.backTestSymbolsData[symbol] = {
        ...this.backTestSymbolsData[symbol],
        indicators: {
          ATR,
          SMA200,
          SMA50
        }
      }
    }
  }

  public calculateCurrentMarketDirection = async (SMA200Now, SMA200Prev, SMA50Now) => {
    if (SMA200Now > SMA200Prev && SMA50Now > SMA200Now) {
      return TradeDirection.Long
    }

    if (SMA200Now < SMA200Prev && SMA200Now > SMA50Now) {
      return TradeDirection.Short
    }

    return TradeDirection.Lateral
  }




}