import { IAdminDocument } from '../interfaces/admin.interface';
import { Schema, Model, model } from 'mongoose';
import bcrypt from 'bcrypt';
import Config from '../configs/index';
import { schemaOption } from './user.model';

const salt: number = parseInt(Config.get('salt'), 10);

interface IAdmin extends IAdminDocument {
	// methods here
	comparePassword(password: string): boolean;
}

interface IAdminModel extends Model<IAdmin> {
	// statics here
	hashPassword(password: string): string;
}

const AdminSchema = new Schema(
	{
		_id: Schema.Types.ObjectId,
		email: { type: String, unique: true, min: 10 },
		password: { type: String, min: 10 },
		info: [String],
	},
	schemaOption
);

AdminSchema.pre('save', async function (this: IAdmin, next) {
	const admin = this;
	if (admin.isModified('password')) {
		admin.password = await bcrypt.hash(admin.password, salt);
	}
	next();
});

AdminSchema.methods.comparePassword = function (this: IAdmin, password: string): boolean {
	if (bcrypt.compareSync(password, this.password)) return true;
	return false;
};

AdminSchema.statics.hashPassword = function hashPassword(password: string): string {
	return bcrypt.hashSync(password, salt);
};

const Admin: IAdminModel = model<IAdmin, IAdminModel>('Admin', AdminSchema);
export default Admin;
