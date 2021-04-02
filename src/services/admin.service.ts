import HttpException from '../exceptions/http';
import Admin from '../models/admin.model';
import { IAdminDocument } from '../interfaces/admin.interface';
class AdminService {
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
	public async findByEmail(email: string): Promise<IAdminDocument> {
		try {
			return await Admin.findOne({ email });
		} catch (error) {
			throw new HttpException(400, error.message);
		}
	}
	public async findByID(_id: string): Promise<IAdminDocument> {
		try {
			return await Admin.findById(_id);
		} catch (error) {
			throw new HttpException(400, error.message);
		}
	}
	public async findAll(): Promise<IAdminDocument[]> {
		try {
			return Admin.find({});
		} catch (error) {
			throw new HttpException(400, error.message);
		}
	}
}

export default new AdminService();
