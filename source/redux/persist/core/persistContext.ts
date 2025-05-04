import React, { useContext } from 'react';
import { PersistedFields } from './types';

export type PersistContextType = {
  paused: (pause?: boolean) => boolean;
  rehydrate: (fields: PersistedFields) => PersistedFields;
};

export const defaultPausedValue = false;
export const PersistContext = React.createContext<PersistContextType>({
  paused: () => defaultPausedValue,
  rehydrate: (fields) => fields,
});

export const usePersistContext = () => useContext(PersistContext);
