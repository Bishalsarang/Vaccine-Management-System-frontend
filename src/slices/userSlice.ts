import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  LoginPayload,
  SignupPayload,
  AuthenticationToken,
} from '../interfaces/auth.interface';

import {
  login,
  refreshAuthenticationToken,
  signup,
} from '../services/authService';

import {
  getUserInfoFromToken,
  saveAuthenticationToken,
  getAuthenticationTokenFromLocalStorage,
} from '../utils/auth';

import {
  UserState,
  userLoginPendingReducer,
  userLoginRejectedReducer,
  userSignupPendingReducer,
  userLoginFulfilledReducer,
  userSignupRejectedReducer,
  userSignupFulfilledReducer,
  setAuthenticationTokenReducer,
} from './reducers/userReducer';

import * as storage from '../utils/storage';

const { accessToken, refreshToken } = getAuthenticationTokenFromLocalStorage();

const initialState: UserState = {
  error: null,
  accessToken,
  refreshToken,
  success: false,
  isLoading: false,
  userInfo: getUserInfoFromToken(accessToken),
};

export const loginUser = createAsyncThunk<AuthenticationToken, LoginPayload>(
  'user/login',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await login(payload);
      saveAuthenticationToken(data);

      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const signupUser = createAsyncThunk<unknown, SignupPayload>(
  'user/signup',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await signup(payload);
      saveAuthenticationToken(data);

      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const refreshTokenThunk = createAsyncThunk<
  unknown,
  AuthenticationToken['refreshToken']
>('user/refreshToken', async (payload, { rejectWithValue }) => {
  try {
    const data = await refreshAuthenticationToken(payload);
    saveAuthenticationToken(data);

    return data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthenticationTokenReducer,
    logoutUser(state: UserState) {
      state.userInfo = null;
      state.accessToken = null;
      state.refreshToken = null;

      storage.clear();
    },
  },
  extraReducers: {
    [loginUser.pending as any]: userLoginPendingReducer,
    [loginUser.rejected as any]: userLoginRejectedReducer,
    [loginUser.fulfilled as any]: userLoginFulfilledReducer,
    [signupUser.pending as any]: userSignupPendingReducer,
    [signupUser.rejected as any]: userSignupRejectedReducer,
    [signupUser.fulfilled as any]: userSignupFulfilledReducer,
    [refreshTokenThunk.fulfilled as any]: (state, { payload }) => {
      state.isLoading = false;
      state.success = true;
      state.userInfo = getUserInfoFromToken(payload.accessToken);
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
    },
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
