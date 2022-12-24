import * as Yup from 'yup';

import { ERROR_MESSAGE } from '../utils/errors';

const CHARACTER_LIMIT_NAME = 20;

const username = Yup.string()
  .required()
  .max(
    CHARACTER_LIMIT_NAME,
    ERROR_MESSAGE.MAX_LENGTH('Username', CHARACTER_LIMIT_NAME),
  );
const firstname = Yup.string()
  .max(
    CHARACTER_LIMIT_NAME,
    ERROR_MESSAGE.MAX_LENGTH('Firstname', CHARACTER_LIMIT_NAME),
  )
  .required();
const lastname = Yup.string().max(
  CHARACTER_LIMIT_NAME,
  ERROR_MESSAGE.MAX_LENGTH('Lastname', CHARACTER_LIMIT_NAME),
);
const email = Yup.string().email().required();
const password = Yup.string()
  .required()
  .min(8, ERROR_MESSAGE.MIN_LENGTH('Password', 8));
const confirmPassword = Yup.string()
  .oneOf([Yup.ref('password')], 'Passwords do not match')
  .required();

const userLoginSchema = Yup.object({
  username,
  password,
});

const userSignupSchema = userLoginSchema.concat(
  Yup.object({
    email,
    lastname,
    firstname,
    confirmPassword,
  }),
);

export { userLoginSchema, userSignupSchema };
