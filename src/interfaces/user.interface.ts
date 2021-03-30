import { Document } from 'mongoose';

export enum Gender {
	male = 'male',
	female = 'female',
	undisclosed = 'undisclosed',
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
	info: any;
	devices: string[];
};
export interface IUserDocument extends Document, UserDocument {
	_id: string;
}
