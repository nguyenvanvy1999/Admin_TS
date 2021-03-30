import Schema from '../configs/celebrate';
import { celebrate } from 'celebrate';

const Celebrate = {
	user: {
		signin: celebrate(Schema.user.signin),
		signup: celebrate(Schema.user.signup),
	},
};

export default Celebrate;
