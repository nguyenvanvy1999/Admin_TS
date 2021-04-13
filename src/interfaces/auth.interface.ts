import { Request } from 'express';
import { UserDocument } from './user.interface';
import { AdminDocument } from './admin.interface';
export type DataStoredInToken = {
	_id: string;
	email: string;
};
export enum Role {
	Admin = 'Admin',
	User = 'User',
}
export type Token = {
	data: DataStoredInToken;
	iat: number;
	exp: number;
};

export interface RequestWithUser extends Request {
	user: UserDocument | AdminDocument;
	role: Role;
}
