//  References: https://redux.js.org/usage/writing-tests#components

import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import type { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { setupStore, StoreType, RootState } from '../store';
import { initialState as userInitialState } from '../slices/userSlice';
import { initialState as vaccineInitialState } from '../slices/vaccineSlice';
import { BrowserRouter } from 'react-router-dom';

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: StoreType;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = { user: userInitialState, vaccine: vaccineInitialState },
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<any>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export const renderWithRouter = (
  ui: React.ReactElement,
  { route = '/' } = {},
) => {
  window.history.pushState({}, 'Test page', route);

  return {
    ...render(ui, { wrapper: BrowserRouter }),
  };
};
