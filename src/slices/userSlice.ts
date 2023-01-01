import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  LoginPayload,
  SignupPayload,
  AuthenticationToken,
} from '../interfaces/auth.interface';

import {
  login,
  signup,
  refreshAuthenticationToken,
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

// Get the  value of access and refresh token from local storage to set the initial state on page refresh.
const { accessToken, refreshToken } = getAuthenticationTokenFromLocalStorage();

export const initialState: UserState = {
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
  extraReducers(builder) {
    builder.addCase(loginUser.pending, userLoginPendingReducer);
    builder.addCase(loginUser.rejected as any, userLoginRejectedReducer);
    builder.addCase(loginUser.fulfilled, userLoginFulfilledReducer);
    builder.addCase(signupUser.pending, userSignupPendingReducer);
    builder.addCase(signupUser.rejected as any, userSignupRejectedReducer);
    builder.addCase(signupUser.fulfilled as any, userSignupFulfilledReducer);
    builder.addCase(
      refreshTokenThunk.fulfilled as any,
      (state, { payload }) => {
        state.isLoading = false;
        state.success = true;
        state.userInfo = getUserInfoFromToken(payload.accessToken);
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
      },
    );
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
