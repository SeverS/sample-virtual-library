import crypto from 'crypto';
import config from 'config';

class idGenerator {
	static generateApiKey() {
		return crypto.createHash('sha256', config.api.secret).update(crypto.randomBytes(10)).update('salt').digest('hex');
	}
}

export default idGenerator;