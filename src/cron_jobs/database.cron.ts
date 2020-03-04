import fs from 'fs';
import moment from 'moment';
import cron from 'node-cron';

import { backupsDirectory } from '..';
import { TransactionalEmailManager } from '../emails/TransactionalEmailManager';

export class DatabaseCron extends TransactionalEmailManager {

  public backupAndExport = async () => {

    console.log("🕒  DatabaseCron: Initializing... 🕒");

    cron.schedule("0 9 * * *", async () => {

      console.log('Verifying database backup for submission...');


      if (fs.existsSync(backupsDirectory + '/db-dump.zip')) {
        const attachment = fs.readFileSync(backupsDirectory + '/db-dump.zip').toString("base64");

        try {
          console.log('SUBMITTING YOUR DB BACKUP!');
          this.sendGrid.send({
            to: process.env.ADMIN_EMAIL,
            from: process.env.ADMIN_EMAIL,
            subject: `Database Backup - ${moment().format()}`,
            html: 'database backup',
            text: 'database backup',
            attachments: [
              {
                content: attachment,
                filename: "db-dump.zip",
                type: "application/zip",
                disposition: "attachment"
              }
            ]
          });
        }
        catch (error) {
          console.error(error);

        }
      } else {
        console.log('Backup file does not exists on /backups. Aborting!');
      }






    })


  }
}