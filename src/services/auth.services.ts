import { AuthenticationToken } from './../interfaces/auth.interface';
import axios from 'axios';

import { LoginPayload } from '../interfaces/auth.interface';

import { LOGIN } from '../constants/endpoints.constants';

export async function login(
  payload: LoginPayload,
): Promise<AuthenticationToken> {
  const res = await axios.post(LOGIN, payload);

  return res.data;
}
