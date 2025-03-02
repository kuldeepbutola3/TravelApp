import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateObj } from 'src/redux/rootReducer';
import { BookingInfo, Traveller, TravellerCount } from '../traveller/TravelerModel';
import {
  FlightFareParam,
  getFlight,
  PlacesParam,
  searchPlaces,
  getFlightFare,
  GetFlightParam,
} from './flightApi';
import { FlightFareResponse, FlightPlaces, FlightResponse } from './FlightModel';

// Requesting one page of alerts with loading state, and only one request at a time

interface FlightState {
  flightDetail?: FlightResponse;
  flightFare?: FlightFareResponse;
  places?: Array<FlightPlaces>;
  loading: 'idle' | 'pending';
  error: string | null;
  travellerAdult: Array<Traveller>;
  travellerChild: Array<Traveller>;
  travellerCount: TravellerCount;
  bookingInfo?: BookingInfo;
  currentTravellerId: number;
}

const initialState: FlightState = {
  flightDetail: undefined,
  places: undefined,
  flightFare: undefined,
  loading: 'idle',
  error: null,
  travellerAdult: [],
  travellerChild: [],
  travellerCount: { adult: 1, children: 0, infant: 0 },
  bookingInfo: undefined,
  currentTravellerId: 1,
};

export const fetchFlight = createAsyncThunk<
  // Return type of the payload creator
  FlightResponse,
  // First argument to the payload creator (provide void if there isn't one)
  GetFlightParam,
  // Types for ThunkAPI
  RootStateObj
>('flight/search', async (params) => {
  return getFlight(params);
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

export const fetchFlightFare = createAsyncThunk<
  // Return type of the payload creator
  FlightFareResponse,
  // First argument to the payload creator (provide void if there isn't one)
  FlightFareParam,
  // Types for ThunkAPI
  RootStateObj
>('flight/fare', async (param) => {
  return getFlightFare(param);
});
type AddTraveller = Omit<Traveller, 'id'>;
export const flightSlice = createSlice({
  name: 'flight',
  initialState,
  reducers: {
    addBookingInfo: (state, action: PayloadAction<BookingInfo>) => {
      state.bookingInfo = action.payload;
    },
    addTravellerCount: (state, action: PayloadAction<TravellerCount>) => {
      state.travellerCount = action.payload;
    },

    addTravelerInfo: (state, action: PayloadAction<AddTraveller>) => {
      const id = state.currentTravellerId;
      if (action.payload.isChild) {
        state.travellerChild = [...state.travellerChild, { ...action.payload, id }];
      } else {
        state.travellerAdult = [...state.travellerAdult, { ...action.payload, id }];
      }
      state.currentTravellerId = id + 1;
    },
    deleteTraveller: (state, action: PayloadAction<Traveller>) => {
      if (action.payload.isChild) {
        const array = [...state.travellerChild];
        const index = array.findIndex(
          (i) => action.payload.id === i.id
          // action.payload.dob === i.dob &&
          // action.payload.expDate === i.expDate &&
          // action.payload.fName === i.fName &&
          // action.payload.lName === i.lName &&
          // action.payload.nationality === i.nationality &&
          // action.payload.passportNo === i.passportNo &&
          // action.payload.gender === i.gender
        );
        array.splice(index, 1);
        state.travellerChild = [...array];
      } else {
        const array = [...state.travellerAdult];
        const index = array.findIndex(
          (i) => action.payload.id === i.id
          // action.payload.dob === i.dob &&
          // action.payload.expDate === i.expDate &&
          // action.payload.fName === i.fName &&
          // action.payload.lName === i.lName &&
          // action.payload.nationality === i.nationality &&
          // action.payload.passportNo === i.passportNo &&
          // action.payload.gender === i.gender
        );
        array.splice(index, 1);
        state.travellerAdult = [...array];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlight.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
        }
        state.flightDetail = undefined;
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
      })
      .addCase(fetchFlightFare.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
        }
      })
      .addCase(fetchFlightFare.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
        }
        state.flightFare = action.payload;
      })
      .addCase(fetchFlightFare.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
          state.error = action.error.message || null;
        }
      });
  },
});
