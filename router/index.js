import express from 'express';
import controllers from '../controllers';

const router = express.Router();

// client endpoint
router.route('/client')
	.post(controllers.clientController.create)
	.get(controllers.authenticationController, controllers.clientController.read);

// book endpoints
router.route('/book')
	.post(controllers.authorizationController, controllers.bookController.create)
	.get(controllers.bookController.list);

router.route('/book/:id')
	.put(controllers.authorizationController, controllers.bookController.update)
	.delete(controllers.authorizationController, controllers.bookController.destroy)
	.get(controllers.bookController.read)

export default router;