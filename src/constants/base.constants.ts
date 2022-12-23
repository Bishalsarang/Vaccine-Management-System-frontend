import { FaVial, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

export const TOKEN_KEY = {
  ACCESS: 'accessToken',
  REFRESH: 'refreshToken',
};

export const SIDEBAR_NAV_ITEMS = [
  {
    icon: FaVial,
    label: 'Vaccines',
    path: '/vaccines',
  },
  {
    label: 'Profile',
    path: '/profile',
    icon: FaUserCircle,
  },
  {
    label: 'Logout',
    path: '/logout',
    icon: FaSignOutAlt,
  },
];
