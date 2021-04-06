import { Router } from 'express';
import Route from '../interfaces/route.interface';
class UserRoute implements Route {
	public path = '/user';
	public router = Router();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {}
}

export default new UserRoute();
