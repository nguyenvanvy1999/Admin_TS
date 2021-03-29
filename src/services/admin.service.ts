import User from '../models/user.model';
import { Role, IUserDocument } from '../interfaces/user.interface';
import HttpException from '../exceptions/http';
import { IndexService } from './index.service';

class AdminService extends IndexService {
	public async signIn(email: string, password: string): Promise<IUserDocument> {
		try {
			const user = await User.findOne({ email });
			if (!user) throw new HttpException(400, 'Email wrong');
			const isPassword = user.comparePassword(password);
			if (!isPassword) throw new HttpException(400, 'Password wrong');
			if (user.role !== Role.admin) throw new HttpException(400, 'No permission');
			return user;
		} catch (error) {
			throw new HttpException(400, error.message);
		}
	}
}

export default new AdminService(true);
