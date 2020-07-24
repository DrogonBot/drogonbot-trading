import { DEFAULT_INITIAL_CAPITAL } from '../../resources/BackTest/backtest.constant';
import { TradeDirection } from '../../resources/Trade/trade.types';
import { ConsoleColor, ConsoleHelper } from '../../utils/ConsoleHelper';
import { TradingDataInterval } from '../constant/tradingdata.constant';
import { ATRHelper } from '../indicators/ATRHelper';
import { ChoppyFilterHelper } from '../indicators/ChoppyFilterHelper';
import { MovingAverageHelper } from '../indicators/MovingAverageHelper';
import { IndicatorSeriesType } from '../indicators/types/indicator.types';
import { BackTestingSystem } from './BackTestingSystem';

export class ThreeDragons extends BackTestingSystem {
  private _systemName: string;
  public symbols: string[];
  public interval: TradingDataInterval;


  constructor(symbols: string[], interval: TradingDataInterval, ATRStopMultiple: number = 3, initialCapital: number = DEFAULT_INITIAL_CAPITAL) {
    super()
    this._systemName = "Three Dragons"
    this.symbols = symbols;
    this.interval = interval;
    this.ATRStopMultiple = ATRStopMultiple
    this.initialCapital = initialCapital
  }

  public backTest = async () => {
    // initialize backtest (load assets data, etc)
    ConsoleHelper.coloredLog(ConsoleColor.BgMagenta, ConsoleColor.FgWhite, `🤖 Initializing ${this._systemName} strategy backtest with the following symbols: ${this.symbols}`)

    await this.startBackTesting(this.symbols, this.interval, this.initialCapital)

    // calculate indicators
    await this.calculateIndicators()

    console.log('🤖 Running backtest!');

    // Starting analytical loop

    for (let i = 0; i < this.symbols.length; i++) {
      const symbol = this.symbols[i]
      const nextSteps = this.defineNextSteps(symbol, i)
      if (!nextSteps) {
        continue;
      }
    }
  }

  public defineNextSteps = async (symbol: string, i: number) => {

    const quotes = this.backTestSymbolsData[symbol].quotes!
    console.log(`Analyzing ${quotes.length} quotes for ${symbol}`);
    const indicators = this.backTestSymbolsData[symbol].indicators!
    const prevIndex = i - 1;
    const prevPeriod = prevIndex < 0 ? null : this.getDataFromPeriod(quotes[prevIndex]?.date)
    const periodNow = this.getDataFromPeriod(quotes[i]?.date)

    if (!prevPeriod || !periodNow) {
      return false
    }




    console.log(`prevPeriod=${prevPeriod}`);
    console.log(`periodNow=${periodNow}`);
    console.log(JSON.stringify(indicators["SMA50"][periodNow]));
    console.log(JSON.stringify(indicators["SMA200"][periodNow]));
    console.log(JSON.stringify(indicators["ATR"][periodNow]));

    const SMA50Now = indicators["SMA50"][periodNow]?.value || null
    const SMA200Now = indicators["SMA200"][periodNow]?.value || null
    const ATRNow = indicators["ATR"][periodNow]?.value || null



    console.log(`Defining next steps for ${symbol} on date ${periodNow}`);
    console.log(`Debugging:
      SMA50Now=${SMA50Now}
      SMA200Now=${SMA200Now}
      ATRNow=${ATRNow}
    `);



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

  public calculateCurrentMarketDirection = async (SMA200Now, SMA200Prev, SMA50Now, ATRNow) => {
    if ((SMA200Now > SMA200Prev) && (SMA50Now > SMA200Now) && !ChoppyFilterHelper.isMarketChoppy(SMA50Now, SMA200Now, ATRNow)) {
      return TradeDirection.Long
    }

    if (SMA200Now < SMA200Prev && SMA200Now > SMA50Now) {
      return TradeDirection.Short
    }

    return TradeDirection.Lateral
  }




}