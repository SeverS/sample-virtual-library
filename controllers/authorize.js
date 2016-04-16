// authorization middleware
// Should verify the validity of the
// apikey and set the right headers.
import config from 'config';
import models from '../models';

export default function Authorization(req, res, next) {
	if(config.api.authorizeRequests) {
		return autorize(req, res, next);
	}
	return next();
}

function autorize(req, res, next) {
	// verify if it`s preflight request
	if(req.method === 'OPTIONS') {
		if(req.headers['access-control-request-method'] !== 'GET') {
			if(req.headers['access-control-request-headers'].indexOf('x-api-key') != -1) {
				res.header("Access-Control-Allow-Origin", req.headers.origin);
				res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Cache-Control, Accept, X-Api-Key");
				return next();
			} else {
				// unauthorized
				return res.status(401).json({success: true, message: 'unauthorized'});
			}
		} else {
			//allow get requests without authorization
			res.header("Access-Control-Allow-Origin", req.headers.origin);
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Cache-Control, Accept, X-Api-Key");
			res.header("Allow", "GET");
			return next();
		}
	} else if(req.method !== 'GET') {
		// assuming that post, put, delete requests must be authorized
		if(req.headers['x-api-key']) {
			models.client.findByApikey(req.headers['x-api-key'], (err, client) => {
				if(err || client.length === 0) {
					return res.status(401).json({success: true, message: 'unauthorized'});
				} else {
					res.header("Access-Control-Allow-Origin", req.headers.origin);
		  			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-api-key");
					return next();
				}
			});

		} else {
			return res.status(401).json({success: true, message: 'unauthorized'})
		}

	} else {
		// we are a public library so you can get and list books freely :)
		res.header("Access-Control-Allow-Origin", req.headers.origin);
		res.header("Allow", "GET");
		return next();
	}

}

