import { createReducer } from '@reduxjs/toolkit';
import { RootState } from '../../rootReducer';
import { rehydrateActionCreator } from './actions';
import { lodashHas, lodashSet } from '../../../lodash/lodash';

export const rehydrateReducer = createReducer<RootState | undefined>(
  undefined,
  builder => {
    console.log('hhhhhhhhh..cccccc.............', builder);
    builder.addCase(rehydrateActionCreator, (state, action) => {
      console.log('aaaaaaaaaa...............');
      if (!state) {
        return;
      }
      Object.entries(action.payload).forEach(([keyPath, value]) => {
        if (!lodashHas(state, keyPath)) {
          // Don't assign nonexistent properties
          return;
        }
        lodashSet(state || {}, keyPath, value);
      });
    });
  },
);
