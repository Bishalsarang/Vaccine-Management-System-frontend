import { StoreType } from './../store';
import axios, { AxiosRequestConfig } from 'axios';

import { API_BASE_URL } from '../config';

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

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const { accessToken } = store.getState().user;

    config = {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    };

    // TODO: Add response ionterceptor to handle error and retry.
    // TODO: Add logic for refresh token.

    return config;
  },
  (error) => {
    console.error(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const { status } = error.response;

    const retryCount = error.config.__retryCount || 0;

    // If the error response has a 404 status and the retry count is less than the maximum number of retries, retry the request
    if (status === 404 && retryCount < MAX_RETRIES) {
      error.config.__retryCount = retryCount + 1;
      return axiosInstance.request(error.config);
    }

    // If the maximum number of retries has been reached, redirect to the login page

    return Promise.reject(error);
  },
);
