import UserService from '../services/user.service';
import User from '../models/user.model';
import { Request, Response, NextFunction } from 'express';
import { returnToken } from '../utils/jwt';
import { RequestWithUser } from '../interfaces/auth.interface';
class UserController {
	public async newUser(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await UserService.newUser(req.body);
			return res.status(200).send({ message: 'Create new user success' });
		} catch (error) {
			next(error);
		}
	}
	public async userProfile(req: Request, res: Response, next: NextFunction) {
		try {
			const { email } = req.body;
			const user = await UserService.findByEmail(email);
			return res.status(200).send({ user });
		} catch (error) {
			next(error);
		}
	}
	public async getAllUser(req: Request, res: Response, next: NextFunction) {
		try {
			const users = await UserService.findAll();
			return res.status(200).send(users);
		} catch (error) {
			next(error);
		}
	}
	public async getUser(req: Request, res: Response, next: NextFunction) {
		try {
			const users = await UserService.searchUser(req.body);
			return res.status(200).send({ users });
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

export default new UserController();
