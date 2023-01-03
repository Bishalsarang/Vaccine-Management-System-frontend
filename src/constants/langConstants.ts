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
    NO_ACCOUNT: "Don't have an account?",
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
    ALREADY_HAVE_ACCOUNT: 'Already have an account?',
    FAIL: 'Error while creating an account.',
    SUCESS: 'Successfully created an account.',
  },
};

export const BOTH_TOKEN_MISSING = 'Missing both accessToken and refreshToken';
export const MAX_RETRIES_EXCEEDED = 'Maximum retries Exceeded.';
export const AXIOS_RESPONSE_ERROR_TOAST = {
  TOKEN_EXPIRED: 'The token has expired. Please try logging in',
  TOAST_ID: 'axios-response-error',
};

export const APPLICATION_INFORMATION = {
  TITLE: 'Vaccine Management System',
  ABBREVIATED_TITLE: 'VMS',
  WELCOME_TEXT: 'Welcome to Vaccine Management System!',
};
