import { Request, Response, NextFunction } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
import DeviceService from '../services/device.service';
import UserService from '../services/user.service';
class DeviceController {
	public async linkDevice(req: RequestWithUser, res: Response, next: NextFunction) {
		try {
			const user = req.user;
			const { devicesID } = req.body;
			await DeviceService.linkDeviceToUser(user._id, devicesID);
			await UserService.addDevices(user.email, devicesID);
			return res.status(200).send({ message: 'Link device successfully!' });
		} catch (error) {
			next(error);
		}
	}
	public async newDevice(req: Request, res: Response, next: NextFunction) {
		try {
			const { device, user } = req.body;
			const newDevice = await DeviceService.newDevice(device, user); //FIXME:
		} catch (error) {
			next(error);
		}
	}
}
export default new DeviceController();
