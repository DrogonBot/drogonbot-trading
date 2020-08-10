import { IPositionSizingResult } from '@drogonbot/types';

import { NumberHelper } from './NumberHelper';



export class PositionSizingHelper {

  public static ATRPositionSizing = (totalCapital: number, maxPercentageRiskPerTrade: number = 1, closePrice: number, ATR: number, ATRMultiple: number = 3): IPositionSizingResult => {

    // More info: https://therichmoose.com/post20180928/
    // suggested to use the 20 day ATR value
    // ATR Multiple: can be 3 or 5

    const capitalRiskPerTrade = totalCapital * (maxPercentageRiskPerTrade / 100)

    const qty = capitalRiskPerTrade / (ATR * ATRMultiple)

    const maxAllocation = qty * closePrice

    const initialStop = closePrice - (ATR * ATRMultiple)

    return {
      maxAllocation: NumberHelper.format(maxAllocation),
      qty: NumberHelper.format(qty),
      initialStop: NumberHelper.format(initialStop),
    }
  }

}