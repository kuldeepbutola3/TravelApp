import {
  createAsyncThunk,
  createSlice,
  // PayloadAction,
  // unwrapResult,
  // createAction,
} from '@reduxjs/toolkit';
import { RootStateObj } from 'src/redux/rootReducer';
// import {useThunkDispatch, useBindAction, useStore} from 'src/redux/hooks';
// import jwtDecode from 'jwt-decode';
// import {appSlice} from 'src/appSlice';
// import {useState, useEffect} from 'react';
// import {useSelector} from 'react-redux';

// import {
//   LoginParams,
//   login,
//   ProfileResponse,
//   AuthenticationResponse,
//   fetchProfile,
// } from './sessionAPI';
import { IDGSession, SessionState } from './SessionModel';
import { refreshToken } from './sessionAPI';
import { configureDefault } from '../IDGClient';
// import {fetchFlight} from '../flight/flightSlice';

// export const initialTokens = (): Tokens => ({
//   refreshToken: {value: '', expiration: null},
//   accessToken: {value: '', expiration: null},
// });

// Requesting a session with loading state, and only one request at a time
const initialState: SessionState = {
  session: undefined,
  loading: 'idle',
  error: null,
};

// export const useIsLoggedIn = () => {
//   const isRefreshValid = (
//     token: SessionState['session']['tokens']['refreshToken'],

//   ) => token.value !== '';
//   const refreshTokenSelector = (state: RootState) =>
//     state.session.session.tokens.refreshToken;
//   const refreshToken = useSelector(refreshTokenSelector);
//   const [isLoggedIn, setIsLoggedIn] = useState(isRefreshValid(refreshToken));
//   useEffect(() => {
//     setIsLoggedIn(isRefreshValid(refreshToken));
//   }, [refreshToken]);
//   return isLoggedIn;
// };

// export const useRefreshToken = () => {
//   const dispatch = useThunkDispatch();
//   // console.log('aaaaaaa');
//   configureDefault();

//   return async () => {
//     await dispatch(doFetchRefreshToken())
//       .then(unwrapResult)
//       .then(async (authResult) => {
//         // const {} = authResult;
//         // console.log('authResult', authResult);
//         configureClient({
//           headers: {
//             Authorization: `Basic ${authResult.tokenId}`,
//           },
//         });

//         await dispatch(fetchFlight());
//         return Promise.resolve(authResult);
//       });
//   };
// };

// export const doLogin = createAsyncThunk<
//   // Return type of the payload creator
//   AuthenticationResponse,
//   // First argument to the payload creator (provide void if there isn't one)
//   LoginParams,
//   // Types for ThunkAPI
//   RootStateObj
// >('session/login', async (params) => {
//   return await login(params);
// });

// export const LOGOUT_ACTION = 'session/logout';

// export const useLogout = () => {
//   const logout = useBindAction(createAction(LOGOUT_ACTION));
//   const store = useStore();
//   const {setAppState} = appSlice.actions;
//   const restoreAppState = useBindAction(setAppState);
//   return () => {
//     const currentApp = store.getState().app;
//     logout();
//     // unregisterRemoteNotifications();
//     restoreAppState(currentApp);
//   };
// };

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

// export const CreditEntitlementKey = 'itps:credit_score';
// export const EntitlementKey = 'aurasvc:entitlements';
// export type JWTResponse = {
//   sub?: string;
//   exp?: string;
//   [EntitlementKey]?: {
//     [CreditEntitlementKey]?: CreditProductCode[];
//   };
// };

// const jwtSelector = (state: RootState) =>
//   state.session.session.tokens.accessToken.value;

// export const useJWTSelector = () => {
//   const rawToken = useSelector(jwtSelector);

//   const [jwt, setJwt] = useState<JWTResponse>(jwtDecode<JWTResponse>(rawToken));
//   useEffect(() => {
//     const decoded = jwtDecode<JWTResponse>(rawToken);
//     setJwt(decoded);
//   }, [rawToken]);

//   return jwt;
// };

/**
 * Use this if you only need the current value in the store as opposed
 * to needing to re-render when the JWT changes. Note: the JWT changes
 * just about every 3 mins (after each refresh call). If you need to
 * rerender every time the JWT is refreshed, use `useJWTSelector`.
 */
// export const useJWTInfo = (): JWTResponse => {
//   try {
//     const store = useStore();
//     const rawToken = jwtSelector(store.getState());
//     return jwtDecode<JWTResponse>(rawToken);
//   } catch (e) {
//     return {};
//   }
// };

// type UpdateTokens = {
//   accessToken?: Partial<Tokens['accessToken']>;
//   refreshToken?: Partial<Tokens['refreshToken']>;
// };

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
