import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootStateObj} from 'src/redux/rootReducer';
import {getPlans} from './genericApi';

interface GenericState {
  loading: 'idle' | 'pending';
  error: string | null;
}

const initialState: GenericState = {
  loading: 'idle',
  error: null,
};

export const fetchPlans = createAsyncThunk<
  // Return type of the payload creator
  any,
  // First argument to the payload creator (provide void if there isn't one)
  void,
  // Types for ThunkAPI
  RootStateObj
>('client/plans', async () => {
  return await getPlans();
});

export const genericSlice = createSlice({
  name: 'getMoniteredItemsUserIds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchPlans.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
        }
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
        }
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
          state.error = action.error.message || null;
        }
      });
  },
});
