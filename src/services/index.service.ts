import User from '../models/user.model';
import Admin from '../models/admin.model';
import { IUserDocument } from '../interfaces/user.interface';
import HttpException from '../exceptions/http';
import { check } from '../utils/empty';
import { IAdminDocument } from '../interfaces/admin.interface';

export class IndexService {
	private readonly isAdmin: boolean;
	constructor(isAdmin: boolean) {
		this.isAdmin = isAdmin;
	}
	public async findByEmail(email: string): Promise<IUserDocument | IAdminDocument> {
		try {
			if (this.isAdmin) return await Admin.findOne({ email });
			return await User.findOne({ email });
		} catch (error) {
			throw new HttpException(400, error.message);
		}
	}
	public async findByID(_id: string): Promise<IUserDocument | IAdminDocument> {
		try {
			if (this.isAdmin) return await Admin.findById(_id);
			return await User.findById(_id);
		} catch (error) {
			throw new HttpException(400, error.message);
		}
	}
	public async findAll(): Promise<IUserDocument[] | IAdminDocument[]> {
		try {
			if (this.isAdmin) return Admin.find({});
			return User.find({});
		} catch (error) {
			throw new HttpException(400, error.message);
		}
	}
}
