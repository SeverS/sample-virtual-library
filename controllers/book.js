import formatUtils from '../utils/format-utils';
import models from '../models';

const bookController = {
	create(req, res, next) {
		models.book.create(req.body, (err, book) => {
			// pass error to error handler middleware
			if(err) return next(err);
			return res.status(200).json(book);
		});

	},
	list(req, res, next) {
		const query = models.book.find();

		formatUtils.formatQuery(query, req.query).then(results => {
			res.status(200).json(results);
		}).catch(e => {
			const err = e && e.stack;
			return next(err || e);
		});
	},
	read(req, res, next) {
		const bookId = req.params.id;
		models.book.findOneById(bookId).then(book => {
			if(!book || book.length === 0) {
				return res.status(404).json({
					success: true,
					message: 'book not found'
				});
			}
			return res.status(200).json(book);
		}).catch(err => {
			return next(err);
		})
	},
	update(req, res, next) {
		const bookId = req.params.id;

		models.book.update({id: bookId}, req.body).then(updatedBook => {
			if(updatedBook.length === 0) {
				return res.status(404).json({
					success: true,
					message: `Sorry, book with id ${bookId} was not found`
				});
			}
			return res.status(200).json(updatedBook);
		}).catch(err => {
			return next(err);
		});
	},
	destroy(req, res, next) {
		const bookId = req.params.id;
		models.book.destroy({id: bookId}).then(() => {
			res.status(200).json({
				success: true,
				message: `book with id: ${bookId} deleted.`
			});
		}).catch(err => {
			return next(err);
		})
	}
}

export default bookController;