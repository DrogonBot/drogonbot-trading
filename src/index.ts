import { exec } from 'child_process';
import cors from 'cors';
import express from 'express';
import formData from 'express-form-data';
import http from 'http';
import mongoose from 'mongoose';
import os from 'os';
import path from 'path';
import socketio from 'socket.io';

import { EnvType } from './constants/types/env.types';
import { DatabaseCron } from './cron_jobs/database.cron';
import { JobsCron } from './cron_jobs/jobs.cron';
import { RetentionCron } from './cron_jobs/retention.cron';
import { GlobalMiddleware } from './middlewares/global.middleware';
import { conversationRouter } from './resources/Conversation/conversation.routes';
import { countryRouter } from './resources/Country/country.routes';
import { CountrySeeder } from './resources/Country/country.seed';
import { operationRouter } from './resources/Operation/operation.routes';
import { placeRouter } from './resources/Place/place.routes';
import { PlaceSeeder } from './resources/Place/place.seeder';
import { postRouter } from './resources/Post/post.routes';
import { resumeRouter } from './resources/Resume/resume.routes';
import { sectorRouter } from './resources/Sector/sector.routes';
import { SectorSeeder } from './resources/Sector/sector.seeder';
import { userRouter } from './resources/User/user.routes';
import { ConsoleColor, ConsoleHelper } from './utils/ConsoleHelper';
import { MixpanelHelper } from './utils/MixpanelHelper';
import { SocketIOHelper } from './utils/SocketIOHelper';

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
const io = socketio(server); // now we pass this server variable to our server

export const publicDirectory = path.join(__dirname, './public')
export const backupsDirectory = path.join(__dirname, '../backups')
export const scriptsPath = path.join(__dirname, '../scripts')

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
    JobsCron.submitApplications()

    JobsCron.positionsOfInterestPush();
    RetentionCron.inactiveUserReminder()

    const dbCron = new DatabaseCron();
    dbCron.backupAndExport()

    // job crawlers

    JobsCron.jobCrawlersCleaners();
    JobsCron.initializeJobCrawlers();




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

app.use(conversationRouter)
app.use(postRouter)
app.use(placeRouter)
app.use(sectorRouter)
app.use(resumeRouter)
app.use(countryRouter)
app.use(operationRouter)

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

app.get('/', function (req, res) {
  res.send('Welcome to our server!')
})


/*#############################################################|
|  >>> SOCKET.IO
*##############################################################*/


SocketIOHelper.initialize(io);


/*#############################################################|
|  >>> DB SEEDER
*##############################################################*/

const seedDb = async () => {
  await CountrySeeder.seed();
  await PlaceSeeder.seed();
  await SectorSeeder.seed();
}
seedDb();





