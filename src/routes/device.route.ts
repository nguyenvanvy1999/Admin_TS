import { Router } from 'express';
import DeviceController from '../controllers/device.controller';
import Route from '../interfaces/route.interface';

class DeviceRoute implements Route {
	public path: string = '/device';
	public router = Router();
	constructor() {
		this.initializeRoutes();
	}
	private initializeRoutes() {
		this.router.get('/', DeviceController.getAllDeviceUser);
	}
}
export default new DeviceRoute();
