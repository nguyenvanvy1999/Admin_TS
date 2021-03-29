import User from '../models/user.model';
import { UserDocument, Role, IUserDocument } from '../interfaces/user.interface';
import HttpException from '../exceptions/http';
import { check } from '../utils/empty';

export class IndexService {
	protected readonly role: Role;
	constructor(isAdmin: boolean) {
		if (isAdmin) this.role = Role.admin;
		else this.role = Role.user;
	}
	public async findByEmail(email: string): Promise<IUserDocument> {
		try {
			return await User.findOne({ email, role: this.role });
		} catch (error) {
			throw new HttpException(400, error.message);
		}
	}
	public async findByID(_id: string): Promise<IUserDocument> {
		try {
			return await User.findOne({ _id, role: this.role });
		} catch (error) {
			throw new HttpException(400, error.message);
		}
	}
	public async findAll(): Promise<IUserDocument[]> {
		try {
			return await User.find({ role: this.role });
		} catch (error) {
			throw new HttpException(400, error.message);
		}
	}
	public async searchUser(user: UserDocument): Promise<IUserDocument[] | IUserDocument> {
		try {
			const { firstName, lastName } = user;
			if (check(firstName) || check(lastName)) throw new HttpException(400, 'Query failed.Check your data');
			return await User.find({
				$and: [{ firstName: { $regex: firstName } }, { lastName: { $regex: lastName } }, { role: this.role }],
			});
		} catch (error) {
			throw new HttpException(400, error.message);
		}
	}
}
