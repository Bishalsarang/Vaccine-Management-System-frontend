import axios from 'axios';
import { SIGNUP, LOGIN } from '../constants/endpoints.constants';
import {
  LoginPayload,
  SignupPayload,
  AuthenticationToken,
} from '../interfaces/auth.interface';

export async function login(
  payload: LoginPayload,
): Promise<AuthenticationToken> {
  const res = await axios.post(LOGIN, payload);

  return res.data;
}

export async function signup(payload: SignupPayload): Promise<any> {
  const res = await axios.post(SIGNUP, payload);

  return res.data;
}
