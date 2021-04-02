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
		this.router.get('/', authJWT, AdminController.adminProfile);
		this.router.get('/all', authJWT, AdminController.getAllAdmin);
		this.router.get('/:email', authJWT, AdminController.getAdminByEmail);
		this.router
			.route('/user')
			.all(authJWT)
			.get(AdminController.searchUser)
			.delete(AdminController.deleteUser)
			.post(AdminController.newUser)
			.put(AdminController.editUserProfile);
		this.router.put('/password', AdminController.editUserPassword);
	}
}

export default new AdminRoute();
