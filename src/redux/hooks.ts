import {RootState} from 'src/redux/rootReducer';
import {useSelector, useDispatch, useStore as useReduxStore} from 'react-redux';
import {
  ActionCreator,
  bindActionCreators,
  Action,
  AnyAction,
} from '@reduxjs/toolkit';
import {Store} from 'src/redux/store';
import {persistStore, Persistor} from 'redux-persist';
import {useEffect, EffectCallback} from 'react';

export const useSliceSelector = <Slice extends keyof RootState>(
  slice: Slice,
): RootState[Slice] => {
  return useSelector<RootState, RootState[Slice]>((state) => state[slice]);
};

// See https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-redux/index.d.ts#L499
// for why the useDispatch typings were incorrect.
export type StoreDispatch = Store['dispatch'];
export const useThunkDispatch = () => useDispatch<StoreDispatch>();

/**
 * For explanation on why Redux action creators don't work well with `useEffect`,
 *  see: https://github.com/facebook/create-react-app/issues/6880
 * So if you want to run a one time `useEffect` with zero dependencies, but
 * also want fetch something using `useThunk` inside it, use this hook.
 * There's an unfortunate dependencie linter warning when used inside of a
 * component (react-hooks/exhaustive-deps). If we appease that linter warning, then it runs an endless loop.
 */
export const useOnMount = (callback: EffectCallback) => {
  useEffect(callback, [callback]);
};

export const useBindAction = <A, C extends ActionCreator<A>>(creator: C) => {
  const dispatch = useDispatch<StoreDispatch>();
  return bindActionCreators(creator, dispatch);
};

export const useStore = <A extends Action = AnyAction>() =>
  useReduxStore<RootState, A>();

let _persistor: Persistor;
export const usePersistor = () => {
  const store = useStore();
  if (_persistor) {
    return _persistor;
  }
  _persistor = persistStore(store);
  return _persistor;
};
