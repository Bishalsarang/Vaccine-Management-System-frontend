/**
 * This file contains the BE API endpoints.
 */

import { API_BASE_URL } from '../config';

export const LOGIN = API_BASE_URL + '/auth/signin';
export const SIGNUP = API_BASE_URL + '/auth/signup';
export const REFRESH_ACCESS_TOKEN = API_BASE_URL + '/auth/refreshToken';

// vaccines
export const VACCINES = '/vaccines';
export const VACCINES_ID = '/vaccines/:id';
export const VACCINES_STAGES = '/vaccines/stages';
export const VACCINES_ALLERGIES = '/vaccines/allergies';
