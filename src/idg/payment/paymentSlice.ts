import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootStateObj } from 'src/redux/rootReducer';

import { PaymentReponse } from './PaymentReponseModel';
import { PaymentRequest } from './PaymentRequestModel';
import { paymentRequest } from './paymentApi';

interface PaymentState {
  paymentReponse?: PaymentReponse;
  loading: 'idle' | 'pending';
  error: string | null;
}

const initialState: PaymentState = {
  loading: 'idle',
  error: null,
};

export const doFetchPaymentParam = createAsyncThunk<
  // Return type of the payload creator
  PaymentReponse,
  // First argument to the payload creator (provide void if there isn't one)
  PaymentRequest,
  // Types for ThunkAPI
  RootStateObj
>('payment/fetchpayment', async (params) => {
  return paymentRequest(params);
});

export const paymentSlice = createSlice({
  name: 'flight',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(doFetchPaymentParam.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
        }
      })
      .addCase(doFetchPaymentParam.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
        }
        state.paymentReponse = action.payload;
      })
      .addCase(doFetchPaymentParam.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
          state.error = action.error.message || null;
        }
      });
  },
});
