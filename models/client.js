import Waterline from 'waterline';
import config from 'config';
import idGen from '../utils/id-generator';
import models from './index';
import bcrypt from 'bcrypt';


let Client = Waterline.Collection.extend({
	identity: 'client',
  	connection: config.orm.defaultConnection,

	attributes: {
		username: {
			type: 'string',
			required: true,
			minLength: config.api.minUsernameLength
		},
		password: {
			type: 'string',
			required: true,
			minLength: config.api.minPasswordLength
		},
		apikey: {
			type: 'string'
		},
		toJSON() {
			let client = this.toObject();
			client.password = undefined;
			return client;
		},
		checkPassword(plain, cb) {
			bcrypt.compare(plain, this.password, function(err, valid) {
                if (err) { return cb(err); }

                return cb(null, valid);
            });
		}
	},
	beforeCreate: [
        // encrypt password
        function _encryptPassword(values, cb) {
            return models.client.encryptPassword(values, cb);
        },
        function _createApiKey(values, cb) {
        	return models.client.generateApiKey(values, cb);
        }
    ],
    /**
     * User password encryption. Uses bcrypt.
     */
    encryptPassword(values, cb) {
        bcrypt.hash(values.password, 10, function(err, encryptedPassword) {
            if (err) return cb(err);
            values.password = encryptedPassword;
            cb();
        });
    },
    /**
     * Create apikey for api call`s authorization
     */
     generateApiKey(values, cb) {
     	var apiKey = idGen.generateApiKey();
     	values['apikey'] = apiKey;
     	cb();
     }
});

export default Client;