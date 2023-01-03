import { AuthenticationToken } from '../../interfaces/authInterface';
import { getUserInfoFromToken } from '../../utils/auth';

/**
 * Represents the state of a user in the application.
 *
 * @interface UserState
 */
export interface UserState {
  /**
   * Indicates whether the API action is successful.
   *
   * @type {boolean}
   */
  success: boolean;

  /**
   * Indicates whether the API action is in progress.
   *
   * @type {boolean}
   */
  isLoading: boolean;

  /**
   * The error message received after the API action.
   *
   * @type {(string|null)}
   */
  error: string | null;

  /**
   * The user's decoded information. It contains the usrname, email and other properties.
   *
   * @type {(object|null)}
   */
  userInfo: object | null;

  /**
   * The user's access token.
   *
   * @type {(string|null)}
   */
  accessToken: string | null;

  /**
   * The user's refresh token.
   *
   * @type {(string|null)}
   */
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
  state.isLoading = true;
}

export function userSignupPendingReducer(state: UserState) {
  state.isLoading = true;
}

export function userLoginFulfilledReducer(
  state: UserState,
  { payload }: { payload: AuthenticationToken },
) {
  state.isLoading = false;
  state.success = true;
  state.userInfo = getUserInfoFromToken(payload.accessToken);
  state.accessToken = payload.accessToken;
  state.refreshToken = payload.refreshToken;
}

export function userSignupFulfilledReducer(
  state: UserState,
  { payload }: { payload: AuthenticationToken },
) {
  state.isLoading = false;
  state.userInfo = payload;
}

export function userLoginRejectedReducer(
  state: UserState,
  { payload }: { payload: string },
) {
  state.isLoading = false;
  state.error = payload;
}

export function userSignupRejectedReducer(
  state: UserState,
  { payload }: { payload: string },
) {
  state.isLoading = false;
  state.error = payload;
}
