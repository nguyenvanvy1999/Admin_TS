import UserService from '../services/user.service';
import { Request, Response, NextFunction } from 'express';
import { IndexController } from './index.controller';
class UserController extends IndexController {
	public async newUser(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await UserService.newUser(req.body);
			return res.status(200).send({ message: 'Create new user success' });
		} catch (error) {
			next(error);
		}
	}
	public async deleteUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { email } = req.body;
			await UserService.deleteUser(email);
			return res.status(200).send({ message: 'Delete account success' });
		} catch (error) {
			next(error);
		}
	}
}

export default new UserController(false);
