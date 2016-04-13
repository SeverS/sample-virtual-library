import {init as modelsInit} from './models';
import {init as serverInit} from './server';

(function bootstrap () {
	let initiators = [];
	initiators.push(modelsInit());
	return Promise.all(initiators).then(() => {
		serverInit();
	}).catch(reason => {
		console.log(reason && reason.stack);
	});
})();