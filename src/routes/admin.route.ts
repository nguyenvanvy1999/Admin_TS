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
		this.router.route('/signin').post(AdminController.signInAdmin);
		this.router.get('/', authJWT, AdminController.profile);
		this.router.get('/all', AdminController.getAll);
	}
}

export default new AdminRoute();
