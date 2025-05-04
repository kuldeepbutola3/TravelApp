import React, { useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { defaultPausedValue, PersistContext } from './persistContext';
import { PersistedFields } from './types';
import { rehydrateActionCreator } from './actions';

export type PersistProviderProps = Record<string, unknown>;

/**
 * Must be a descendent of the Redux store Provider so it can initialize with the useStore hook
 */
export const PersistProvider: React.FC<PersistProviderProps> = ({ children }) => {
  const pausedRef = useRef(defaultPausedValue);

  const paused = useRef((p?: boolean) => {
    if (isBool(p)) {
      pausedRef.current = p;
    }
    return pausedRef.current;
  }).current;

  const dispatch = useDispatch();
  const rehydrate = useCallback(
    (fields: PersistedFields) => {
      dispatch(rehydrateActionCreator(fields));
      return fields;
    },
    [dispatch]
  );

  return (
    <PersistContext.Provider value={{ paused, rehydrate }}>{children}</PersistContext.Provider>
  );
};

const isBool = (b?: boolean | void): b is boolean => typeof b === 'boolean';
