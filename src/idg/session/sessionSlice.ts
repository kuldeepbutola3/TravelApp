import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootStateObj } from 'src/redux/rootReducer';
import { IDGSession, SessionState } from './SessionModel';
import { refreshToken } from './sessionAPI';
import { configureDefault } from '../IDGClient';

// Requesting a session with loading state, and only one request at a time
const initialState: SessionState = {
  session: undefined,
  loading: 'idle',
  error: null,
};

export const doFetchRefreshToken = createAsyncThunk<
  // Return type of the payload creator
  IDGSession,
  // First argument to the payload creator (provide void if there isn't one)
  void,
  // Types for ThunkAPI
  RootStateObj
>('session/refreshToken', async () => {
  configureDefault();
  return refreshToken();
});

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    // updateTokens: (
    //   state: SessionState,
    //   action: PayloadAction<string>,
    // ) => {
    //   const newTokens = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(doFetchRefreshToken.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
        }
      })
      .addCase(doFetchRefreshToken.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
        }
        state.session = action.payload;
      })
      .addCase(doFetchRefreshToken.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
          state.error = action.error.message || null;
        }
      });
  },
});
