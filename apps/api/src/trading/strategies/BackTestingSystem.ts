import {
  DEFAULT_ATR_MULTIPLE,
  DEFAULT_BROKER_COMMISSION,
  DEFAULT_FORMATTED_DATE,
  DEFAULT_INITIAL_CAPITAL,
  RISK_FREE_RETURN,
  TradingDataInterval,
} from '@drogonbot/constants';
import { ConsoleColor, ConsoleHelper, DateHelper, NumberHelper, PositionSizingHelper } from '@drogonbot/helpers';
import {
  BackTestActions,
  IBackTestTickerDictionary,
  IBackTestTradeDictionary,
  IQuote,
  ITradeModel,
  OrderExecutionType,
  OrderStatus,
  OrderType,
  TradeDirection,
  TradeStatus,
  TradeType,
} from '@drogonbot/types';
import _ from 'lodash';
import * as mathjs from 'mathjs';
import moment from 'moment';

import { BackTest, IBackTestModel } from '../../resources/BackTest/backtest.model';
import { Order } from '../../resources/Order/order.model';
import { Trade } from '../../resources/Trade/trade.model';
import { TradingSystem } from './TradingSystem';

export class BackTestingSystem extends TradingSystem {

  public backTestTickerDictionary: IBackTestTickerDictionary
  public currentBackTestId: string | null
  public isBackTestRunning: boolean
  public backTestTradeDictionary: IBackTestTradeDictionary


  constructor() {
    super();
    this.backTestTickerDictionary = {}
    this.currentBackTestId = null
    this.isBackTestRunning = false;
    this.backTestTradeDictionary = {}
  }

  // ! MAIN BACKTESTING FUNCTIONS

  public startBackTesting = async (tickers: string[], interval: TradingDataInterval, initialCapital: number = DEFAULT_INITIAL_CAPITAL) => {

    this.isBackTestRunning = true; // this will be used to stop the backtest later on

    for (const ticker of tickers) {
      console.log(`BackTest: Fetching data for ${ticker}. Please wait...`);
      const quotes = await this.fetchPriceData(ticker, interval)


      if (!quotes) {
        throw new Error(`BackTest: failed to fetch data for ${ticker}. Please, make sure you have data for it, first!`)
      }

      this.backTestTickerDictionary = {
        ...this.backTestTickerDictionary,
        [ticker]: {
          indicators: {},
          quotes, // we use "quotes" to calculate indicators
          quotesDictionary: {} // and our "quotesDictionary" to loop through data based on dates, more efficiently
        }
      }
    }

    // prepare date (set all date ticker "needles" to the same point in time)

    this.backTestTickerDictionary = this.prepareBackTestData(tickers)

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

      if (!this.backTestTickerDictionary || !this.currentBackTestId) {
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

    let finishedTickers = 0
    const totalTickers = tickers.length

    while (this.isBackTestRunning) {

      if (finishedTickers === totalTickers) {
        this.isBackTestRunning = false
        return
      }

      for (const ticker of tickers) {

        const quotes = this.backTestTickerDictionary[ticker].quotes
        const lastQuote = quotes[quotes.length - 1]
        const isLastQuoteDate = DateHelper.indicatorFormat(lastQuote.date) === periodNow
        if (isLastQuoteDate) {
          ConsoleHelper.coloredLog(ConsoleColor.BgYellow, ConsoleColor.FgBlack, `🤖: Finished backtest for ${ticker} on ${periodNow}!`)
          finishedTickers++
        }

        const quotesDictionary = this.backTestTickerDictionary[ticker].quotesDictionary
        if (!quotesDictionary) {
          throw new Error(`Failed to find quotesDictionary data for ${ticker}`)
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

  private _cancelPreviousSimilarOrders = async (trade: ITradeModel, currentOrderId: string, orderExecutionType: OrderExecutionType) => {

    // fetch all orders on this trade ID, that have this executionType

    try {
      const orders = await Order.find({
        trade: trade._id,
        executionType: orderExecutionType
      })

      for (const order of orders) {
        if (!order._id.equals(currentOrderId)) {
          console.log(`Cancelling order price ${order.price}, because a new one was set.`);
          order.status = OrderStatus.Cancelled
          await order.save();
        }
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  private _updateBackTestTradeDetailsDictionary = (ticker: string, payload: object) => {

    // This dictionary is used to store some useful trade details on class memory. It aims to avoid fetching it on database all the time, consuming our machine resources

    this.backTestTradeDictionary = {
      ...this.backTestTradeDictionary,
      [ticker]: {
        ...this.backTestTradeDictionary[ticker],
        ...payload
      }
    }
  }

  private _createBackTestOrder = async (ticker: string, currentBackTest: IBackTestModel, orderType: OrderType, orderExecutionType: OrderExecutionType, trade: ITradeModel, orderPrice: number, orderDate: Date, maxRiskPerTrade?: number, ATRNow?: number) => {
    const newOrder = new Order({
      ticker,
      trade: trade._id,
      date: orderDate,
      type: orderType,
      executionType: orderExecutionType,
      price: orderPrice,
      status: orderExecutionType !== OrderExecutionType.Market ? OrderStatus.Pending : OrderStatus.Filled
    })

    await newOrder.save()


    // Market orders are generally executed at the time they're set. For BackTesting purposes, let's consider that they are always filled once set
    if (orderExecutionType === OrderExecutionType.Market) {

      switch (orderType) {
        case OrderType.Buy:

          // calculate position sizing based on ATR
          const { maxAllocation,
            qty,
            initialStop } = PositionSizingHelper.ATRPositionSizing(currentBackTest.currentCapital, maxRiskPerTrade, orderPrice, ATRNow!, DEFAULT_ATR_MULTIPLE)



          // check if we actually have enough capital to afford this order

          if (maxAllocation <= currentBackTest.currentCapital) {

            // if we can afford it, execute buy

            ConsoleHelper.coloredLog(ConsoleColor.BgGreen, ConsoleColor.FgWhite, `💰: Adding BUY order to ${ticker} on ${DateHelper.format(orderDate)}!`);

            newOrder.allocatedCapital = maxAllocation
            newOrder.quantity = qty;
            await newOrder.save();
            trade.orders.push(newOrder)

            this._updateBackTestTradeDetailsDictionary(ticker, {
              isTradeInProgress: true
            })

            // update currentCapital
            currentBackTest.currentCapital -= newOrder.allocatedCapital
            await currentBackTest.save();

            // set latest start order to filled
            const latestOrder = await Order.findOne({
              ticker, executionType: OrderExecutionType.Start, $or: [
                { status: OrderStatus.PartiallyFilled },
                { status: OrderStatus.Pending },
              ]
            })
            if (latestOrder) {
              console.log(`Setting start order: ${latestOrder.price} to FILLED!`);
              latestOrder.status = OrderStatus.Filled
              await latestOrder.save();
            }

            // set some trade metrics
            trade.entryPrice = orderPrice;
            trade.startPrice = orderPrice;
            trade.stopPrice = initialStop;
            trade.entryDate = orderDate;



            ConsoleHelper.coloredLog(ConsoleColor.BgYellow, ConsoleColor.FgWhite, `🛑: Adding STOP order to ${ticker} on ${DateHelper.format(orderDate)}, price ${initialStop}!`);

            // set stop order
            await this._createBackTestOrder(ticker, currentBackTest, OrderType.Sell, OrderExecutionType.StopLoss, trade, initialStop, orderDate)
          } else {
            // show error
            console.log("Skipping buy order. We don't have enough money to execute this!");
          }

          await trade.save()
          break;
      }

    }



    // if its a start or stop order, we should save it in a dictionary, to avoid frequent fetches in our database

    switch (orderExecutionType) {

      case OrderExecutionType.Start:

        trade.orders.push(newOrder)
        await trade.save()
        // cancel previous start orders
        await this._cancelPreviousSimilarOrders(trade, newOrder._id, OrderExecutionType.Start)

        this._updateBackTestTradeDetailsDictionary(ticker, {
          tradeId: trade._id,
          startPrice: orderPrice
        })
        break;

      case OrderExecutionType.StopLoss:

        trade.orders.push(newOrder)
        await trade.save()
        // cancel previous stoploss orders
        await this._cancelPreviousSimilarOrders(trade, newOrder._id, OrderExecutionType.StopLoss)

        this._updateBackTestTradeDetailsDictionary(ticker, {
          tradeId: trade._id,
          stopPrice: orderPrice
        })
        break;

    }




  }

  public placeBackTestOrder = async (ticker: string, orderType: OrderType, orderExecutionType: OrderExecutionType, orderPrice: number, orderDate: Date, maxRiskPerTrade: number, ATRNow: number) => {

    try {
      const currentBackTest = await BackTest.findOne({ _id: this.currentBackTestId }).populate('trades')

      if (!currentBackTest) {
        throw new Error("Failed to find BackTest while trying to buy asset")
      }

      const activeTrade = currentBackTest.trades.find((trade) => (trade.status === TradeStatus.Active) && trade.ticker === ticker)

      if (activeTrade) {
        console.log("Active trade found, creating new order");
        // if there's already an active trade, lets just create an order for a start

        await this._createBackTestOrder(ticker, currentBackTest, orderType, orderExecutionType, activeTrade, orderPrice, orderDate, maxRiskPerTrade, ATRNow)


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

        await this._createBackTestOrder(ticker, currentBackTest, orderType, orderExecutionType, newTrade, orderPrice, orderDate, maxRiskPerTrade, ATRNow)

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

    const newData = this.backTestTickerDictionary

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
      const firstDate = this.backTestTickerDictionary[ticker].quotes![0].date
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