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


    console.log('INDICATORS CALCULATED...');
    console.log(this.backTestSymbolsData);
  }

  public calculateIndicators = async () => {

    for (const symbol of this.symbols) {

      console.log(`🤖: Calculating indicators for ${symbol} (${this.interval})`);

      const ATR = await ATRHelper.calculate(symbol, this.interval, 14)
      const MME200 = await MovingAverageHelper.calculateEMA(symbol, 200, IndicatorSeriesType.Close, this.interval)
      const MME50 = await MovingAverageHelper.calculateEMA(symbol, 50, IndicatorSeriesType.Close, this.interval)



      this.backTestSymbolsData[symbol] = {
        ...this.backTestSymbolsData[symbol],
        indicators: {
          ATR,
          MME200,
          MME50
        }
      }
    }
  }




}