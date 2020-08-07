import _ from 'lodash';
import moment from 'moment';

import { Quote } from '../../resources/Quote/quote.model';
import { NumberHelper } from '../../utils/NumberHelper';
import { TradingDataInterval } from '../constant/tradingdata.constant';
import { DATE_KEY_FORMAT } from './constant/indicator.constant';
import { IAssetIndicator, IndicatorSeriesType } from './types/indicator.types';




export class MovingAverageHelper {


  public static calculateEMA = async (ticker: string, period: number, seriesType: IndicatorSeriesType, interval: TradingDataInterval) => {

    // should be ascendant, full data
    const priceData = await Quote.find({ ticker, interval }).sort({ "date": "asc" })


    const firstData = _.slice(priceData, 0, period - 1)
    const firstDataSum = firstData.reduce((total, price) => total + price[seriesType], 0);
    const firstSMA = firstDataSum / period

    const k = 2 / (period + 1)
    const firstDate = moment(priceData[0].date).format(DATE_KEY_FORMAT)

    const output: IAssetIndicator[] = [
      {
        interval,
        seriesType,
        period,
        name: "EMA",
        date: firstDate,
        value: firstSMA
      }
    ];


    for (let i = 0; i < priceData.length; i++) {

      const latestEMA = output[output.length - 1].value
      const todayPrice = priceData[i][seriesType]

      const EMA = (todayPrice * k) + (latestEMA * (1 - k))

      output.push({
        interval,
        seriesType,
        period,
        name: "EMA",
        date: moment(priceData[i].date).format(DATE_KEY_FORMAT),
        value: NumberHelper.format(EMA)
      })
    }

    // parse it to support date as key
    const parsedOutput = {}

    for (let i = 0; i < output.length; i++) {
      const date = output[i].date;
      delete output[i].date;
      parsedOutput[date!] = output[i]
    }

    return parsedOutput
  }

  public static calculateSMA = async (ticker: string, interval: TradingDataInterval, period: number, seriesType) => {

    const priceData = await Quote.find({ ticker, interval }).sort({ "date": "asc" })

    let start = 0;
    let end = period;

    const output = {};

    while (priceData[end - 1] !== undefined) {

      const dataSlice = _.slice(priceData, start, end)

      const dataSliceSum = _.sumBy(dataSlice, (data) => data[seriesType])

      const SMA = dataSliceSum / period

      const date = moment(priceData[end - 1].date).format(DATE_KEY_FORMAT)

      output[date] = {
        name: "SMA",
        interval,
        seriesType,
        period,
        date,
        value: NumberHelper.format(SMA)
      }

      start++;
      end++;
    }

    return output;

  }

  public static calculateMACD = async ( ticker:string, interval: TradingDataInterval ) => {
    
    
    const priceData = await Quote.find({ ticker, interval }).sort({ "date": "asc" });
    
    const SHORT_EMA_PERIOD:number = 12;
    const LONG_EMA_PERIOD:number = 26;
    
    const shortEMA = await MovingAverageHelper.calculateEMA( ticker, SHORT_EMA_PERIOD, IndicatorSeriesType.Close, interval );
    const longEMA = await  MovingAverageHelper.calculateEMA( ticker, LONG_EMA_PERIOD, IndicatorSeriesType.Close, interval );
    
    const MACD_PERIOD = 9;
    
    const MACD_INDICATOR_SERIES_TYPE:IndicatorSeriesType = IndicatorSeriesType.Close;
    const output:IAssetIndicator[] = [];

    

    const firstMACDValueSum = priceData
      .slice(0, MACD_PERIOD - 1)
      .map(
        price => {
          let currentQuoteDate = moment(price.date).format(DATE_KEY_FORMAT);
          return shortEMA[currentQuoteDate].value - longEMA[currentQuoteDate].value;
      }).reduce((total, current) => total + current, 0);

    let firstMACDValue = firstMACDValueSum / MACD_PERIOD;
      
    let firstQuoteDate = moment(priceData[0].date).format(DATE_KEY_FORMAT)
    
    let firstMACD:IAssetIndicator = {
      interval,
      seriesType: MACD_INDICATOR_SERIES_TYPE,
      name: "MACD",
      value: firstMACDValue,
      date: firstQuoteDate
    } 
    
    output.push(firstMACD);

    

    const k = 2 / (MACD_PERIOD + 1);
                                  
    for(let currentPriceDataIndex = 0; currentPriceDataIndex < priceData.length ; currentPriceDataIndex++){

      let currentPriceData = priceData[currentPriceDataIndex];

      const date = moment(currentPriceData.date).format(DATE_KEY_FORMAT);
      
      let currentShortEma:IAssetIndicator = shortEMA[date];
      let currentLongEma:IAssetIndicator = longEMA[date];
      let currentShortLongDiff:number = currentShortEma.value - currentLongEma.value;
  
      const previousMACD = output[ output.length - 1];
      let currentOutputValue:number = ( currentShortLongDiff * k ) + ( previousMACD.value * ( 1 - k ) );
     
      let currentOutput:IAssetIndicator = {
        interval,
        seriesType: MACD_INDICATOR_SERIES_TYPE,
        name: "MACD",
        value: currentOutputValue,
        date: date
      };

      output.push(currentOutput);
    }


    // parse it to support date as key
    const parsedOutput = {}

    for (let i = 0; i < output.length; i++) {
      const date = output[i].date;
      delete output[i].date;
      parsedOutput[date!] = output[i]
    }

    return parsedOutput;

  }

}