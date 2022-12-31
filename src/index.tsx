import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';

import './index.css';

import store from './store';
import { injectStore } from './utils/http';

import { router } from './router';

/* Injecting the redux store into the http client so that\
// we can use accessToken and refreshToken from reduz store instead of looking up in local storage */
injectStore(store);

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
