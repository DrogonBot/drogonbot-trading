import cron from 'node-cron';

export class MainCron {
  public static sampleCron() {
    console.log("🕒  MainCron => cron example... 🕒");

    cron.schedule("* * * * *", function () {
      console.log("This is a cron sample");
    });
  }
}
