import User from '../models/user.model';
import { Request, Response, NextFunction } from 'express';
import AdminService from '../services/admin.service';
import { returnToken } from '../utils/jwt';
import { IndexController } from './index.controller';
class AdminController extends IndexController {
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
}

export default new AdminController(true);
