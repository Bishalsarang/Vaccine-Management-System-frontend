import { AxiosRequestConfig } from 'axios';
import configureStore from 'redux-mock-store';
import { MAX_RETRIES_EXCEEDED } from '../../constants/lang.constants';
import { StoreType } from '../../store';
import { axiosInstance, getConfigWithAccessToken, handleResponseError, injectStore } from '../../utils/http';

describe('getConfigWithAccessToken', () => {
  it('should add the Authorization header to the config object', () => {
    const config = {
      headers: {},
    };
    const accessToken = 'my-access-token';
    const expected = {
      headers: {
        Authorization: 'Bearer my-access-token',
      },
    };

    expect(getConfigWithAccessToken(config, accessToken)).toEqual(expected);
  });

  it('should not overwrite existing headers', () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const accessToken = 'my-access-token';
    const expected = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer my-access-token',
      },
    };

    expect(getConfigWithAccessToken(config, accessToken)).toEqual(expected);
  });
});




describe('handleResponseError', () => {

  let mockAxios: jest.SpyInstance<Promise<unknown>, [config: AxiosRequestConfig<unknown>]>;
  let store;
  beforeEach(() => {

    const mockStore = configureStore([]);
    const store = mockStore({
      user: {
        accessToken: "abc",
        userInfo: {},
        refreshToken: "cdef",
        success: true,
        isLoading: false,
        error: null,
      },
      vaccine: {vaccines: [], isLoading: false, error: null},
    }) as StoreType;
  
   injectStore(store);
    // mock the axios instance to return a Promise that resolves with a response
    mockAxios = jest.spyOn(axiosInstance, 'request').mockImplementation(() => Promise.resolve({ data: 'some data' }));
  });

  afterEach(() => {
    // restore the original axios instance after each test
    mockAxios.mockRestore();
  });

  it('should reject the promise with the error if the error is not a cancel error', async () => {
    const error = new Error('some error');

    try {
      await handleResponseError(error);
    } catch (e) {
      expect(e).toBe(error);
    }
  });

  it('should reject the promise with the error if the maximum number of retries has been exceeded', async () => {
    const error = {
      config: {
        _isRetry: true,
        _retryCount: 3,
      },
    };

    try {
      await handleResponseError(error);
    } catch (e) {
      expect(e.message).toBe(MAX_RETRIES_EXCEEDED);
    }
  });

  it('should reject the promise with the error if the response status is not 401', async () => {
    const error = {
      response: {
        status: 400,
        data: { message: 'some error message' },
      },
    };

    try {
      await handleResponseError(error);
    } catch (e) {
      expect(e).toBe(error);
    }
  });
});

