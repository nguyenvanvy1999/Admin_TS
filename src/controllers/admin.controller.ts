import { Request, Response, NextFunction } from 'express';
import AdminService from '../services/admin.service';
import { returnToken } from '../utils/jwt';
import { RequestWithUser, Role } from '../interfaces/auth.interface';
import UserService from '../services/user.service';
class AdminController {
	public async signInAdmin(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, password } = req.body;
			const admin = await AdminService.signIn(email, password);
			const token = returnToken(admin);
			return res.status(200).send({ token });
		} catch (error) {
			next(error);
		}
	}
	public async getAllAdmin(req: RequestWithUser, res: Response, next: NextFunction) {
		try {
			const admins = await AdminService.findAll();
			return res.status(200).send({ length: admins.length, admins });
		} catch (error) {
			next(error);
		}
	}
	public async getAdminByEmail(req: RequestWithUser, res: Response, next: NextFunction) {
		try {
			const { email } = req.params;
			const admin = await AdminService.findByEmail(email);
			return res.status(200).send({ admin });
		} catch (error) {
			next(error);
		}
	}
	public async searchUser(req: Request, res: Response, next: NextFunction) {
		try {
			const users = await UserService.searchUser(req.body);
			return res.status(200).send({ users });
		} catch (error) {
			next(error);
		}
	}
}

export default new AdminController();
