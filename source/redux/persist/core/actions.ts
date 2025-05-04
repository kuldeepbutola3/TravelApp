import { createAction } from '@reduxjs/toolkit';
import { PersistedFields } from './types';

export const PERSIST_HYDRATE = 'persist/rehydrate';

export const rehydrateActionCreator = createAction<PersistedFields, typeof PERSIST_HYDRATE>(
  PERSIST_HYDRATE
);
