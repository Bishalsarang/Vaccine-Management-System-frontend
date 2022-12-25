import { configureStore } from '@reduxjs/toolkit';

import userReducer from './slices/userSlice';
import vaccineReducer from './slices/vaccineSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    vaccine: vaccineReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type StoreType = typeof store;

export default store;
