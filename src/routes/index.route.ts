import { Router } from 'express';
import HomeController from '../controllers/home.controller';
import Route from '../interfaces/route.interface';
import AdminController from '../controllers/admin.controller';

class IndexRoute implements Route {
	public path = '/';
	public router = Router();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get('/', HomeController.index);
		this.router.route('/signin').post(AdminController.signInAdmin);
	}
}

export default new IndexRoute();
