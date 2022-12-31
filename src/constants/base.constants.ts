import { FaVial, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

export const TOKEN_KEY = {
  ACCESS: 'accessToken',
  REFRESH: 'refreshToken',
};

export const AUTHENTICATION_SCHEME_BEARER = 'Bearer';

export const SIDEBAR_NAV_ITEMS = [
  {
    icon: FaVial,
    label: 'Vaccines',
    path: '/',
  },
  {
    label: 'Profile',
    path: '/profile',
    icon: FaUserCircle,
  },
  {
    label: 'SignOut',
    path: '/signout',
    icon: FaSignOutAlt,
  },
];

export const VACCINE_STAGES = {
  research: 'R&D',
  regulatory: 'Approval',
  clinical: 'Clinical Trials',
  preclinical: 'Preclinical Testing',
  manufacturing: 'Manufacturing',
};
