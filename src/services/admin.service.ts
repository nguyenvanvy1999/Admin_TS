import HttpException from '../exceptions/http';
import { IndexService } from './index.service';
import Admin from '../models/admin.model';
import { IAdminDocument } from '../interfaces/admin.interface';

class AdminService extends IndexService {
	public async signIn(email: string, password: string): Promise<IAdminDocument> {
		try {
			const admin = await Admin.findOne({ email });
			if (!admin) throw new HttpException(400, 'Email wrong');
			const isPassword = admin.comparePassword(password);
			if (!isPassword) throw new HttpException(400, 'Password wrong');
			return admin;
		} catch (error) {
			throw new HttpException(400, error.message);
		}
	}
}

export default new AdminService(true);
