import User from '../models/user.model';
import mongoose from 'mongoose';
import HttpException from '../exceptions/http';
import { UserDocument, IUserDocument } from '../interfaces/user.interface';
import { check } from '../utils/empty';
import { throwError } from '../middlewares/error.middleware';
class UserService {
	public async newUser(user: UserDocument): Promise<IUserDocument> {
		try {
			const userDocument = {
				_id: mongoose.Types.ObjectId(),
				...user,
			};
			const newUser = new User(userDocument);
			return await newUser.save();
		} catch (error) {
			throwError(error);
		}
	}
	public async getUserByEmail(email: string) {
		try {
			return await User.findOne({ email });
		} catch (error) {
			throwError(error);
		}
	}
	public async deleteUser(email: string): Promise<IUserDocument> {
		try {
			return await User.findOneAndDelete({ email });
		} catch (error) {
			throwError(error);
		}
	}
	public async searchUser(user: UserDocument): Promise<IUserDocument[] | IUserDocument> {
		try {
			const { firstName, lastName } = user;
			if (check(firstName) || check(lastName)) throw new HttpException(400, 'Query failed.Check your data');
			return await User.find({
				$and: [{ firstName: { $regex: firstName } }, { lastName: { $regex: lastName } }],
			});
		} catch (error) {
			throwError(error);
		}
	}
	public async editPassword(email: string, password: string): Promise<IUserDocument> {
		try {
			return await User.findOneAndUpdate({ email }, { password }, { new: true });
		} catch (error) {
			throwError(error);
		}
	}
	public async editProfile(email: string, data: UserDocument): Promise<IUserDocument> {
		try {
			return await User.findOneAndUpdate({ email }, { ...data }, { new: true });
		} catch (error) {
			throwError(error);
		}
	}
	public async addDevices(email: string, devices: string[]): Promise<IUserDocument> {
		try {
			return await User.findOneAndUpdate({ email }, { $push: { devices: { $each: devices } } }, { new: true });
		} catch (error) {
			throwError(error);
		}
	}
}
export default new UserService();
