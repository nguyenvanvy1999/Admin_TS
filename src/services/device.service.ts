import Device from '../models/device.model';
import { DeviceDocument, IDeviceDocument } from '../interfaces/device.interface';
import mongoose from 'mongoose';
import { throwError } from '../middlewares/error.middleware';
class DeviceService {
	public async newDevice(device: DeviceDocument, user: string): Promise<IDeviceDocument> {
		try {
			const deviceDocument = {
				_id: mongoose.Types.ObjectId(),
				user: user,
				...device,
			};
			const newDevice = new Device(deviceDocument);
			return await newDevice.save();
		} catch (error) {
			throwError(error);
		}
	}
	public async deleteDevice(deviceID: string): Promise<IDeviceDocument> {
		try {
			return await Device.findOneAndDelete({ deviceID });
		} catch (error) {
			throwError(error);
		}
	}
	public async getDeviceByID(deviceID: string): Promise<IDeviceDocument> {
		try {
			return await Device.findOne({ deviceID });
		} catch (error) {
			throwError(error);
		}
	}
	public async getDeviceSameType(deviceType: string): Promise<IDeviceDocument[]> {
		try {
			return await Device.find({ deviceType });
		} catch (error) {
			throwError(error);
		}
	}
	public async linkDeviceToUser(user: string, devicesID: string[]): Promise<IDeviceDocument> {
		try {
			return await Device.updateMany({ deviceID: { $in: devicesID } }, { user }, { new: true });
		} catch (error) {
			throwError(error);
		}
	}
}
export default new DeviceService();
