import { saveAuthenticationToken } from '../../../utils/auth';
import { get , clear} from '../../../utils/storage';
import { LocalStorageMock } from '../../../mocks/localStorageMock';
import { TOKEN_KEY } from '../../../constants/base.constants';

describe('saveAuthenticationToken', () => {
  beforeEach(() => {
    // Mock the local storgae
    (global as any).localStorage = new LocalStorageMock();
    clear();
  });

  it('should save the access and refresh tokens in local storage', () => {
    const authenticationToken = {
      accessToken: 'access-token',
      refreshToken: 'refresh-token'
    };

    saveAuthenticationToken(authenticationToken);

    // Check that the tokens have been saved in local storage
    expect(get(TOKEN_KEY.ACCESS)).toBe('access-token');
    expect(get(TOKEN_KEY.REFRESH)).toBe('refresh-token');
  });
});
