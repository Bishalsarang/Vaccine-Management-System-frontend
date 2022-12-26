export const LOGIN_FORM = {
  TITLE: '',
  FIELDS: {
    USERNAME: { label: 'Username*' },
    PASSWORD: { label: 'Password*' },
  },
  BUTTONS: {
    LOGIN: { label: 'Login' },
  },
  MESSAGES: {
    FAIL: 'Error while loggin in.',
    SUCESS: 'Successfully logged in.',
  },
};

export const SIGNUP_FORM = {
  TITLE: 'Create an Account',
  FIELDS: {
    EMAIL: { label: 'Email*' },
    LASTNAME: { label: 'Lastname*' },
    USERNAME: { label: 'Username*' },
    PASSWORD: { label: 'Password*' },
    FIRSTNAME: { label: 'Firstname*' },
    CONFIRM_PASSSWORD: { label: 'Confirm Password*' },
  },
  BUTTONS: {
    SIGNUP: { label: 'Signup' },
  },
  MESSAGES: {
    FAIL: 'Error while creating an account.',
    SUCESS: 'Successfully created an account.',
  },
};
