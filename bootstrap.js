import {init as modelsInit} from './models';
import {init as serverInit} from './server';
import config from 'config';
import fs from 'fs';
import path from 'path';

const logsDir = path.join(__dirname, config.logsDirectory);

const createFolder = (path) => {
  console.log('creating folder.. ', path);
  return new Promise((resolve, reject) => {
    fs.mkdir(path, (err, folder) => {
      if(err && err.code != 'EEXIST') reject(err);
      return resolve(folder);
    });
  });
}

(function bootstrap() {
  let initiators = [];
  
  initiators.push(createFolder(logsDir));
  // instantiate models
	initiators.push(modelsInit());
  
	return Promise.all(initiators).then(() => {
		serverInit();
	}).catch(reason => {
		console.log(reason && reason.stack);
	});
})();