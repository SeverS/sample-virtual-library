// authorization middleware
// Should verify the validity of the
// apikey and set the right headers.
import config from 'config';
import models from '../models';

export default function Authorization(req, res, next) {
	if(config.api.authorizeRequests) {
		return autorize(req, res, next);
	}
	return next()
}

function autorize(req, res, next) {
	// verify if it`s preflight request
	if(req.method === 'OPTIONS' && req.headers['x-api-key']) {
		// verify api key
		models.client.findByApikey(req.headers['x-api-key'], (err, client) => {
			if(err || client.length === 0) {
				return res.status(401).send('unauthorized');
			} else {
				res.header("Access-Control-Allow-Origin", req.headers.origin);
	  			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
				return res.status(200).send({ok: true});
			}

		});
	} else {
		return next();
	}

}