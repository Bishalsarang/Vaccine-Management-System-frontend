import { TOKEN_KEY } from '../../../constants/base.constants';

import { getAuthenticationTokenFromLocalStorage } from '../../../utils/auth';

import * as storage from '../../../utils/storage';
import { LocalStorageMock } from '../../../mocks/localStorageMock';

describe('getAuthenticationTokenFromLocalStorage', () => {

  // Since, localstorage is not available in node environment, we have to mock.
  (global as any).localStorage = new LocalStorageMock();
  it('should return an empty object if the access token and refresh token are not set in local storage', () => {
    expect(getAuthenticationTokenFromLocalStorage()).toEqual({
      accessToken: null,
      refreshToken: null,
    });
  });

  it('should return the access token and refresh token if they are set in local storage', () => {
    storage.set(TOKEN_KEY.ACCESS, 'access-token');
    storage.set(TOKEN_KEY.REFRESH, 'refresh-token');
    expect(getAuthenticationTokenFromLocalStorage()).toEqual({
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
    });
  });
});
