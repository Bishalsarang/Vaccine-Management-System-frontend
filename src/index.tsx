import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';

import './index.css';

import BasePage from './pages/BasePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedPage from './pages/ProtectedPage';

import store from './store';
import { injectStore } from './utils/http';
import SignupPage from './pages/SignupPage';
import SignoutPage from './pages/SignoutPage';

injectStore(store);

const router = createBrowserRouter([
  {
    path: '/',
    element: <BasePage />,
    errorElement: <div>404 page not found</div>,
    children: [
      {
        path: '/',
        element: <ProtectedPage children={<DashboardPage />} />,
      },
      { path: '/signin', element: <LoginPage /> },
      { path: '/signup', element: <SignupPage /> },
      { path: '/signout', element: <SignoutPage /> },
    ],
  },
]);

// eslint-disable-next-line
const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
