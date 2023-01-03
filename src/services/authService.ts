import axios from 'axios';

import {
  LOGIN,
  SIGNUP,
  REFRESH_ACCESS_TOKEN,
} from '../constants/endpointsConstants';

import {
  LoginPayload,
  SignupPayload,
  AuthenticationToken,
} from '../interfaces/authInterface';

/**
 * Logs in the user with the provided credentials.
 *
 * @param {LoginPayload} payload - The login payload containing the user's credentials.
 * @returns {Promise<AuthenticationToken>} - A promise with the authentication tokens.
 */
export async function login(
  payload: LoginPayload,
): Promise<AuthenticationToken> {
  const response = await axios.post(LOGIN, payload);

  return response.data;
}

/**
 * Signs up a new user with the provided information.
 *
 * @param {SignupPayload} payload - The signup payload containing the user's information.
 * @returns {Promise<any>} - A promise with the created user.
 */
export async function signup(payload: SignupPayload): Promise<any> {
  const res = await axios.post(SIGNUP, payload);

  return res.data;
}

/**
 * Refreshes the authentication tokens of the user.
 *
 * @param {AuthenticationToken['refreshToken']} refreshToken - The refresh token to use.
 * @returns {Promise<AuthenticationToken>} - A promise with the new authentication tokens.
 */
export async function refreshAuthenticationToken(
  refreshToken: AuthenticationToken['refreshToken'],
): Promise<AuthenticationToken> {
  const res = await axios.post(REFRESH_ACCESS_TOKEN, { refreshToken });

  return res.data;
}
