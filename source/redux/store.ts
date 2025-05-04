import { configureStore } from '@reduxjs/toolkit';
import { configureSubscriber } from '../utils/redux-subscriber';
import reducer from './rootReducer';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from 'redux-persist';

const middleware = {
  serializableCheck: false,
  immutableCheck: false,
  thunk: false,
  //   immutableCheck: true;
  //   serializableCheck: true;
  actionCreatorCheck: false,
};

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    // getDefaultMiddleware({
    //   serializableCheck: {
    //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //   },
    // }),
    getDefaultMiddleware(middleware),
});

export type Store = typeof store;

configureSubscriber(store);

export const persistor = persistStore(store);
