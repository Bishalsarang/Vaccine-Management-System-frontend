import axios from 'axios';

import {
  SignupPayload,
  AuthenticationToken,
} from './../../interfaces/authInterface';

import {
  LOGIN,
  SIGNUP,
  REFRESH_ACCESS_TOKEN,
} from '../../constants/endpointsConstants';

import {
  login,
  signup,
  refreshAuthenticationToken,
} from '../../services/authService';

describe('login', () => {
  it('should return an authentication token', async () => {
    const mockPayload = { username: 'john', password: 'wick' };
    const mockToken = 'jwt-token';
    jest.spyOn(axios, 'post').mockResolvedValue({ data: mockToken });

    const result = await login(mockPayload);

    expect(result).toEqual(mockToken);
    expect(axios.post).toHaveBeenCalledWith(LOGIN, mockPayload);
  });

  it('should throw an error if the API request fails', async () => {
    const mockPayload = { username: 'user', password: 'password' };
    jest
      .spyOn(axios, 'post')
      .mockRejectedValue(new Error('Username or Password is wrong'));

    const result = login(mockPayload);

    await expect(result).rejects.toThrowError('Username or Password is wrong');
    expect(axios.post).toHaveBeenCalledWith(LOGIN, mockPayload);
  });
});

describe('signup', () => {
  it('should create a new user and return the information', async () => {
    const mockSignupPaylod: SignupPayload = {
      email: 'john@mail.com',
      username: 'john',
      lastname: 'Wick',
      firstname: 'John',
      password: 'youcannotguess',
    };

    jest.spyOn(axios, 'post').mockResolvedValue({ data: mockSignupPaylod });

    const response = await signup(mockSignupPaylod);

    expect(axios.post).toHaveBeenCalledWith(SIGNUP, mockSignupPaylod);
    expect(response).toEqual(mockSignupPaylod);
  });
});

describe('refreshAuthenticationToken', () => {
  it('should refresh the authentication using refresh token', async () => {
    const mockRefreshToken = 'my valid refresh token';

    const mockAuthenticationToken: AuthenticationToken = {
      accessToken: 'my access token',
      refreshToken: 'my refresh token',
    };

    jest
      .spyOn(axios, 'post')
      .mockResolvedValue({ data: mockAuthenticationToken });
    const response = await refreshAuthenticationToken(mockRefreshToken);
    expect(axios.post).toHaveBeenCalledWith(REFRESH_ACCESS_TOKEN, {
      refreshToken: mockRefreshToken,
    });

    expect(response).toEqual(mockAuthenticationToken);
  });
});
