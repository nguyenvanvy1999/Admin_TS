import { Schema, Model, model } from 'mongoose';
import HttpException from '../exceptions/http';
import { IDeviceDocument } from '../interfaces/device.interface';
import { IUserDocument } from '../interfaces/user.interface';
import { schemaOption } from './user.model';
import User from './user.model';

interface IDevice extends IDeviceDocument {
	// methods here
	getUserInfo(): Promise<IUserDocument>;
}

interface IDeviceModel extends Model<IDevice> {
	// statics here
	getDeviceSameType(): Promise<IDeviceDocument>;
}
const DeviceSchema: Schema = new Schema(
	{
		_id: Schema.Types.ObjectId,
		user: { type: Schema.Types.ObjectId, ref: 'User', default: null },
		deviceName: { type: String, required: true },
		deviceID: { type: String, required: true },
		deviceModel: String,
		deviceType: String,
		info: [String],
	},
	schemaOption
);

DeviceSchema.methods.getUserInfo = async function (this: IDevice): Promise<IUserDocument> {
	try {
		return await User.findById({ _id: this.user });
	} catch (error) {
		throw new HttpException(400, error.message);
	}
};

const Device: IDeviceModel = model<IDevice, IDeviceModel>('Device', DeviceSchema);
export default Device;
