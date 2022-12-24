import { AuthenticationToken } from '../../interfaces/auth.interface';

export interface UserState {
  success: boolean;
  pending: boolean;
  loading: boolean;
  error: string | null;
  userInfo: object | null;
  accessToken: string | null;
  refreshToken: string | null;
}

/**
 * Reducer to set authentication token.
 *
 * @param state
 * @param  action
 */
export function setAuthenticationTokenReducer(
  state: UserState,
  { payload }: { payload: AuthenticationToken },
) {
  state.accessToken = payload.accessToken;
  state.refreshToken = payload.refreshToken;
}

export function userLoginPendingReducer(state: UserState) {
  state.loading = true;
}

export function userSignupPendingReducer(state: UserState) {
  state.loading = true;
}

export function userLoginFulfilledReducer(
  state: UserState,
  { payload }: { payload: AuthenticationToken },
) {
  state.loading = false;
  state.userInfo = payload;
  state.accessToken = payload.accessToken;
  state.refreshToken = payload.refreshToken;
}

export function userSignupFulfilledReducer(
  state: UserState,
  { payload }: { payload: AuthenticationToken },
) {
  state.loading = false;
  state.userInfo = payload;
}

export function userLoginRejectedReducer(
  state: UserState,
  { payload }: { payload: string },
) {
  state.loading = false;
  state.error = payload;
}

export function userSignupRejectedReducer(
  state: UserState,
  { payload }: { payload: string },
) {
  state.loading = false;
  state.error = payload;
}
