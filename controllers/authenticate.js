import passport from 'passport';
import {BasicStrategy} from 'passport-http';
import models from '../models';

passport.use(new BasicStrategy((username, password, cb) => {
	models.client.findOne({username}, (err, user) => {
		if(err) return cb(err);

		if(!user) return cb(null, false);

		user.checkPassword(password, (err, matching) => {
			if(err) return cb(err);

			if(!matching) return cb(null, false);

			return cb(null, user.toJSON());
		});
	});
}));

export default passport.authenticate('basic', {session: false});
