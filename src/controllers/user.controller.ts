import UserService from '../services/user.service';
import { Request, Response, NextFunction } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
import User from '../models/user.model';
import HttpException from '../exceptions/http';
import { returnToken } from '../utils/jwt';
import { Role } from '../interfaces/auth.interface';

export class UserController {
	public async newUser(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await UserService.newUser(req.body);
			return res.status(200).send({ user });
		} catch (error) {
			next(error);
		}
	}
	public async deleteUser(req: RequestWithUser, res: Response, next: NextFunction) {
		try {
			// for Admin and User
			let email: string;
			if (req.role === Role.Admin) email = req.body;
			else email = req.user.email;
			await UserService.deleteUser(email);
			return res.status(200).send({ message: 'Delete account success' });
		} catch (error) {
			next(error);
		}
	}
	public async signInUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, password } = req.body;
			const user = await User.findOne({ email });
			if (!user) throw new HttpException(400, 'Email wrong!');
			const isPassword = user.comparePassword(password);
			if (!isPassword) throw new HttpException(400, 'Password wrong!');
			const token = returnToken(user);
			return res.status(200).send({ token });
		} catch (error) {
			next(error);
		}
	}
	public async userProfile(req: RequestWithUser, res: Response, next: NextFunction) {
		try {
			// used to Admin and User
			const user = req.user;
			return res.status(200).send({ user });
		} catch (error) {
			next(error);
		}
	}
	public async editPassword(req: RequestWithUser, res: Response, next: NextFunction) {
		try {
			// used for Admin and User
			const { password } = req.body;
			let email: string;
			if (req.role === Role.Admin) {
				email = req.body.email;
			} else {
				email = req.user.email;
			}
			const user = await UserService.getUserByEmail(email);
			if (!user) throw new HttpException(400, 'No user found !');
			const isNewPassword = user.comparePassword(password);
			if (!isNewPassword) throw new HttpException(400, 'Must be new password');
			await UserService.editPassword(email, User.hashPassword(password));
			return res.status(200).send({ message: 'Changer password successfully!' });
		} catch (error) {
			next(error);
		}
	}
	public async editProfile(req: RequestWithUser, res: Response, next: NextFunction) {
		try {
			if (req.role === Role.Admin) {
				const { email, ...changer } = req.body;
				const user = await UserService.getUserByEmail(email);
				if (!user) throw new HttpException(400, 'Not found user!');
				await UserService.editProfile(email, changer);
			} else {
				const user = req.user;
				await UserService.editProfile(user.email, req.body);
			}
			return res.status(200).send({ message: 'Changer password successfully!' });
		} catch (error) {
			next(error);
		}
	}
}
export default new UserController();
