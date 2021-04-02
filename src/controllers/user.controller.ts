import UserService from '../services/user.service';
import { Request, Response, NextFunction } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
import User from '../models/user.model';
import HttpException from '../exceptions/http';
import { returnToken } from '../utils/jwt';
import bcrypt from 'bcrypt';
class UserController {
	public async newUser(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await UserService.newUser(req.body);
			return res.status(200).send({ message: 'Create new user success' });
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
			const user = req.user;
			return res.status(200).send({ user });
		} catch (error) {
			next(error);
		}
	}
	public async editPassword(req: RequestWithUser, res: Response, next: NextFunction) {
		try {
			const user = req.user;
			const { password } = req.body;
			const isNewPassword = await bcrypt.compare(password, user.password);
			if (isNewPassword) throw new HttpException(400, 'Please change password!');
			await UserService.editPassword(user.email, password);
			return res.status(200).send({ message: 'Edit password successfully !' });
		} catch (error) {
			next(error);
		}
	}
	public async editProfile(req: RequestWithUser, res: Response, next: NextFunction) {
		try {
			const user = req.user;
			await UserService.editProfile(user.email, req.body);
		} catch (error) {
			next(error);
		}
	}
	public async addDevice(req: RequestWithUser, res: Response, next: NextFunction) {
		try {
		} catch (error) {
			next(error);
		}
	}
}
export default new UserController();
