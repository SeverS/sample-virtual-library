import express from 'express';
import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';
import Models from './models';
import bodyParser from 'body-parser';
// logging libs
import fileStreamRotator from 'file-stream-rotator';
import morgan from 'morgan';
// configuration library
import config from 'config';
import debug from 'debug';
// routes
import router from './router';
import errorHandler from 'errorhandler';
import errorLogger from './utils/error-logger';
import authorizationController from './controllers/authorize';

const accessLog = fileStreamRotator.getStream({
    filename: `logs/access-log-%DATE%.log`,
    frequency: 'daily',
    verbose: false,
    date_format: 'YYYY-MM-DD'
});

const app = express();

// access logs
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms', {stream: accessLog}));

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.use(`/${config.api.prefix}/book`, authorizationController);

// mount router middleware
app.use(`/${config.api.prefix}`, router);

app.use(errorHandler({log: errorLogger}));

const credentials = {
  key: fs.readFileSync('certificates/private.pem'),
  cert: fs.readFileSync('certificates/public.pem')
};

export function init() {
  console.log('initializing server..');
	if(config.useSSL) {
		https.createServer(credentials, app)
			 .listen(config.serverPort, config.serverHost, () => {
				console.log('------------------------------------');
				console.log(`Server listening on https://${config.serverHost}:${config.serverPort}`);
				console.log('------------------------------------');
			 });
	} else {
		http.createServer(app)
			.listen(config.serverPort, config.serverHost, () => {
				console.log('------------------------------------');
				console.log(`Server listening on http://${config.serverHost}:${config.serverPort}`);
				console.log('------------------------------------');
			});
	}

};
