import { StoreType } from './../store';
import axios, { AxiosRequestConfig } from 'axios';

import { API_BASE_URL } from '../config';

// Since directly importing store.ts cause circular dependency: store.ts > slices/vaccineSlice.ts > services/vaccineService.ts > utils/axios.ts
// We can follow this pattern: https://redux.js.org/faq/code-structure#how-can-i-use-the-redux-store-in-non-component-files
let store: StoreType;

export const injectStore = (_store: StoreType) => {
  store = _store;
};

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

axiosInstance.interceptors.response.use((response) => response.data);
