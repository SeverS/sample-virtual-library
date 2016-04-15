import Waterline from 'waterline';
import config from 'config';

let Book = Waterline.Collection.extend({
	identity: 'book',
  connection: config.orm.defaultConnection,

	attributes: {
		name: {
			type: 'string',
			required: true,
			unique: config.api.uniqueBookNames
		},
		description: 'string',
		author: {
			type: 'string',
			required: true
		},
		type: {
			type: 'string',
			required: true
		},
		isbn: 'string'
}
});

export default Book;