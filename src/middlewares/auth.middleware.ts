import { Response, NextFunction } from 'express';
import { RequestWithUser, Role } from '../interfaces/auth.interface';
import { verifyToken } from '../utils/jwt';
import { jwtConfig } from '../configs/jwt';
import HttpException from '../exceptions/http';
import User from '../models/user.model';
import Joi from '../configs/joi';
import Admin from '../models/admin.model';
const schema = Joi.joiJWT.jwt();

export async function authJWT(req: RequestWithUser, res: Response, next: NextFunction) {
	try {
		const token = req.body.token || req.query.token || req.headers.token || req.cookies.Authorization;
		if (!token) throw new HttpException(400, 'No token found !');
		await schema.validateAsync(token);
		const decoded = verifyToken(token, jwtConfig.ACCESS);
		const { data } = decoded;
		const admin = await Admin.findById(data._id);
		const user = await User.findById(data._id);
		if (!user && !admin) throw new HttpException(400, 'Wrong authentication token');
		if (admin) {
			req.user = admin;
			req.role = Role.Admin;
			next();
		}
		if (user) {
			req.user = user;
			req.role = Role.User;
			next();
		}
	} catch (error) {
		next(error);
	}
}

export async function authAdmin(req: RequestWithUser, res: Response, next: NextFunction) {
	try {
		if (req.role !== Role.Admin) throw new HttpException(400, 'No permission !');
		next();
	} catch (error) {
		next(error);
	}
}
