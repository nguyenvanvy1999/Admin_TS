import { Document } from 'mongoose';
export type DeviceDocument = {
	name: string;
	deviceID: string;
	deviceModel: string;
	deviceType: string;
	info: any;
};

export interface IDeviceDocument extends DeviceDocument, Document {
	_id: string;
}
