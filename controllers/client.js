import models from '../models';

const clientController = {
	create(req, res, next) {
		models.client.create({
			username: req.body.username,
			password: req.body.password
		}).exec((err, user) => {
			if(err) {
				// pass to error handler
				return next(err);
			}
			return res.status(200).send(user.toJSON());
		});
	},
	read(req, res, next) {
		res.send(req.user);
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

export default clientController;