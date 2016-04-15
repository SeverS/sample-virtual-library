import models from '../models';

const bookController = {
	create(req, res, next) {
		const bookProps = bookController._getBookProps(req);
		models.book.create(bookProps, (err, book) => {
			// pass error to error handler middleware
			if(err) return next(err);
			return res.status(200).send(book);
		});

	},
	list(req, res, next) {
		res.send({
			success: true,
			message: 'Not implemented!'
		});
	},
	read(req, res, next) {
		const bookId = req.params.id;
		models.book.findOneById(bookId).then(book => {
			return res.status(200).send(book);
		}).catch(err => {
			return next(err);
		})
	},
	update(req, res, next) {
		const bookId = req.params.id;
		const bookProps = bookController._getBookProps(req);

		models.book.update({id: bookId}, bookProps).then(updatedBook => {
			if(updatedBook.length === 0) {
				return res.status(200).send({
					ok: true,
					message: `Sorry, book with id ${bookId} was not found`
				});
			}
			return res.status(200).send(updatedBook);
		}).catch(err => {
			return next(err);
		});
	},
	destroy(req, res, next) {
		const bookId = req.params.id;
		models.book.destroy({id: bookId}).then(() => {
			res.status(200).send({
				ok: true,
				message: `book with id: ${bookId} deleted.`
			});
		}).catch(err => {
			return next(err);
		})
	},
	// return only supported fields
	_getBookProps(req) {
		return {
			name: req.body.name,
			author: req.body.author,
			type: req.body.type,
			description: req.body.description,
			isbn: req.body.description
		};
	}
}

export default bookController;