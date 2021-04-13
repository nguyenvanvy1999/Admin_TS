import { Document } from 'mongoose';

export type AdminDocument = {
	_id: string;
	email: string;
	password: string;
	info: any;
};

export interface IAdminDocument extends AdminDocument, Document {
	_id: string;
}
