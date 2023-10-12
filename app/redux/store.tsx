import {configureStore} from '@reduxjs/toolkit';
import {createLogger} from 'redux-logger';
import timeManager from './timeManager.slice';
const logger = createLogger();
export const store = configureStore({
  reducer: {
    timeManager: timeManager,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
