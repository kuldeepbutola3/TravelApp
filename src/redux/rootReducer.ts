import { combineReducers, Reducer } from '@reduxjs/toolkit';
import { flightSlice } from 'src/idg/flight/flightSlice';
// import {familyParticipantSlice} from 'src/idg/family/FamilySlice';
import { genericSlice } from 'src/idg/generic/genericSlice';
import { toastSlice } from 'src/idg/toast/ToastSlice';
import { appSlice } from '../appSlice';
import { homeSlice } from '../idg/home/homeSlice';
import { sessionSlice } from '../idg/session/sessionSlice';
// import {ftmSlice} from '../idg/ftm/ftmSlice';

const combineReducer = combineReducers({
  app: appSlice.reducer,
  home: homeSlice.reducer,
  session: sessionSlice.reducer,
  generic: genericSlice.reducer,
  toast: toastSlice.reducer,
  flight: flightSlice.reducer,
});

export type RootState = ReturnType<typeof combineReducer>;
export type RootStateObj = { state: RootState };
export type RootSelector = (state: RootState) => RootState[keyof RootState];

const rootReducer: Reducer<RootState> = (state, action) => {
  // if (action.type === LOGOUT_ACTION) {
  //   state = undefined;
  // }
  return combineReducer(state, action);
};

export default rootReducer;
