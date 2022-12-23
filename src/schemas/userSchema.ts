import * as Yup from 'yup';

import { ERROR_MESSAGE } from '../utils/errors';

const username = Yup.string().max(40, ERROR_MESSAGE.MAX_LENGTH('Username', 40));
const password = Yup.string().min(8, ERROR_MESSAGE.MIN_LENGTH('Password', 8));

const schema = Yup.object({
  username,
  password,
});

export default schema;
