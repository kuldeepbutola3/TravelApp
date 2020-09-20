import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootStateObj } from 'src/redux/rootReducer';
import { getFlight, PlacesParam, searchPlaces } from './flightApi';
import { FlightPlaces, FlightResponse } from './FlightModel';

// Requesting one page of alerts with loading state, and only one request at a time

interface FlightState {
  flightDetail?: FlightResponse;
  places?: Array<FlightPlaces>;
  loading: 'idle' | 'pending';
  error: string | null;
}

const initialState: FlightState = {
  flightDetail: undefined,
  places: undefined,
  loading: 'idle',
  error: null,
};

export const fetchFlight = createAsyncThunk<
  // Return type of the payload creator
  FlightResponse,
  // First argument to the payload creator (provide void if there isn't one)
  void,
  // Types for ThunkAPI
  RootStateObj
>('flight/search', async () => {
  return getFlight();
});
export const fetchFlightPlaces = createAsyncThunk<
  // Return type of the payload creator
  Array<FlightPlaces>,
  // First argument to the payload creator (provide void if there isn't one)
  PlacesParam,
  // Types for ThunkAPI
  RootStateObj
>('flight/searchPlaces', async (param) => {
  return searchPlaces(param);
});

export const flightSlice = createSlice({
  name: 'flight',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlight.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
        }
      })
      .addCase(fetchFlight.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
        }
        state.flightDetail = action.payload;
      })
      .addCase(fetchFlight.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
          state.error = action.error.message || null;
        }
      })
      .addCase(fetchFlightPlaces.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
        }
      })
      .addCase(fetchFlightPlaces.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
        }
        state.places = action.payload;
      })
      .addCase(fetchFlightPlaces.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
          state.error = action.error.message || null;
        }
      });
  },
});
