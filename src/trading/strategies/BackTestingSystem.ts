import _ from 'lodash';
import * as mathjs from 'mathjs';
import moment from 'moment';

import { DEFAULT_FORMATTED_DATE } from '../../constants/global.constant';
import {
  DEFAULT_ATR_MULTIPLE,
  DEFAULT_BROKER_COMMISSION,
  DEFAULT_INITIAL_CAPITAL,
  DEFAULT_MAX_RISK_PER_TRADE,
  RISK_FREE_RETURN,
} from '../../resources/BackTest/backtest.constant';
import { BackTest } from '../../resources/BackTest/backtest.model';
import { BackTestActions, IBackTestSymbolData, IBackTestTradesDetails } from '../../resources/BackTest/backtest.types';
import { Order } from '../../resources/Order/order.model';
import { OrderStatus, OrderTypes } from '../../resources/Order/order.types';
import { IQuote } from '../../resources/Quote/quote.types';
import { ITradeModel, Trade } from '../../resources/Trade/trade.model';
import { TradeDirection, TradeStatus, TradeType } from '../../resources/Trade/trade.types';
import { ConsoleColor, ConsoleHelper } from '../../utils/ConsoleHelper';
import { DateHelper } from '../../utils/DateTimeHelper';
import { NumberHelper } from '../../utils/NumberHelper';
import { PositionSizingHelper } from '../../utils/PositionSizingHelper';
import { TradingDataInterval } from '../constant/tradingdata.constant';
import { TradingSystem } from './TradingSystem';



export class BackTestingSystem extends TradingSystem {
  public backTestSymbolsData: IBackTestSymbolData
  public symbolsMarketDirections: object | null
  public currentBackTestId: string | null
  public isBackTestRunning: boolean
  public backTestTradeDetails: IBackTestTradesDetails


  constructor() {
    super();
    this.symbolsMarketDirections = null
    this.backTestSymbolsData = {}
    this.currentBackTestId = null
    this.isBackTestRunning = false;
    this.backTestTradeDetails = {}
  }

  // ! MAIN BACKTESTING FUNCTIONS

  public initBackTesting = async (currentCapital: number, ticker: string, executionPrice: number, price: IQuote, ATR: number, marketDirection: TradeDirection, backTestId: string) => {

    // calculate position sizing
    ConsoleHelper.coloredLog(ConsoleColor.BgGreen, ConsoleColor.FgWhite, `🤖: BUY: Adding entry at ${price.date} - ${NumberHelper.format(executionPrice)}`)

    const { maxAllocation,
      qty: units,
      initialStop } = PositionSizingHelper.ATRPositionSizing(currentCapital, DEFAULT_MAX_RISK_PER_TRADE, executionPrice, ATR, DEFAULT_ATR_MULTIPLE)


    // Create new trade
    const newTrade = new Trade({
      type: TradeType.BackTest,
      direction: marketDirection,
      backTestId,
      ticker,
      riskR: DEFAULT_MAX_RISK_PER_TRADE,
      quantity: units,
      allocatedCapital: maxAllocation,
      startPrice: executionPrice,
      entryPrice: executionPrice,
      avgEntryPrice: executionPrice,
      entryDate: price.date,
      // exitPrice: Number,
      // exitDate: Number,
      stopPrice: initialStop,
      commission: DEFAULT_BROKER_COMMISSION,
      daysDuration: 0
    })
    await newTrade.save()

    return newTrade;


  }

  public startBackTesting = async (tickers: string[], interval: TradingDataInterval, initialCapital: number = DEFAULT_INITIAL_CAPITAL) => {

    this.isBackTestRunning = true;

    for (const ticker of tickers) {
      console.log(`BackTest: Fetching data for ${ticker}. Please wait...`);
      const quotes = await this.fetchPriceData(ticker, interval)


      if (!quotes) {
        throw new Error(`BackTest: failed to fetch data for ${ticker}. Please, make sure you have data for it, first!`)
      }

      this.backTestSymbolsData = {
        ...this.backTestSymbolsData,
        [ticker]: {
          indicators: {},
          quotes,
          quotesDictionary: {}
        }
      }
    }

    // prepare date (set all date "needles" to the same point)

    this.backTestSymbolsData = this.prepareBackTestData(tickers)

    try {
      console.log('Creating new backtest...');
      const newBackTest = new BackTest({
        assets: tickers,
        initialCapital,
        currentCapital: initialCapital,
        totalTrades: 0,
        totalCommission: 0,
        totalTradingDays: 0
      })
      await newBackTest.save()

      this.currentBackTestId = newBackTest._id

      if (!this.backTestSymbolsData || !this.currentBackTestId) {
        throw new Error("BackTest: failed to initialize backtest!")
      }

    }
    catch (error) {
      console.error(error);
      return null
    }
  }

  public runBackTesting = async (tickers: string[], interval: TradingDataInterval, defineNextSteps: Function) => {

    const backtestStartingTime = moment(new Date()) // just to measure performance
    const startingPeriod = (this.getStartingDate(tickers))
    let periodNow = DateHelper.indicatorFormat(startingPeriod)

    let finishedSymbols = 0
    const totalSymbols = tickers.length

    while (this.isBackTestRunning) {

      if (finishedSymbols === totalSymbols) {
        this.isBackTestRunning = false
        return
      }

      for (const ticker of tickers) {

        const dataEntries = this.backTestSymbolsData[ticker].quotes
        const lastDataEntry = dataEntries[dataEntries.length - 1]
        const isLastDataEntry = DateHelper.indicatorFormat(lastDataEntry.date) === periodNow
        if (isLastDataEntry) {
          ConsoleHelper.coloredLog(ConsoleColor.BgYellow, ConsoleColor.FgBlack, `🤖: Finished backtest for ${ticker} on ${periodNow}!`)
          finishedSymbols++
        }

        const quotesDictionary = this.backTestSymbolsData[ticker].quotesDictionary
        if (!quotesDictionary) {
          throw new Error(`Failed to find DateKey data for ${ticker}`)
        }

        const prevPeriod = DateHelper.indicatorFormat(moment(periodNow).subtract(1, DateHelper.convertIntervalToMomentInterval(interval)).toDate())

        const nextSteps = await defineNextSteps(ticker, quotesDictionary, periodNow, prevPeriod)


        if (nextSteps === BackTestActions.Skip) {
          continue;
        }



        // await GenericHelper.sleep(1000)

      }

      // increase one period
      periodNow = DateHelper.indicatorFormat(moment(periodNow).add(1, DateHelper.convertIntervalToMomentInterval(interval)).toDate())
    }


    const backtestFinishingTime = moment(new Date())

    const elapsedTime = backtestFinishingTime.diff(backtestStartingTime, 'seconds')
    ConsoleHelper.coloredLog(ConsoleColor.BgGreen, ConsoleColor.FgWhite, `🤖: Finished after ${elapsedTime} seconds!`)

  }

  public endBackTesting = async (currentCapital: number, executionPrice: number, price: IQuote, currentStop: number, currentActiveTradeId) => {

    this.isBackTestRunning = false;

    const currentTrade = await Trade.findOne({ _id: currentActiveTradeId })

    if (!currentTrade) {
      console.log("Error: current trade not found");
      return
    }

    ConsoleHelper.coloredLog(ConsoleColor.BgRed, ConsoleColor.FgWhite, `🤖: SELL: Adding exit at ${price.date} - ${price.close}`)

    // update current trade

    if (!currentTrade) {
      console.log("Error: current trade not found");
      return
    }


    currentTrade.stopPrice = currentStop;
    currentTrade.status = TradeStatus.Inactive;
    currentTrade.exitDate = price.date;
    currentTrade.exitPrice = executionPrice;
    currentTrade.wasStopped = currentTrade.exitPrice === currentStop
    currentTrade.profitLoss = (currentTrade.exitPrice - currentTrade.avgEntryPrice) * currentTrade.quantity

    ConsoleHelper.coloredLog(ConsoleColor.BgBlue, ConsoleColor.FgWhite, `${currentTrade.profitLoss > 0 ? `💰` : `😞`}: ProfitLoss: $${currentTrade.profitLoss} - Total available capital of $${currentCapital}.`)


    const a = moment(currentTrade.exitDate);
    const b = moment(currentTrade.entryDate);
    const diff = a.diff(b, 'days')
    currentTrade.daysDuration = diff;
    currentTrade.commission += DEFAULT_BROKER_COMMISSION;
    await currentTrade.save();

    return currentTrade;
  }

  // ! OTHER BACKTESTING FUNCTIONS

  private _createNewOrder = async (ticker: string, orderType: OrderTypes, trade: ITradeModel, orderPrice: number) => {
    const newOrder = new Order({
      trade: trade._id,
      type: orderType,
      price: orderPrice,
      status: OrderStatus.Pending
    })
    trade.orders.push(newOrder)
    await newOrder.save()
    await trade.save()

    // if its a start or stop order, we should save it in a dictionary, to avoid frequent fetches in our database

    switch (orderType) {
      case OrderTypes.Start:
        this.backTestTradeDetails = {
          ...this.backTestTradeDetails,
          [ticker]: {
            ...this.backTestTradeDetails[ticker],
            startPrice: orderPrice
          }
        }

        break;
      case OrderTypes.StopLoss:
        this.backTestTradeDetails = {
          ...this.backTestTradeDetails,
          [ticker]: {
            ...this.backTestTradeDetails[ticker],
            stopPrice: orderPrice
          }
        }
        break;

    }


  }

  public placeBackTestOrder = async (ticker: string, orderType: OrderTypes, orderPrice: number, orderDate: Date, maxRiskPerTrade: number, ATRNow: number) => {



    try {
      const currentBackTest = await BackTest.findOne({ _id: this.currentBackTestId })

      if (!currentBackTest) {
        throw new Error("Failed to find BackTest while trying to buy asset")
      }

      const activeTrade = currentBackTest.trades.find((trade) => (trade.status === TradeStatus.Active) && trade.ticker === ticker)

      if (activeTrade) {
        console.log("Active trade found, creating new order");
        // if there's already an active trade, lets just create an order for a start

        await this._createNewOrder(ticker, orderType, activeTrade, orderPrice)


      } else {
        // if there's no active trade, create new one

        console.log("No active trade found. Creating new one");

        const newTrade = new Trade({
          ticker,
          backTest: currentBackTest._id,
          type: TradeType.BackTest,
          status: TradeStatus.Active,
          direction: TradeDirection.Long,
        })

        await this._createNewOrder(ticker, orderType, newTrade, orderPrice)

        currentBackTest.trades.push(newTrade)
        await currentBackTest.save()

        return true


      }

    }
    catch (error) {
      console.error(error);
      return false
    }


  }

  public prepareBackTestData = (tickers: string[]) => {

    // This function will slice the data and set all of the analyzed symbols into the same startingPoint

    const newData = this.backTestSymbolsData

    const startingDate = this.getStartingDate(tickers)

    for (const ticker of tickers) {

      const quotes = newData[ticker].quotes

      if (!quotes) {
        throw new Error(`Error while preparing backtest data. Quotes for symbol ${ticker} not found!`)
      }

      const startingDateIndex = quotes.findIndex((quote) => {
        if (quote.date.toISOString() === startingDate.toISOString()) {
          return true
        }
      })


      const preparedQuotes = _.slice(quotes, startingDateIndex, quotes.length);

      newData[ticker].quotes = preparedQuotes
      newData[ticker].quotesDictionary = _.keyBy(preparedQuotes, (quote) => DateHelper.indicatorFormat(quote.date))

    }
    return newData
  }

  public getStartingDate = (tickers: string[]) => {

    // Get a common starting date, where all assets have data to be analyzed

    const firstDates: Date[] = []

    for (const ticker of tickers) {
      const firstDate = this.backTestSymbolsData[ticker].quotes![0].date
      firstDates.push(firstDate)
    }

    const maxDate = firstDates.reduce(function (a, b) { return a > b ? a : b; });

    console.log(`🤖 Initializing backtest on ${moment(maxDate).format(DEFAULT_FORMATTED_DATE)}, since that's the point where all analyzed assets have data.`);

    return maxDate


  }

  public updateBackTestAfterTrade = async (currentCapital: number, currentBackTestId: string, currentTradeId: string) => {
    const currentTrade = await Trade.findOne({ _id: currentTradeId })
    const currentBackTest = await BackTest.findOne({ _id: currentBackTestId });

    if (currentBackTest && currentTrade) {
      currentBackTest.currentCapital = currentCapital
      currentBackTest.totalTrades++
      if (currentTrade.daysDuration > 0) {
        currentBackTest.totalTradingDays += currentTrade.daysDuration
      }

      const latestCapital = currentBackTest.capitalHistory[currentBackTest.capitalHistory.length - 1]?.currentCapital || currentCapital

      if (currentTrade.exitDate) {
        currentBackTest.capitalHistory = [
          ...currentBackTest.capitalHistory,
          {
            date: currentTrade.exitDate,
            currentCapital,
            variation: ((currentCapital / latestCapital) - 1) * 100
          }
        ]
      }

      currentBackTest.totalCommission += currentTrade.commission
      await currentBackTest.save()
    }
  }

  public calculateBackTestMetrics = async (priceData: IQuote[], currentBackTestId: string) => {

    const winnerTrades = await Trade.find({
      profitLoss: {
        $gt: 0
      }
    })
    const loserTrades = await Trade.find({
      profitLoss: {
        $lte: 0
      }
    })
    const winnerTradesCount = winnerTrades.length
    const loserTradesCount = loserTrades.length
    const totalTradesCount = winnerTradesCount + loserTradesCount

    const winnerTradesSum = _.sumBy(winnerTrades, 'profitLoss')
    const loserTradesSum = _.sumBy(loserTrades, 'profitLoss')

    try {
      const backtest = await BackTest.findOne({
        _id: currentBackTestId
      })

      if (!backtest) {
        console.log('Failed to fetch BackTest from BackTestId');
        return
      }


      const firstPrice = priceData[0].close;
      const lastPrice = priceData[priceData.length - 1].close
      const firstDay = moment(priceData[0].date);
      const lastDay = moment(priceData[priceData.length - 1].date)
      const highestCapitalPoint = _.maxBy(backtest.capitalHistory, 'currentCapital')?.currentCapital
      const lowestCapitalPoint = _.minBy(backtest.capitalHistory, 'currentCapital')?.currentCapital


      backtest.maxDrawdown = (highestCapitalPoint! - lowestCapitalPoint!)
      backtest.maxDrawdownPercentage = NumberHelper.format((backtest.maxDrawdown / highestCapitalPoint!) * 100)
      backtest.largestSingleLosingTrade = _.minBy(loserTrades, 'profitLoss')!.profitLoss
      backtest.largestSingleWinningTrade = _.maxBy(winnerTrades, 'profitLoss')!.profitLoss
      backtest.grossProfit = winnerTradesSum
      backtest.grossLoss = loserTradesSum;
      backtest.totalNetProfit = winnerTradesSum - loserTradesSum
      backtest.totalNetProfitPercentage = NumberHelper.format((backtest.totalNetProfit / backtest.initialCapital) * 100)
      backtest.totalTrades = winnerTradesCount + loserTradesCount
      backtest.totalDays = lastDay.diff(firstDay, 'days')
      backtest.avgTradesPerDay = backtest.totalTrades / backtest.totalDays
      backtest.buyAndHoldROI = NumberHelper.format(((lastPrice / firstPrice) - 1) * 100)
      backtest.buyAndHoldROIPerDay = (backtest.buyAndHoldROI / backtest.totalDays) * 100
      backtest.ROI = NumberHelper.format((((backtest.currentCapital / backtest.initialCapital) - 1) * 100))
      backtest.buyAndHoldROIPerYear = backtest.buyAndHoldROI / (backtest.totalDays / 365)
      backtest.ROIPerDay = (backtest.ROI / backtest.totalTradingDays) * 100;
      backtest.ROIPerYear = backtest.ROI / (backtest.totalTradingDays / 365)
      backtest.winnerTradesPercentage = NumberHelper.format(((winnerTradesCount / totalTradesCount) * 100))
      backtest.loserTradesPercentage = NumberHelper.format(((loserTradesCount / totalTradesCount) * 100))
      backtest.avgWinnerProfit = NumberHelper.format(winnerTradesSum / winnerTradesCount)
      backtest.avgLoserLoss = NumberHelper.format(loserTradesSum / loserTradesCount)
      backtest.expectancy = NumberHelper.format(((backtest.winnerTradesPercentage / 100 * Math.abs(backtest.avgWinnerProfit)) - (backtest.loserTradesPercentage / 100 * Math.abs(backtest.avgLoserLoss))))
      backtest.totalCommissionPercentageFinalCapital = NumberHelper.format((backtest.totalCommission / backtest.currentCapital) * 100)


      // sharpe ratio
      const variationHistory = backtest.capitalHistory.map((data) => data.variation).filter((variation) => variation !== 0)
      const stdDevROI = mathjs.std(variationHistory)
      const ROIPerYearPercentual = (backtest.ROIPerYear / 100)
      backtest.sharpeRatio = (ROIPerYearPercentual - RISK_FREE_RETURN) / (stdDevROI / 100)

      await backtest.save()

    }
    catch (error) {
      console.error(error);

    }


  }

}