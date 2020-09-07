import { configureStore, getDefaultMiddleware, Selector } from '@reduxjs/toolkit';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
// import { fetchTransactions } from 'src/idg/ftm/ftmSlice';
import { configureSubscriber, Subscribe, Callback } from '../utils/redux-subscriber';
import rootReducer, { RootState } from './rootReducer';

// See https://github.com/reduxjs/redux-toolkit/issues/121
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['app'],
  blacklist: [],
};

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER,
        // fetchTransactions.pending.type,
        // fetchTransactions.rejected.type,
        // fetchTransactions.fulfilled.type,
      ],
    },
    immutableCheck: {
      ignoredPaths: ['ftm.transactions'],
    },
  }),
});

export type Store = typeof store;

/*
Be sure to only access `subscribe()` after the above `store` has been
initialized, or you'll get a weird ambiguous redux error. Alternatively,
you can inject this function as a parameter or wait until within a component
to access it.
*/
const subscriber = configureSubscriber(store);
export const subscribe = <Value>(
  selector: Selector<RootState, Value>,
  callback: Callback<RootState, Value>
) => {
  return (subscriber as Subscribe<RootState, Value>)(selector, callback);
};
