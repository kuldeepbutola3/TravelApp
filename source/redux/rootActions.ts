import { createAction } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import { useBindAction } from './hooks';
import { RootState } from './rootReducer';
import { useRehydrateFromDevice } from './persist/device';
import { usePersistContext } from './persist/core/persistContext';

/**
 * Use this hook to reset the store to it's original glory. The handling of
 * this action is a two part process of resetting state, then rehydrating
 * any persistent values.
 */
export const useResetStore = () => {
  const resetAction = useBindAction(resetStoreActionCreator);
  const { paused } = usePersistContext();
  const rehydrateFromDevice = useRehydrateFromDevice();

  return useCallback(() => {
    paused(true);
    resetAction();
    return rehydrateFromDevice().then(() => paused(false));
  }, [paused, rehydrateFromDevice, resetAction]);
};

/**
 * Used internally by the rootReducer
 */
export const RESET_STORE = 'root/reset';

export const resetStoreActionCreator = createAction<
  Partial<RootState> | undefined,
  typeof RESET_STORE
>(RESET_STORE);

export type RootAction = ReturnType<typeof resetStoreActionCreator>;
