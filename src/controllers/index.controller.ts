import { Request, Response, NextFunction } from 'express';
import AdminService from '../services/admin.service';
import { RequestWithUser } from '../interfaces/auth.interface';
import UserService from '../services/user.service';
export class IndexController {
	protected readonly isAdmin: boolean;
	constructor(isAdmin: boolean) {
		this.isAdmin = isAdmin;
	}
	public async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			if (this.isAdmin) {
				const admins = await AdminService.findAll();
				return res.status(200).send({ count: admins.length, admins });
			}
			const users = await UserService.findAll();
			return res.status(200).send({ count: users.length, users });
		} catch (error) {
			next(error);
		}
	}
	public async profile(req: RequestWithUser, res: Response, next: NextFunction) {
		try {
			const { email } = req.body || req.user; // get email from req.body for user and from req.user for admin
			if (this.isAdmin) {
				const admin = await AdminService.findByEmail(email);
				return res.status(200).send({ admin });
			}
			const user = await UserService.findByEmail(email);
			return res.status(200).send({ user });
		} catch (error) {
			next(error);
		}
	}
	public async search(req: RequestWithUser, res: Response, next: NextFunction) {
		try {
			if (this.isAdmin) {
				const admins = await AdminService.searchUser(req.body);
				return res.status(200).send({ admins });
			}
			const users = await AdminService.searchUser(req.body);
			return res.status(200).send({ users });
		} catch (error) {
			next(error);
		}
	}
}
