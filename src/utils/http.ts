import { StoreType } from '../store';
import { showErrorMessage } from './toast';
import axios, { AxiosRequestConfig } from 'axios';

import { API_BASE_URL } from '../config';
import { logoutUser, refreshTokenThunk } from '../slices/userSlice';
import { AuthenticationToken } from '../interfaces/auth.interface';

// Since directly importing store.ts cause circular dependency: store.ts > slices/vaccineSlice.ts > services/vaccineService.ts > utils/axios.ts
// We can follow this pattern: https://redux.js.org/faq/code-structure#how-can-i-use-the-redux-store-in-non-component-files
let store: StoreType;

export const injectStore = (_store: StoreType) => {
  store = _store;
};

// Set the maximum number of retries
const MAX_RETRIES = 3;

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

function getConfigWithAccessToken(
  config: AxiosRequestConfig,
  accessToken: AuthenticationToken['accessToken'],
) {
  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  };
}

const { CancelToken } = axios;
const cancelTokenSource = CancelToken.source();

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const { accessToken, refreshToken } = store.getState().user;

    // If we have an accesstoken, then add the 'Authorization Bearer' header with that token
    if (accessToken) {
      return getConfigWithAccessToken(config, accessToken);
    }

    // If we don't have a accessToken and the refresh token
    if (!refreshToken) {
      cancelTokenSource.cancel('Missing both accessToken and refreshToken');

      return config;
    }

    // Otherwise try to get the new access token.
    store.dispatch(refreshTokenThunk(refreshToken)).unwrap();

    return config;
  },
  (error) => {
    throw error;
  },
);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const { refreshToken } = store.getState().user;

    if (axios.isCancel(error)) {
      // If the maximum number of retries has been reached, redirect to the login page
      showErrorMessage('The token has expired. Please try loggin in', {
        toastId: 'axios-response-error',
      });
      store.dispatch(logoutUser());
    }

    const { response, config } = error;

    if (config._isRetry && config._retryCount >= MAX_RETRIES) {
      // Check `>= MAX_RETRIES` instead of `> MAX_RETRIES` because,
      // this is response interceptor, which means the request should have
      // already been made.
      throw new Error('Maximum retries Exceeded.');
    }

    if (response.status !== 401) {
      // TODO: Handle other errors
      showErrorMessage(response.data.message);

      throw error;
    }

    try {
      await store.dispatch(refreshTokenThunk(refreshToken)).unwrap();

      const { cancelToken, ...configWithoutCancelToken } = config;
      const retryCount = configWithoutCancelToken._retryCount;

      return axiosInstance({
        ...configWithoutCancelToken,
        _isRetry: true,
        _retryCount: retryCount ? retryCount + 1 : 1,
      });
    } catch (refreshError) {
      showErrorMessage('The token has expired. Please try loggin in', {
        toastId: 'axios-response-error',
      });
      store.dispatch(logoutUser());
    }

    return Promise.reject(error);
  },
);
