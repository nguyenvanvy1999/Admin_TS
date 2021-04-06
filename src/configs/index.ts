import { parse } from 'dotenv';
import joi from 'joi';
import fs from 'fs';
import { logger } from '../utils/logger';

/**
 * Key-value mapping
 */
interface EnvConfig {
	[key: string]: string;
}

/**
 * Config Service
 */
class ConfigService {
	/**
	 * Object that will contain the injected environment variables
	 */
	private readonly envConfig: EnvConfig;

	/**
	 * Constructor
	 * @param {string} filePath
	 */
	constructor(filePath: string) {
		const config = parse(fs.readFileSync(filePath));
		this.envConfig = ConfigService.validateInput(config);
	}

	/**
	 * Ensures all needed variables are set, and returns the validated JavaScript object
	 * including the applied default values.
	 * @param {EnvConfig} envConfig the configuration object with variables from the configuration file
	 * @returns {EnvConfig} a validated environment configuration object
	 */
	private static validateInput(envConfig: EnvConfig): EnvConfig {
		/**
		 * A schema to validate envConfig against
		 */
		const envVarsSchema: joi.ObjectSchema = joi
			.object({
				//set env and config
				DEBUG: joi.boolean().default(false),
				TEST: joi.boolean().default(false),
				SEND_MAIL: joi.boolean().default(false),
				NODE_ENV: joi.string().valid('dev', 'prod').default('dev'),
				// url and port
				PORT: joi.number().default(8080),
				URL: joi
					.string()
					.uri({ scheme: [/https?/] })
					.required(),
				//database
				MONGO_URI: joi
					.string()
					.regex(/^mongodb/)
					.default('mongodb://localhost:27017/Project1'),
				//send mail
				SMTP_USER: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['vn', 'com', 'net'] } }),
				SMTP_PASSWORD: joi.string(),
				SENDGRID_API_KEY: joi.string(),
				//bcrypt salt
				SALT: joi.number().min(4).max(15).default(5),
			})
			.or('SMTP_USER', 'SENDGRID_API_KEY')
			.and('SMTP_USER', 'SMTP_PASSWORD');
		/**
		 * Represents the status of validation check on the configuration file
		 */
		const { error, value: validatedEnvConfig } = envVarsSchema.validate(envConfig);
		if (error) {
			logger.error(error);
			throw new Error(`Config validation error: ${error.message}`);
		}
		return validatedEnvConfig;
	}
	/**
	 * Fetches the key from the configuration file
	 * @param {string} key
	 * @returns {string} the associated value for a given key
	 */
	get(key: string): string {
		return this.envConfig[key.toUpperCase()];
	}
	/**
	 * Checks whether the application environment set in the configuration file matches the environment parameter
	 * @param {string} env
	 * @returns {boolean} Whether or not the environment variable matches the application environment
	 */
	isEnv(env: string): boolean {
		return this.envConfig.NODE_ENV === env;
	}
	isDebug(): boolean {
		return this.envConfig.DEBUG.toString() === 'true'; // because before, debug and test set to boolean
	}
	isSendMail(): boolean {
		return this.envConfig.SEND_MAIL.toString() === 'true';
	}
}

export default new ConfigService('.env');
