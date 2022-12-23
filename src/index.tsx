import React from 'react';
import { createRoot } from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import './index.css';

import BasePage from './pages/BasePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedPage from './pages/ProtectedPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BasePage />,
    errorElement: <div>404 page not found</div>,
    children: [
      {
        path: '/',
        element: (
          <ProtectedPage isAuthenticated={false} children={<DashboardPage />} />
        ),
      },
      { path: '/login', element: <LoginPage /> },
    ],
  },
]);

// eslint-disable-next-line
const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
