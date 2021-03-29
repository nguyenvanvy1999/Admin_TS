import { Document } from 'mongoose';

export enum Gender {
	male = 'male',
	female = 'female',
	undisclosed = 'undisclosed',
}
export enum Role {
	admin = 'Admin',
	user = 'User',
}
type Address = {
	street: string;
	city: string;
	postCode: string;
};
export type Account = {
	email: string;
	password: string;
};
export type UserDocument = Account & {
	_id: string;
	firstName: string;
	lastName: string;
	gender: Gender;
	address?: Address;
	role: Role;
	info: any;
};
export interface IUserDocument extends Document, UserDocument {
	_id: string;
}
