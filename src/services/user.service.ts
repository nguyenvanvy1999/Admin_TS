import User from '../models/user.model';
import { UserDocument, Role, IUserDocument } from '../interfaces/user.interface';
import HttpException from '../exceptions/http';
import mongoose from 'mongoose';
import { IndexService } from './index.service';
class UserService extends IndexService {
	public async newUser(user: UserDocument): Promise<IUserDocument> {
		try {
			const userDocument = {
				_id: mongoose.Types.ObjectId(),
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
				password: user.password,
				role: Role.user,
				gender: user.gender,
			};
			const newUser = new User(userDocument);
			return await newUser.save();
		} catch (error) {
			throw new HttpException(400, error.message);
		}
	}
	public async deleteUser(email: string): Promise<IUserDocument> {
		try {
			return await User.findOneAndDelete({ email, role: Role.user });
		} catch (error) {
			throw new HttpException(400, error.message);
		}
	}
}

export default new UserService(false);
