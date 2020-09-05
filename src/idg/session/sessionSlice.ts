import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  unwrapResult,
  createAction,
} from '@reduxjs/toolkit';
import {RootStateObj, RootState} from 'src/redux/rootReducer';
import {useThunkDispatch, useBindAction, useStore} from 'src/redux/hooks';
// import jwtDecode from 'jwt-decode';
import {appSlice} from 'src/appSlice';
import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
// import {
//   getMoniteredItemsUserIds,
//   fetchPlans,
//   fetchDashboardSummary,
// } from '../generic/genericSlice';
// import {fetchMonitoredItems} from '../monitoredItems/monitoredItemSlice';
// import {CreditProductCode} from '../credit-score/CreditScoreModel';
// import {
//   registerRemoteNotifications,
//   unregisterRemoteNotifications,
// } from '../notifications/util';
// import {doRegisterDevice} from '../notifications/notificationsSlice';
import {
  LoginParams,
  login,
  ProfileResponse,
  AuthenticationResponse,
  fetchProfile,
} from './sessionAPI';
import {SessionState, Tokens} from './SessionModel';

export const initialTokens = (): Tokens => ({
  refreshToken: {value: '', expiration: null},
  accessToken: {value: '', expiration: null},
});

// Requesting a session with loading state, and only one request at a time
const initialState: SessionState = {
  session: {tokens: initialTokens()},
  loading: 'idle',
  error: null,
};

export const useIsLoggedIn = () => {
  const isRefreshValid = (
    token: SessionState['session']['tokens']['refreshToken'],
  ) => token.value !== '';
  const refreshTokenSelector = (state: RootState) =>
    state.session.session.tokens.refreshToken;
  const refreshToken = useSelector(refreshTokenSelector);
  const [isLoggedIn, setIsLoggedIn] = useState(isRefreshValid(refreshToken));
  useEffect(() => {
    setIsLoggedIn(isRefreshValid(refreshToken));
  }, [refreshToken]);
  return isLoggedIn;
};

export const useLogin = () => {
  const dispatch = useThunkDispatch();

  return (params: LoginParams) =>
    dispatch(doLogin(params))
      .then(unwrapResult)
      .then(async (authResult) => {
        const {accessToken} = authResult;
        console.log(accessToken);
        // const decoded = jwtDecode<JWTResponse>(accessToken);
        // if (!decoded.sub) {
        //   return Promise.reject('unable to parse user id');
        // }

        // // Note: we intentionally do not await this to complete
        // registerRemoteNotifications()
        //   .then((deviceParams) => {
        //     dispatch(doRegisterDevice(deviceParams));
        //   })
        //   .catch((error) => {
        //     console.log('registerRemoteNotificationsError: ', error); // this will be an error in the iOS simulator
        //   });

        // await dispatch(doFetchProfile(decoded.sub));
        // await dispatch(getMoniteredItemsUserIds());
        // await dispatch(fetchPlans());
        // await dispatch(fetchMonitoredItems());
        // await dispatch(fetchDashboardSummary());
        return Promise.resolve(authResult);
      });
};

export const doLogin = createAsyncThunk<
  // Return type of the payload creator
  AuthenticationResponse,
  // First argument to the payload creator (provide void if there isn't one)
  LoginParams,
  // Types for ThunkAPI
  RootStateObj
>('session/login', async (params) => {
  return await login(params);
});

export const LOGOUT_ACTION = 'session/logout';

export const useLogout = () => {
  const logout = useBindAction(createAction(LOGOUT_ACTION));
  const store = useStore();
  const {setAppState} = appSlice.actions;
  const restoreAppState = useBindAction(setAppState);
  return () => {
    const currentApp = store.getState().app;
    logout();
    // unregisterRemoteNotifications();
    restoreAppState(currentApp);
  };
};

export const doFetchProfile = createAsyncThunk<
  // Return type of the payload creator
  ProfileResponse,
  // First argument to the payload creator (provide void if there isn't one)
  string,
  // Types for ThunkAPI
  RootStateObj
>('session/profile', async (userId) => {
  return fetchProfile(userId);
});

export const CreditEntitlementKey = 'itps:credit_score';
export const EntitlementKey = 'aurasvc:entitlements';
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

type UpdateTokens = {
  accessToken?: Partial<Tokens['accessToken']>;
  refreshToken?: Partial<Tokens['refreshToken']>;
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    updateTokens: (
      state: SessionState,
      action: PayloadAction<UpdateTokens>,
    ) => {
      const newTokens = action.payload;
      const {refreshToken, accessToken} = state.session.tokens;

      if (newTokens.accessToken?.expiration !== undefined) {
        accessToken.expiration = newTokens.accessToken.expiration;
      }
      if (newTokens.accessToken?.value !== undefined) {
        accessToken.value = newTokens.accessToken.value;
      }
      if (newTokens.refreshToken?.expiration !== undefined) {
        refreshToken.expiration = newTokens.refreshToken.expiration;
      }
      if (newTokens.refreshToken?.value !== undefined) {
        refreshToken.value = newTokens.refreshToken.value;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(doLogin.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
        }
      })
      .addCase(doLogin.fulfilled, (state) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
        }
      })
      .addCase(doLogin.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
          state.error = action.error.message || null;
        }
      })
      .addCase(doFetchProfile.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
        }
      })
      .addCase(doFetchProfile.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
        }
        state.session.profile = action.payload;
      })
      .addCase(doFetchProfile.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
          state.error = action.error.message || null;
        }
      });
  },
});
