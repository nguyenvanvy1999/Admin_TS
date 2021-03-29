import { Router } from 'express';
import HomeController from '../controllers/home.controller';
import Route from '../interfaces/route.interface';

class IndexRoute implements Route {
	public path = '/';
	public router = Router();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get('/', HomeController.index);
	}
}

export default new IndexRoute();
