import models from '../models';

const bookController = {
	create(req, res, next) {
		let bookProps = getBookProps(req);
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
		console.log(req.params)
		models.book.findOneById(bookId).then(book => {
			return res.status(200).send(book);
		}).catch(err => {
			return next(err);
		})
	},
	update(req, res, next) {
		const bookId = req.params.id;
		const bookProps = getBookProps(req);

		models.book.update({id: bookId}, bookProps).then(updatedBook => {
			return res.status(200).send(book);
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
	}
}

// return only supported fields
function getBookProps(req) {
	
	return {
		name,
		author,
		type,
		description,
		isbn
	} = req.body;

}
export default bookController;