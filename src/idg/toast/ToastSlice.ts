import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useBindAction } from 'src/redux/hooks';
import { ToastModel } from '../../components/Toast';

export interface ReqType {
  // deleteAdult?: { id: string };
  deleteChild?: { id: string };
  // AlertDetails: AlertDetailsScreenParams;
  // WhatShouldIDo: WhatShouldIDoParams;
  // CaseCreated: CaseCreatedScreenParams;
  // TransactionThresholdSliderScreen: undefined;
}
interface ToastModelItem extends ToastModel {
  reqType?: ReqType;
  // addCallBackRequest?: (dispatch: StoreDispatch) => Promise<string | undefined>;
  // k?: () => void;
}

const initialState = {
  allToast: [] as Array<ToastModelItem>,
  currentToast: undefined as undefined | ToastModelItem,
  currentId: 0,
};

export const useToast = () => {
  const addToast = useBindAction(toastSlice.actions.addToast);
  return (param: ToastModelItem) => addToast(param);
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<ToastModelItem>) => {
      state.allToast = [...state.allToast, action.payload];
      if (state.allToast.length === 1) {
        state.currentToast = state.allToast[0];
        state.currentId = state.currentId + 1;
      }
    },
    removeToast: (state) => {
      if (state.allToast.length > 0) {
        const removedArray = [...state.allToast];
        removedArray.splice(0, 1);

        state.allToast = removedArray;
        if (removedArray.length > 0) {
          state.currentToast = removedArray[0];
          state.currentId = state.currentId + 1;
        } else {
          state.currentToast = undefined;
          state.currentId = 0;
        }
      }
    },
  },
});
