import axios from 'axios';

import { LoginPayload } from '../interfaces/auth.interface';

import { LOGIN } from '../constants/endpoints.constants';
import { saveAuthenticationToken } from '../utils/auth';

export async function login(payload: LoginPayload) {
  const res = await axios.post(LOGIN, payload);

  saveAuthenticationToken(res.data);
}
