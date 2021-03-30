import User from '../models/user.model';
import { UserDocument, IUserDocument } from '../interfaces/user.interface';
import HttpException from '../exceptions/http';
import mongoose from 'mongoose';
import { IndexService } from './index.service';
import { check } from '../utils/empty';
class UserService extends IndexService {
	public async newUser(user: UserDocument): Promise<IUserDocument> {
		try {
			const userDocument = {
				_id: mongoose.Types.ObjectId(),
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
				password: user.password,
				gender: user.gender,
				devices: user.devices,
			};
			const newUser = new User(userDocument);
			return await newUser.save();
		} catch (error) {
			throw new HttpException(400, error.message);
		}
	}
	public async deleteUser(email: string): Promise<IUserDocument> {
		try {
			return await User.findOneAndDelete({ email });
		} catch (error) {
			throw new HttpException(400, error.message);
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
			throw new HttpException(400, error.message);
		}
	}
}
import { format } from 'morgan';

export default new UserService(false);
