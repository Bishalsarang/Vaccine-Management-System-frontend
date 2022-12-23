import * as storage from '../utils/storage';

import { TOKEN_KEY } from '../constants/base.constants';
import { AuthenticationToken } from '../interfaces/auth.interface';

/**
 * Saves an authentication token to local storage.
 * @param {AuthenticationToken} authenticationToken The authentication token to save.
 * @property {string} authenticationToken.accessToken The access token to save.
 * @property {string} authenticationToken.refreshToken The refresh token to save.
 */
export function saveAuthenticationToken(
  authenticationToken: AuthenticationToken,
) {
  const { accessToken, refreshToken } = authenticationToken;

  storage.set(TOKEN_KEY.ACCESS, accessToken);
  storage.set(TOKEN_KEY.REFRESH, refreshToken);
}

/**
 * Decode a JWT Token.
 *
 * @param  {String} token
 */
export function decodeJWT(token: string | null) {
  if (!token) {
    return null;
  }

  try {
    const base64Url = token.split('.')[1];

    return JSON.parse(window.atob(base64Url));
  } catch (e) {
    return null;
  }
}

/**
 * Function to get accessToken and refreshToekn from localStorage
 */
export function getAuthenticationTokenFromLocalStorage(): AuthenticationToken {
  const accessToken = storage.get(TOKEN_KEY.ACCESS);

  const refreshToken = storage.get(TOKEN_KEY.REFRESH);

  return { accessToken, refreshToken };
}

/**
 *
 * @param {String} token
 * @returns {Object}
 */
export function getUserInfoFromToken(token: string | null): null | object {
  return decodeJWT(token);
}
