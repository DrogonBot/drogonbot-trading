import moment = require('moment');



export class DateTimeHelper {

  public static convertNodeTSToDate(nodeTimestamp: Date, format: string) {
    return moment(nodeTimestamp).format(format)
  }


}