import {
  combineReducers,
  configureStore,
  PreloadedState,
} from '@reduxjs/toolkit';

import userReducer from './slices/userSlice';
import vaccineReducer from './slices/vaccineSlice';

const rootReducer = combineReducers({
  user: userReducer,
  vaccine: vaccineReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type StoreType = typeof store;

export default store;
