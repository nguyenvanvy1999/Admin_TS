import { Request, Response, NextFunction } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
import DeviceService from '../services/device.service';
import UserService from '../services/user.service';
class DeviceController {
	public async newDevice(req: Request, res: Response, next: NextFunction) {
		try {
			const { device, user } = req.body;
			const newDevice = await DeviceService.newDevice(device, user);
			return res.status(200).send({ newDevice });
		} catch (error) {
			next(error);
		}
	}
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
	public async unlinkDevice(req: RequestWithUser, res: Response, next: NextFunction) {
		try {
			const { devicesID } = req.body;
			await DeviceService.unlinkDeviceToUser(devicesID);
			return res.status(200).send({ message: 'Unlink device successfully !' });
		} catch (error) {
			next(error);
		}
	}
	public async getDeviceSameTypeUser(req: RequestWithUser, res: Response, next: NextFunction) {
		try {
			const user = req.user;
			const { deviceType } = req.body;
			const devices = await DeviceService.getDeviceSameType(user._id, deviceType);
			return res.status(200).send({ devices });
		} catch (error) {
			next(error);
		}
	}
	public async getAllDeviceUser(req: RequestWithUser, res: Response, next: NextFunction) {
		try {
			const user = req.user;
			const devices = await DeviceService.getDeviceUser(user._id);
			return res.status(200).send({ devices });
		} catch (error) {
			next(error);
		}
	}
}
export default new DeviceController();
