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
		author: {
			type: 'string',
			required: true
		},
		type: {
			type: 'string',
			enum: ['ebook', 'paperback', 'hardcover', 'audio'],
			required: true
		},
		description: 'string',
		isbn: 'string'
}
});

export default Book;