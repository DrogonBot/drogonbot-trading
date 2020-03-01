import { exec } from 'child_process';
import cors from 'cors';
import express from 'express';
import formData from 'express-form-data';
import http from 'http';
import mongoose from 'mongoose';
import os from 'os';
import path from 'path';
import socketio from 'socket.io';

import { ENV, serverConfig } from './constants/env';
import { EnvType } from './constants/server.constants';
import { DatabaseCron } from './cron_jobs/database.cron';
import { JobsCron } from './cron_jobs/jobs.cron';
import { GlobalMiddleware } from './middlewares/global.middleware';
import { conversationRouter } from './resources/Conversation/conversation.routes';
import { countryRouter } from './resources/Country/country.routes';
import { CountrySeeder } from './resources/Country/country.seed';
import { placeRouter } from './resources/Place/place.routes';
import { PlaceSeeder } from './resources/Place/place.seeder';
import { postRouter } from './resources/Post/post.routes';
import { resumeRouter } from './resources/Resume/resume.routes';
import { sectorRouter } from './resources/Sector/sector.routes';
import { SectorSeeder } from './resources/Sector/sector.seeder';
import { taskRouter } from './resources/Task/task.routes';
import { userRouter } from './resources/User/user.routes';
import { MixpanelHelper } from './utils/MixpanelHelper';
import { SocketIOHelper } from './utils/SocketIOHelper';

mongoose.connect(serverConfig.app.mongodbConnectionUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

/*#############################################################|
|  >>> EXPRESS - INITIALIZATION
*##############################################################*/

// ! Tip: if nodemon hangs on "EADDRESSINUSE" error, run: "killall node"

const app = express();
const server = http.createServer(app); // socket.io requirement
const io = socketio(server); // now we pass this server variable to our server

const port = process.env.PORT || serverConfig.app.port;

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
// RetentionCron.inactiveUserReminder()

switch (ENV) {
  case EnvType.Production: // Let's turn on our cron job in production only!
    JobsCron.submitApplications()
    const dbCron = new DatabaseCron();
    dbCron.backupAndExport()
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

if (serverConfig.maintenanceMode) {
  app.use(GlobalMiddleware.maintenanceMode);
}

// allows static files serving
app.use(express.static(publicDirectory, { dotfiles: 'allow' }))


// app.use(middleware.checkMethods);

/*#############################################################|
|  >>> ROUTES
*##############################################################*/


app.use(userRouter);
app.use(taskRouter);
app.use(conversationRouter)
app.use(postRouter)
app.use(placeRouter)
app.use(sectorRouter)
app.use(resumeRouter)
app.use(countryRouter)

server.listen(port, () => {
  // tslint:disable-next-line: no-console
  console.log(`*** Server is running on port ${port} || ${ENV} ***`);
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





