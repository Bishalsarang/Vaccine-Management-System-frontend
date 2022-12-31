import { createBrowserRouter } from 'react-router-dom';

import BasePage from '../pages/BasePage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import SignoutPage from '../pages/SignoutPage';
import DashboardPage from '../pages/DashboardPage';
import ProtectedPage from '../pages/ProtectedPage';

import * as routes from '../constants/routesConstants';

export const router = createBrowserRouter([
  {
    path: routes.HOME,
    element: <BasePage />,
    errorElement: <div>404 page not found</div>,
    children: [
      {
        path: routes.HOME,
        element: <ProtectedPage children={<DashboardPage />} />,
      },
      { path: routes.SIGNIN, element: <LoginPage /> },
      { path: routes.SIGNUP, element: <SignupPage /> },
      { path: routes.SIGNOUT, element: <SignoutPage /> },
    ],
  },
]);
