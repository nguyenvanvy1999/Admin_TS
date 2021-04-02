import { Request, Response, NextFunction } from 'express';
import AdminService from '../services/admin.service';
import { returnToken } from '../utils/jwt';
import { RequestWithUser } from '../interfaces/auth.interface';
import UserService from '../services/user.service';
import { get } from 'mongoose';
import HttpException from '../exceptions/http';
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
	public async adminProfile(req: RequestWithUser, res: Response, next: NextFunction) {
		try {
			const admin = req.user;
			return res.status(200).send({ admin });
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
	public async searchUser(req: Request, res: Response, next: NextFunction) {
		try {
			const users = await UserService.searchUser(req.body);
			return res.status(200).send({ users });
		} catch (error) {
			next(error);
		}
	}
	public async editUserPassword(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, password } = req.body;
			const user = await UserService.getUserByEmail(email);
			if (!user) throw new HttpException(400, 'Not found user!');
			await UserService.editPassword(email, password);
			return res.status(200).send({ message: 'Changer password successfully!' });
		} catch (error) {
			next(error);
		}
	}
	public async editUserProfile(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, password } = req.body;
			const user = await UserService.getUserByEmail(email);
			if (!user) throw new HttpException(400, 'Not found user!');
			await UserService.editPassword(email, password);
			return res.status(200).send({ message: 'Changer password successfully!' });
		} catch (error) {
			next(error);
		}
	}
}

export default new AdminController();
