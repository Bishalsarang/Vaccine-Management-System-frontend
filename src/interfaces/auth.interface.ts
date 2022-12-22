export interface LoginPayload {
  username: string;
  password: string;
}

export interface SignupPayload extends LoginPayload {
  email: string;
  lastname: string;
  firstname: string;
}

export interface AuthenticationToken {
  accessToken: string;
  refreshToken: string;
}
