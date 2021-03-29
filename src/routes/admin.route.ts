import { Router } from 'express';
import Route from '../interfaces/route.interface';
import multer from 'multer';
import { authJWT } from '../middlewares/auth.middleware';
import AdminController from '../controllers/admin.controller';

class AdminRoute implements Route {
	public path: string = '/admin';
	public router = Router();
	constructor() {
		this.initializeRoutes();
	}
	private initializeRoutes() {
		this.router.use(multer().none());
		this.router.route('/').post(AdminController.signInAdmin).get(authJWT, AdminController.adminProfile);
		this.router.get('/all', AdminController.findAllAdmin);
		this.router.get('/search', AdminController.findAdmin);
	}
}

export default new AdminRoute();
