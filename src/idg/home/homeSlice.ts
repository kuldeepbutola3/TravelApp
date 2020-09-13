import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootStateObj } from 'src/redux/rootReducer';

import { DispositonActionParams, hitapi } from './homeAPI';

// Requesting one page of alerts with loading state, and only one request at a time

interface AlertsState {
  loading: 'idle' | 'pending';
  error: string | null;
}

const initialState: AlertsState = {
  loading: 'idle',
  error: null,
};

export const fetchApi = createAsyncThunk<
  // Return type of the payload creator
  any,
  // First argument to the payload creator (provide void if there isn't one)
  DispositonActionParams,
  // Types for ThunkAPI
  RootStateObj
>('home/fetch', async (params) => {
  return hitapi(params);
});

export const homeSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApi.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
        }
      })
      .addCase(fetchApi.fulfilled, (state, _) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
        }
      })
      .addCase(fetchApi.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
          state.error = action.error.message || null;
        }
      });
  },
});
