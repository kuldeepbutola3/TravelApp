// import React, { useEffect } from 'react';
// import { AxiosResponse, AxiosInstance } from 'axios';
// import { NativeModules } from 'react-native';
// import { useBindAction, useStore, useSliceSelector } from '../../redux/hooks';
// import { useOnMount } from 'src/hooks/commonHooks';
// import { subscribe } from '../../utils/redux-subscriber';
// import { AylaError } from '../../aylaError';
// // import { useBindAction, useStore, useOnMount, useSliceSelector } from '../../src/hooks';
// // import {
// //   toResponseInfo,
// //   isSuccessfulAuthResponse,
// //   isSuccessfulSRPAuthResponse,
// //   isRefreshFailure,
// //   isDataTokenFailure,
// //   getTokensFromAuthResponse,
// //   isInvalidTokenFailure,
// // } from 'src/aura/platform/session/TokenManager/util';
// // import { subscribe } from 'src/utils/redux-subscriber';
// // import { decodeJWT, isEmptyEntitlements, jwtNow } from 'src/aura/jwtSelector';
// // import { isDeviceAlreadyRegistered } from 'src/suite/deviceManagementSlice';
// // import { logErrorAndReject } from 'src/aura/apiClientConfigurator';
// // import {
// //   configureAPIClients,
// //   configureAPIHeaders,
// //   syncRequestAuthorizationHeaders,
// // } from 'src/aura/apiClientHandling';
// // import { AuraError } from 'src/aura/auraError';
// // import { ignoreCatch } from 'src/utils/axios/errorHandling';
// // import { log } from 'src/utils/logging';
// // import useAuraTracking, * as Events from 'src/analytics';
// // import { initialTokens, sessionSlice } from '../sessionSlice';
// // import { refresh } from '../sessionAPI';
// // import { AuthenticationResponse } from '../sessionTypes';
// // import { configureTimer, startTimer, pauseTimer } from './timer';
// // import { useLogoutRoutine } from '../hooks/useLogoutRoutine';
// // import { isRoleChildSession } from 'src/aura/jwtRoleProvider';
// // import { circleSlice } from 'src/parentalControls/circleSlice';
// // import { saveRefreshToken } from 'src/utils/keychainHelper/keychainHelper';

// const { VPNModule, PCVPNModule } = NativeModules;

// export const TokenManager: React.FC = ({ children }) => {
//   const store = useStore();
//   // const doLogoutRoutine = useLogoutRoutine();

//   // const updateTokens = useBindAction(sessionSlice.actions.updateTokens);
//   // const updateChildTokens = useBindAction(circleSlice.actions.updateTokens);
//   // const track = useAuraTracking();
//   // const { isTrustedDevice } = useSliceSelector('authAttempt');
//   // const { session } = useSliceSelector('session');

//   // useEffect(() => {
//   //   isTrustedDevice &&
//   //     session.tokens.refreshToken.value.length > 0 &&
//   //     saveRefreshToken(session.tokens.refreshToken.value);
//   // }, [isTrustedDevice, session.tokens, session.tokens.refreshToken.value]);

//   // Subscribe to session alive/dead events
//   // subscribe(
//   //   (s) => s.session.session.tokens.refreshToken.expiration,
//   //   (expires, prevExpires) => {
//   //     if (expires === null && prevExpires !== null) {
//   //       pauseTimer();
//   //     }
//   //     if (expires !== null && prevExpires === null) {
//   //       startTimer();
//   //     }
//   //   }
//   // );

//   // const initiateTokenRefresh = (refreshToken: string, isChildSession = false) => {
//   //   log.info('TokenManager | initiateTokenRefresh');
//   //   refresh(refreshToken, isChildSession).then((tokens) => {
//   //     isDeviceAlreadyRegistered(tokens.access_token).then((isDeviceRegistered) => {
//   //       const decodedToken = decodeJWT(tokens.access_token);
//   //       if (isEmptyEntitlements(decodedToken)) {
//   //         return;
//   //       }

//   //       if (!isDeviceRegistered) {
//   //         log.info('TokenManager | Device is not registered after token refresh');
//   //         VPNModule.isVpnConnected()
//   //           .then((connected: boolean) => {
//   //             if (connected) {
//   //               track(Events.VPNEvent.stopTokenManager('auto_token_refresh_device_not_registered'));
//   //               // FIXME: Disabled for 2.22.4. Re-enable this back after gathering telemetry data
//   //               //VPNModule.stop();
//   //             }
//   //           })
//   //           .catch(ignoreCatch);

//   //         PCVPNModule.isConnected()
//   //           .then((connected: boolean) => {
//   //             if (connected) {
//   //               PCVPNModule.stop();
//   //             }
//   //           })
//   //           .catch(ignoreCatch);
//   //         doLogoutRoutine(false);
//   //       }
//   //     });
//   //   });
//   // };

//   const updateSessionTokens = (newTokens: AuthenticationResponse) => {
//     log.info('TokenManager | updateSessionTokens');
//     const tokens = getTokensFromAuthResponse(newTokens);
//     if (isRoleChildSession(tokens.accessToken.value)) {
//       updateChildTokens({ accessToken: tokens.accessToken });
//       updateTokens({ accessToken: tokens.accessToken });
//     } else {
//       updateTokens(tokens);
//     }

//     // TODO: instead of this each client should "listen" for token updates and set their own headers correspondingly
//     configureAPIHeaders(tokens);
//   };

//   // Generate the handler that will be called after every axios response
//   /*
//   TODO: refactor. Remove all the logic checkig for edpoints.
//   Refresh should happen before requests are sent.
//   Auth error on data requests should triger logout without refresh.
//   */
//   const responseCallback = (
//     axiosResponse: AxiosResponse,
//     client: AxiosInstance,
//     error?: AylaError
//   ) => {
//     // if (axiosResponse.data === undefined || axiosResponse.data === null) {
//     //   axiosResponse.data = {};
//     // }

//     // const response = toResponseInfo(axiosResponse);
//     // const tokens = store.getState().session.session.tokens;
//     // const isChildSession = isRoleChildSession(tokens.accessToken.value);

//     // log.info('TokenManager | responseCallback:', response.url);

//     // // This includes a successful tokens refresh.
//     // if (isSuccessfulAuthResponse(response)) {
//     //   log.info('TokenManager | successfulAuthRespon');
//     //   updateSessionTokens(response.data);
//     // }

//     // // This includes a successful update password | login for new SRP auth flow.
//     // else if (isSuccessfulSRPAuthResponse(response)) {
//     //   log.info('TokenManager | successfulSRPAuthResponse');
//     //   updateSessionTokens(response.data.session);
//     // }

//     // // 401 from /refresh means the session is dead
//     // else if (isRefreshFailure(response)) {
//     //   log.info('TokenManager | refreshFailure:', error);

//     //   if (isChildSession) {
//     //     PCVPNModule.stop();
//     //   }

//     //   doLogoutRoutine(true);
//     // }

//     // // 400 from /refresh means the token is invalid and the session should end
//     // else if (isInvalidTokenFailure(response)) {
//     //   log.info('TokenManager | invalidToken:', error);

//     //   if (isChildSession) {
//     //     PCVPNModule.stop();
//     //   }

//     //   updateTokens(initialTokens());
//     //   updateChildTokens(initialTokens());
//     // }

//     // // 401 from data services mark the session as needing a refresh
//     // // by assigning the expiration to `null`
//     // else if (isDataTokenFailure(response)) {
//     //   log.info('TokenManager | dataTokenFailure');
//     //   const currentRefreshToken = tokens.refreshToken;

//     //   // This should prevent duplicate refresh calls by timer
//     //   updateTokens({ accessToken: { expiration: null } });

//     //   /*
//     //   For now we will send multiple refresh requests in case
//     //   there are multiple consecutive failed data requests.
//     //   TODO: This logic need to be refactored and token refresh should
//     //   happen before requests are sent based on expiration date.
//     //   Failed data requests should just trigger logout.
//     //   */

//     //   /*
//     //   Client code does not have to worry about retrying for
//     //   every service that may return a 401, which could potentially
//     //   happen quite often. This does a retry automatically once
//     //   a call to refresh is successful. It is preferable to refresh
//     //   on the user's behalf, rather than showing an ambiguous error
//     //   message to the user possibly every 3 minutes. */
//     //   return refresh(currentRefreshToken.value, isChildSession).then((result) => {
//     //     const freshAccessToken = getTokensFromAuthResponse(result).accessToken;
//     //     syncRequestAuthorizationHeaders(axiosResponse.config, freshAccessToken.value);
//     //     if (isChildSession) {
//     //       updateChildTokens({ accessToken: freshAccessToken });
//     //     }
//     //     return client.request(axiosResponse.config);
//     //   });
//     // }

//     /*
//     The axios response interceptor essentially turns every promise result
//     into a success, then forwards to this callback for various error handling.
//     If the original response was an error, we reject this promise chain
//     so the initial error can continue on it's original trajectory. */
//     if (error !== undefined && !response.isValid) {
//       return logErrorAndReject(error, undefined);
//     } else {
//       return Promise.resolve(axiosResponse);
//     }
//   };

//   // Configure API clients
//   useOnMount(() => {
//     configureAPIClients(track, responseCallback);
//   });

//   /*
//   called every time the timer ticks. It will check to see if any tokens
//   are expired or about to expire. Normally, the only scenarios when a
//   token would expire is if
//     - the call to /refresh is failing for whatever reason or
//     - the app returned from background for a long period of time

//   Although dynamically calculated, refresh tokens expire after 15 mins
//   and access tokens expire after 3 mins. 3 min access token expiring is
//   recoverable, but 15 mins of no activity most certainly requires a login
//   by the user. You can potentially add a "session is about to expire"
//   mechanism in this handler, but for now, we are silently refreshing
//   on their behalf as long as the app is in the foreground. */
//   configureTimer(() => {
//     const { accessToken, refreshToken } = store.getState().session.session.tokens;
//     const userDefinedExpiration = store.getState().session.session.userDefinedExpiration;
//     /*
//     Either a 401 response or a determined expiry time (below) will signify the
//     token is definitely expired by setting it to null. In that case, we don't
//     need to do anything because a /refresh fetch is already in progress. */
//     if (accessToken.expiration === null || refreshToken.expiration === null) {
//       return;
//     }

//     // Check whether user-defined session termination is set
//     if (userDefinedExpiration !== null) {
//       return;
//     }

//     const currentTime = jwtNow();
//     const accessExpiresIn = accessToken.expiration - currentTime;
//     const refreshExpiresIn = refreshToken.expiration - currentTime;

//     const refreshExpiresIn1Min = refreshExpiresIn > 0 && refreshExpiresIn < 60;
//     const accessExpiresIn1Min = accessExpiresIn > 0 && accessExpiresIn < 60;

//     // Child session tokens are refreshed on app launch or in the vpn module
//     const isChildSession = isRoleChildSession(accessToken.value);
//     if (isChildSession) {
//       return;
//     }

//     /*
//     We don't need to set the expiration to null because it's still a valid
//     token. Here we are preemptively refreshing the session before it expires.
//     The new expiration (if successful) will be reduced by the
//     axio response handler. It is unlikely another tick will occur before
//     this /refresh fetch completes */
//     if (refreshExpiresIn1Min || accessExpiresIn1Min) {
//       log.info('TokenManager | Token expires in 1 min');
//       initiateTokenRefresh(refreshToken.value, isChildSession);
//       return;
//     }

//     const accessIsExpired = accessExpiresIn <= 0;
//     const refreshIsExpired = refreshExpiresIn <= 0;

//     if (accessIsExpired && !refreshIsExpired) {
//       log.info('TokenManager | Access token expired');
//       /*
//       access token is expired but still have a valid refresh token
//       (i.e. more than 3 but less than 15 minutes). Should only happen
//       if the app was backgrounded for a little bit */
//       updateTokens({ accessToken: { expiration: null } });
//       initiateTokenRefresh(refreshToken.value);
//       return;
//     }

//     if (refreshIsExpired) {
//       log.info('TokenManager | Refresh token expired');
//       doLogoutRoutine(true);
//     }
//   });

//   return <>{children}</>;
// };
