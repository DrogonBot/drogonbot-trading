import _ from 'lodash';

import { DataInterval } from '../../resources/Asset/asset.types';
import { AssetPrice } from '../../resources/AssetPrice/assetprice.model';

export class DonchianChannelHelper {

  public static calculate = async (symbol: string, period: number, interval: DataInterval) => {

    const priceData = await AssetPrice.find({ symbol }).sort({ "date": "asc" })

    const pointer = 0;
    const indexAfterPeriod = period
    const priceAfterPeriod = priceData[indexAfterPeriod]

    console.log(`Starting calculation at ${priceAfterPeriod.date}`);
    const dataPrePeriod = _.slice(priceData, pointer, indexAfterPeriod)
    const dataPostPeriod = _.slice(priceData, indexAfterPeriod, priceData.length - 1)

    console.log('Pre period data');
    console.log(dataPrePeriod);



    return false;




  }



}