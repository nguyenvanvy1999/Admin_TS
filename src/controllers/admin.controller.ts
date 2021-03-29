import User from '../models/user.model';
import { Request, Response, NextFunction } from 'express';
import AdminService from '../services/admin.service';
import { returnToken } from '../utils/jwt';
import { RequestWithUser } from '../interfaces/auth.interface';
class AdminController {
	public async signInAdmin(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, password } = req.body;
			const user = await AdminService.signIn(email, password);
			const token = returnToken(user);
			return res.status(200).send({ token });
		} catch (error) {
			next(error);
		}
	}
	public async adminProfile(req: RequestWithUser, res: Response, next: NextFunction) {
		try {
			const { email } = req.user;
			const admin = await AdminService.findByEmail(email);
			return res.status(200).send({ admin });
		} catch (error) {
			next(error);
		}
	}
	public async findAdmin(req: Request, res: Response, next: NextFunction) {
		try {
			const { email } = req.body;
			const admin = await AdminService.findByEmail(email);
			return res.status(200).send({ admin });
		} catch (error) {
			next(error);
		}
	}
	public async findAllAdmin(req: Request, res: Response, next: NextFunction) {
		try {
			const { email } = req.body;
			const admins = await AdminService.findAll();
			return res.status(200).send({ admins });
		} catch (error) {
			next(error);
		}
	}
}

export default new AdminController();
