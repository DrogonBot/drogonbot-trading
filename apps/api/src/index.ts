import { EnvType } from '@drogonbot/types';
import bodyParser from 'body-parser';
import { exec } from 'child_process';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import formData from 'express-form-data';
import http from 'http';
import mongoose from 'mongoose';
import os from 'os';
import path from 'path';

import { UsersCron } from './cron_jobs/user.cron';
import { GlobalMiddleware } from './middlewares/global.middleware';
import { assetRouter } from './resources/Asset/asset.routes';
import { backTestRouter } from './resources/BackTest/backtest.routes';
import { operationRouter } from './resources/Operation/operation.routes';
import { quoteRouter } from './resources/Quote/quote.routes';
import { userRouter } from './resources/User/user.routes';
import { ConsoleColor, ConsoleHelper } from './utils/ConsoleHelper';
import { MixpanelHelper } from './utils/MixpanelHelper';

dotenv.config({ path: path.resolve(__dirname, "../../../.env") })

/*#############################################################|
|  >>> EXPRESS - INITIALIZATION
*##############################################################*/

mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_INITDB_DATABASE}?authSource=admin`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// ! Tip: if nodemon hangs on "EADDRESSINUSE" error, run: "killall node"

const app = express();
const server = http.createServer(app); // socket.io requirement

export const publicDirectory = path.join(__dirname, './public')
export const backupsDirectory = path.join(__dirname, '../backups')
export const scriptsPath = path.join(__dirname, '../scripts')
export const botsTempDirectory = path.join(__dirname, './bots/temp')

app.use(cors())

app.use(express.json()); // << THIS IS REQUIRED TO EXPRESS PARSING JSON DATA

// initialize mixpanel

console.log('Initializing mixpanel...');
MixpanelHelper.init();



/*#############################################################|
|  >>> CRON JOBS
*##############################################################*/

// MainCron.sampleCron();

switch (process.env.ENV) {

  case EnvType.Development:
    // Development only cron jobs
    break;

  case EnvType.Production: // Let's turn on our cron job in production only!

    UsersCron.deleteOldLogs()


    break;
}

/*#############################################################|
|  >>> MIDDLEWARES
*##############################################################*/

// handling formdata

const options = {
  uploadDir: os.tmpdir(),
  autoClean: true
};

// parse data with connect-multiparty.
app.use(formData.parse(options));
// delete from the request all empty files (size == 0)
app.use(formData.format());
// change the file objects to fs.ReadStream
app.use(formData.stream());
// union the body and the files
app.use(formData.union());

app.use(bodyParser.urlencoded({ extended: true }));




// app.use(GlobalMiddleware.enableCors);

if (process.env.MAINTENANCE_MODE === "on") {
  app.use(GlobalMiddleware.maintenanceMode);
}

// allows static files serving
app.use(express.static(publicDirectory, { dotfiles: 'allow' }))


// app.use(middleware.checkMethods);


/*#############################################################|
|  >>> ROUTES
*##############################################################*/


app.use(userRouter);
app.use(operationRouter);
app.use(assetRouter)
app.use(quoteRouter)
app.use(backTestRouter);

server.listen(process.env.NODE_API_PORT, async () => {


  let backgroundColor;
  let foregroundColor;

  switch (process.env.ENV) {
    case EnvType.Development:
    case EnvType.Staging:
      backgroundColor = ConsoleColor.BgYellow;
      foregroundColor = ConsoleColor.FgBlack;
      break;
    case EnvType.Production:
      backgroundColor = ConsoleColor.BgRed;
      foregroundColor = ConsoleColor.FgWhite
      break;
  }

  ConsoleHelper.coloredLog(backgroundColor, foregroundColor, `${process.env.APP_NAME} || Environment: ${process.env.ENV} || port ${process.env.NODE_API_PORT} || Admin email: ${process.env.ADMIN_EMAIL} || Language: ${process.env.LANGUAGE}`)
});


app.on("error", err => {
  // @ts-ignore
  if (err.code === "EADDRINUSE") {
    exec(`killall node`);
  }
});


// Bugfix for proxy error crashes: https://github.com/webpack/webpack-dev-server/issues/1642#issuecomment-523908463
process.on('uncaughtException', function (err) {
  console.log('Uncaught node exception!');
  console.log(err);
});


app.get('/', function (req, res) {
  res.send('Welcome to our server!')
})



/*#############################################################|
|  >>> DB SEEDER
*##############################################################*/

// const seedDb = async () => {

// }
// seedDb();





