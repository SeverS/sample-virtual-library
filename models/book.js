import Waterline from 'waterline';
import config from 'config';

let Book = Waterline.Collection.extend({
	identity: 'book',
  	connection: config.orm.defaultConnection,

	attributes: {
		name: {
			type: 'string',
			unique: config.api.uniqueBookNames
		},
		description: 'string',
		author: 'string',
		type: 'string',
		isbn: 'string'
}
});

export default Book;