import config from 'config';
import fs from 'fs';

// error handler
// will log errors to file
// the path of the file should be configurable

export default function(err, str, req, res) {
	const errorStatus = err.status || 500;

	let message = {
		ok: false,
		message: str,
		url: req.url
	};

	console.log(message);
}