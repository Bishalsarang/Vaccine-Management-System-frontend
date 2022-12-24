import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  LoginPayload,
  SignupPayload,
  AuthenticationToken,
} from '../interfaces/auth.interface';

import { login, signup } from '../services/auth.services';

import {
  getUserInfoFromToken,
  saveAuthenticationToken,
  getAuthenticationTokenFromLocalStorage,
} from '../utils/auth';

import {
  UserState,
  userLoginPendingReducer,
  userLoginRejectedReducer,
  userLoginFulfilledReducer,
  setAuthenticationTokenReducer,
  userSignupPendingReducer,
  userSignupFulfilledReducer,
  userSignupRejectedReducer,
} from './reducers/userReducer';

const { accessToken, refreshToken } = getAuthenticationTokenFromLocalStorage();

const initialState: UserState = {
  error: null,
  accessToken,
  refreshToken,
  success: false,
  loading: false,
  pending: false,
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
      // return custom error message from API if any
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthenticationTokenReducer,
  },
  extraReducers: {
    [loginUser.pending as any]: userLoginPendingReducer,
    [loginUser.rejected as any]: userLoginRejectedReducer,
    [loginUser.fulfilled as any]: userLoginFulfilledReducer,
    [signupUser.pending as any]: userSignupPendingReducer,
    [signupUser.rejected as any]: userSignupRejectedReducer,
    [signupUser.fulfilled as any]: userSignupFulfilledReducer,
  },
});

export default userSlice.reducer;
