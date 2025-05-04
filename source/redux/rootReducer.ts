import { combineReducers, Reducer } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';
// import reduceReducers from 'reduce-reducers';
// import { resetStoreActionCreator } from './rootActions';
// import { rehydrateReducer } from './persist';
import { appSlice } from '../appSlice';

import { persistReducer } from 'redux-persist';
// import { sessionSlice } from '../session/sessionSlice';
// import { productSlice } from '../product/productSlice';
// import { orderSlice } from '../order/orderSlice';
// import { eBaySlice } from '../eBay/eBaySlice';

const combinedReducer = combineReducers({
  app: appSlice.reducer,
  // session: sessionSlice.reducer,
  // product: productSlice.reducer,
  // order: orderSlice.reducer,
  // eBay: eBaySlice.reducer,
});

export type RootState = ReturnType<typeof combinedReducer>;
export type RootStateObj = { state: RootState };
export type RootSelector = (state: RootState) => RootState[keyof RootState];

// const sliceReducer: Reducer = (state, action) => {
//   console.log('herrrrrrrrrrr......', action.type);
//   // const persistActions = [PERSIST, REHYDRATE, FLUSH, PAUSE, PURGE, REGISTER];
//   // if (persistActions.includes(action.type)) {
//   //   return combinedReducer(state, action);
//   // }

//   if (resetStoreActionCreator.match(action)) {
//     console.log('yyyyyyyyyyy......', resetStoreActionCreator);
//     // This concept is borrowed from Dan the Man: https://stackoverflow.com/a/35641992 .
//     // Note: this is not a draft/immer object and not typically meant to be modified
//     // except for assigning as undefined. It's simply passed into all other reducers
//     // as an initial state. Most slices will handle this `undefined` state the same
//     // way it would on initialization. The reason it must go into a vanilla reducer
//     // is because returning `undefined` from a draft reducer is ignored.
//     // Use a cross-slice reducer created via `createReducer()` if you need to perform
//     // specific global mutations.
//     state = undefined;
//   }
//   // return state;
//   return combinedReducer(state, action);
// };

// const rootReducer =
// // https://github.com/redux-utilities/reduce-reducers#faq
// reduceReducers(rehydrateReducer, sliceReducer);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage, // or AsyncStorage for RN
  whitelist: ['app'], // only persist this slice
};
const rootReducer = persistReducer(persistConfig, combinedReducer);

// export type RootReducer = typeof rootReducer;

export default rootReducer;
