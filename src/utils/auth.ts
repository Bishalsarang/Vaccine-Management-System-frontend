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
