import { IPositionSizingResult } from '../typescript/positionsizing.types';



export class PositionSizingHelper {

  public static ATRPositionSizing = (totalCapital: number, maxPercentageRiskPerTrade: number = 1, closePrice: number, ATR: number, ATRMultiple: number = 3): IPositionSizingResult => {

    // More info: https://therichmoose.com/post20180928/
    // suggested to use the 20 day ATR value
    // ATR Multiple: can be 3 or 5

    const capitalRiskPerTrade = totalCapital * (maxPercentageRiskPerTrade / 100)

    const units = capitalRiskPerTrade / (ATR * ATRMultiple)

    const maxAllocation = units * closePrice

    const initialStop = closePrice - (ATR * ATRMultiple)

    return {
      maxAllocation: parseFloat(maxAllocation.toFixed(2)),
      units: parseFloat(units.toFixed(2)),
      initialStop: parseFloat(initialStop.toFixed(2)),
    }
  }

}