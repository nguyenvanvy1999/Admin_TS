import { Router } from 'express';
import Route from '../interfaces/route.interface';
import multer from 'multer';
import { authJWT } from '../middlewares/auth.middleware';
import UserController from '../controllers/user.controller';

class UserRoute implements Route {
	public path: string = '/user';
	public router = Router();
	constructor() {
		this.initializeRoutes();
	}
	private initializeRoutes() {
		this.router.use(multer().none());
		this.router.use(authJWT);
		this.router.get('/all', UserController.getAll);
		this.router.get('/search', UserController.profile);
		this.router.route('/').post(UserController.newUser).get(UserController.profile).delete(UserController.deleteUser);
	}
}

export default new UserRoute();
