import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  LoginPayload,
  AuthenticationToken,
} from '../interfaces/auth.interface';

import { login } from '../services/auth.services';

import {
  getUserInfoFromToken,
  saveAuthenticationToken,
  getAuthenticationTokenFromLocalStorage,
} from '../utils/auth';

const { accessToken, refreshToken } = getAuthenticationTokenFromLocalStorage();

interface UserState {
  success: boolean;
  pending: boolean;
  loading: boolean;
  error: string | null;
  userInfo: object | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: UserState = {
  error: null,
  accessToken,
  refreshToken,
  success: false,
  loading: false,
  pending: false,
  userInfo: getUserInfoFromToken(accessToken),
};

export const userLogin = createAsyncThunk(
  'user/login',
  async (payload: LoginPayload, { rejectWithValue }) => {
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthenticationToken(
      state: UserState,
      { payload }: { payload: AuthenticationToken },
    ) {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
    },
  },
  extraReducers: {
    [userLogin.pending as any]: (state: UserState) => {
      state.loading = true;
    },
    [userLogin.fulfilled as any]: (
      state: UserState,
      { payload }: { payload: AuthenticationToken },
    ) => {
      state.loading = false;
      state.userInfo = payload;
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
    },
    [userLogin.rejected as any]: (
      state: UserState,
      { payload }: { payload: string },
    ) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default userSlice.reducer;
