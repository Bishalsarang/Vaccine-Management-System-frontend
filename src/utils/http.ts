import axios, { AxiosRequestConfig } from 'axios';

import { StoreType } from '../store';
import { showErrorMessage } from './toast';

import { API_BASE_URL } from '../config';

import { logoutUser, refreshTokenThunk } from '../slices/userSlice';

import { AuthenticationToken } from '../interfaces/auth.interface';

import {
  BOTH_TOKEN_MISSING,
  MAX_RETRIES_EXCEEDED,
  AXIOS_RESPONSE_ERROR_TOAST,
} from '../constants/lang.constants';
import { AUTHENTICATION_SCHEME_BEARER } from '../constants/base.constants';

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

/**
 * Takes `AxiosRequestConfig` and an `accessToken` and returns a new AxiosRequestConfig with the
 * `accessToken` added to the Authorization header
 *
 * @param {AxiosRequestConfig} config - AxiosRequestConfig - this is the config object that you pass to
 * axios.get, axios.post, etc.
 * @param accessToken - The access token that we got from the authentication service.
 *
 * @returns A new object with the Authorization header.
 */
function getConfigWithAccessToken(
  config: AxiosRequestConfig,
  accessToken: AuthenticationToken['accessToken'],
) {
  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `${AUTHENTICATION_SCHEME_BEARER} ${accessToken}`,
    },
  };
}

const { CancelToken } = axios;
const cancelTokenSource = CancelToken.source();

axiosInstance.interceptors.request.use(
  async (config: AxiosRequestConfig): Promise<AxiosRequestConfig<any>> => {
    const { accessToken, refreshToken } = store.getState().user;

    // If we have an accesstoken, then add the 'Authorization Bearer' header with that token
    if (accessToken) {
      return getConfigWithAccessToken(config, accessToken);
    }

    // If we don't have an accessToken and the refresh token
    if (!refreshToken) {
      cancelTokenSource.cancel(BOTH_TOKEN_MISSING);

      return config;
    }

    // Otherwise try to get the new access token.
    await store.dispatch(refreshTokenThunk(refreshToken)).unwrap();

    return config;
  },
  (error) => {
    return error;
  },
);

/**
 * Refreshes the token and retries the request.
 *
 * @param {string} refreshToken - The refresh token to use.
 * @param {AxiosRequestConfig} config - The request config to retry.
 * @returns {Promise} - A promise with the response of the retried request.
 */
async function refreshTokenAndRetry(
  refreshToken: string | null,
  config: any,
): Promise<any> {
  await store.dispatch(refreshTokenThunk(refreshToken)).unwrap();

  const { cancelToken, ...configWithoutCancelToken } = config;
  const retryCount = configWithoutCancelToken._retryCount;

  return axiosInstance({
    ...configWithoutCancelToken,
    _isRetry: true,
    _retryCount: retryCount ? retryCount + 1 : 1,
  });
}

/**
 * Handles errors thrown during a response.
 *
 * @param {any} error - The error thrown during the response.
 * @returns {Promise} - A rejected promise with the error.
 */
async function handleResponseError(error: any): Promise<any> {
  const { refreshToken } = store.getState().user;

  if (axios.isCancel(error)) {
    // If the maximum number of retries has been reached, redirect to the login page
    showErrorMessage(AXIOS_RESPONSE_ERROR_TOAST.TOKEN_EXPIRED, {
      toastId: AXIOS_RESPONSE_ERROR_TOAST.TOAST_ID,
    });

    store.dispatch(logoutUser());
  }

  const { response, config } = error;

  if (config._isRetry && config._retryCount >= MAX_RETRIES) {
    // Check `>= MAX_RETRIES` instead of `> MAX_RETRIES` because,
    // this is response interceptor, which means the request should have
    // already been made.
    throw new Error(MAX_RETRIES_EXCEEDED);
  }

  if (response.status !== 401) {
    showErrorMessage(response.data.message);

    throw error;
  }

  try {
    return await refreshTokenAndRetry(refreshToken, config);
  } catch (refreshError) {
    showErrorMessage(AXIOS_RESPONSE_ERROR_TOAST.TOKEN_EXPIRED, {
      toastId: AXIOS_RESPONSE_ERROR_TOAST.TOAST_ID,
    });

    store.dispatch(logoutUser());
  }

  return Promise.reject(error);
}

axiosInstance.interceptors.response.use(
  (response) => response.data,
  handleResponseError,
);
