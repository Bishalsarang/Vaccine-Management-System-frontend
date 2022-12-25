import axios, { AxiosRequestConfig } from 'axios';

import { API_BASE_URL } from '../config';

import store from '../store';

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
