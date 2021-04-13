import { Router } from 'express';
import Route from '../interfaces/route.interface';
import multer from 'multer';
import { authAdmin, authJWT } from '../middlewares/auth.middleware';
import AdminController from '../controllers/admin.controller';
import UserController from '../controllers/user.controller';

class AdminRoute implements Route {
	public path: string = '/admin';
	public router = Router();
	constructor() {
		this.initializeRoutes();
	}
	private initializeRoutes() {
		this.router.use(multer().none());
		this.router.post('/signin', AdminController.signInAdmin);
		this.router.get('/', authJWT, UserController.userProfile);
		this.router.get('/all', authJWT, AdminController.getAllAdmin);
		this.router.get('/:email', authJWT, AdminController.getAdminByEmail);
		this.router
			.route('/user')
			.all(authJWT, authAdmin)
			.get(AdminController.searchUser)
			.delete(UserController.deleteUser)
			.post(UserController.newUser)
			.put(UserController.editProfile);
		this.router.put('user/password', UserController.editPassword);
	}
}

export default new AdminRoute();
