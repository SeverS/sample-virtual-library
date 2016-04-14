import {init as modelsInit} from './models';
import {init as serverInit} from './server';
import config from 'config';
import debug from 'debug';

(function bootstrap() {
  let initiators = [];

  // instantiate models
	initiators.push(modelsInit());

	return Promise.all(initiators).then(() => {
		serverInit();
	}).catch(reason => {
		console.log(reason && reason.stack);
	});
})();