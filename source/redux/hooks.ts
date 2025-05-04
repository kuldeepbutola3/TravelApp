// import { RootState } from 'src/redux/rootReducer';
import { useSelector, useDispatch, useStore as useReduxStore } from 'react-redux';
import { ActionCreator, bindActionCreators, Action, AnyAction } from '@reduxjs/toolkit';
// import { Store } from 'src/redux/store';
import { useMemo } from 'react';
import { RootState } from './rootReducer';
import { Store } from './store';

export const useSliceSelector = <Slice extends keyof RootState>(slice: Slice): RootState[Slice] =>
  useSelector<RootState, RootState[Slice]>((state) => state[slice]);

// See https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-redux/index.d.ts#L499
// for why the useDispatch typings were incorrect.
export type StoreDispatch = Store['dispatch'];
export const useThunkDispatch = () => useDispatch<StoreDispatch>();

export const useBindAction = <A, C extends ActionCreator<A>>(creator: C) => {
  const dispatch = useDispatch<StoreDispatch>();
  return useMemo(() => {
    return bindActionCreators(creator, dispatch);
  }, [creator, dispatch]);
};

export const useStore = <A extends Action = AnyAction>() => useReduxStore<RootState, A>();
