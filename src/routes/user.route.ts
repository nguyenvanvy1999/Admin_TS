import { Router } from 'express';
import UserController from '../controllers/user.controller';
import Route from '../interfaces/route.interface';
import { authAdmin, authJWT } from '../middlewares/auth.middleware';

class UserRoute implements Route {
	public path = '/user';
	public router = Router();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post('/signin', UserController.signInUser);
		this.router
			.route('/')
			.all(authJWT)
			.get(UserController.userProfile)
			.put(UserController.editProfile)
			.delete(UserController.deleteUser);
		this.router.put('/password', UserController.editPassword);
	}
}

export default new UserRoute();
