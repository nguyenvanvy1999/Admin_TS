import { Segments } from 'celebrate';
import joi from 'joi';
import Joi from './joi';
const joiConfig = Joi.joiConfig;

const Schema = {
	admin: {
		signIn: {
			[Segments.BODY]: { email: joiConfig.email, password: joiConfig.password },
		},
	},
	user: {
		newUser: {
			[Segments.BODY]: {
				email: joiConfig.email,
				firstName: joiConfig.string,
				lastName: joiConfig.string,
				password: joiConfig.password,
				gender: joiConfig.string,
				confirmPassword: joi
					.any()
					.equal(joi.ref('password'))
					.required()
					.label('Confirm password')
					.options({ messages: { 'any.only': '{{#label}} does not match' } }),
			},
			devices: joi.array().items(joiConfig.string).min(1),
		},
	},
};

export default Schema;
