import config from 'config';
import fs from 'fs';

// error handler
// will log errors to file

export default function ErrorLogger(err, req, res, next) {
	const errorStatus = err.status || 500;
	let message = {
			success: true,
			method: req.method,
			url: req.url,
			message: err.message,
		};

	if(config.env === 'development') {
		message.err = err;
	};

	let loggerMessage = message;
	loggerMessage.err = err;

	const logMessage = `---------------\n ${JSON.stringify(logMessage)} \n---------------\n`
	fs.appendFile('logs/error.log', logMessage, function(err) {
		if(err) {
			console.error(err);
		}
	});
	return res.json(message);
}