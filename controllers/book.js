
const bookController = {
	create(req, res, next) {
		res.send({
			success: true,
			message: 'Not implemented!'
		});
	},
	list(req, res, next) {
		res.send({
			success: true,
			message: 'Not implemented!'
		});
	},
	read(req, res, next) {
		res.send({
			success: true,
			message: 'Hello World!'
		})
	},
	update(req, res, next) {
		res.send({
			success: true,
			message: 'Not implemented!'
		});
	},
	destroy(req, res, next) {
		res.send({
			success: true,
			message: 'Not implemented!'
		});
	}
}

export default bookController;