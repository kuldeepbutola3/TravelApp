// import { AxiosResponse } from 'axios';
// import { E_CREDIT_LOCK, E_CREDIT_SIMULATOR } from 'src/idg/creditScore/creditScoreAPI';
// import { IDGEndpoint } from 'idg/idgEndpoints';
// import {
//   E_REFRESH,
//   AuthenticationStatusResponse,
//   AuthenticationResponse,
//   E_SIGNOUT,
//   E_REDEEM,
// } from 'src/aura/platform/session/sessionTypes';
// import {
//   E_CREATE_GUEST,
//   E_BEGIN_SIGNUP,
//   E_CONFIGURE_MFA,
//   E_CONINUE_AUTH_ATTEMPT,
// } from 'src/aura/platform/auth/authTypes';
// import { E_DEVICE_REGISTER_V3 } from 'src/suite/suiteClient';
// import { jwtExpires } from 'src/aura/jwtSelector';

// const DEFAULT_ACCESS_TOKEN_MINS = 3;
// const DEFAULT_REFRESH_TOKEN_MINS = 15;

// /**
//  * AxiosResponse is not serializable and has some hierarchy. Converting
//  * to a testable, flattened type.
//  */
// export type ResponseInfo<Data = unknown> = {
//   url: IDGEndpoint;
//   isValid: boolean;
//   method: AxiosResponse['config']['method'];
//   data: Data;
//   status: number;
// };

// export type ResponseTest = (response: ResponseInfo) => boolean;

// export const isValid = (response: AxiosResponse) =>
//   response.config.validateStatus
//     ? response.config.validateStatus(response.status)
//     : response.status === 200;

// /**
//  * Converting to a responseInfo so it can be serialized and tested easily.
//  */
// export const toResponseInfo = <Data>(response: AxiosResponse<Data>): ResponseInfo<Data> => {
//   return {
//     url: response.config.url as IDGEndpoint,
//     isValid: isValid(response),
//     method: response.config.method,
//     data: response.data,
//     status: response.status,
//   };
// };
// // TODO: figure out if `endsWith` is the right determination. Change the
// // 'tests for an endpoint' test if changing this logic
// export const isEndpoint = (response: ResponseInfo, endpoint: IDGEndpoint) =>
//   response.url.endsWith(endpoint);

// export const isOneOfEndpoints = (response: ResponseInfo, ...endpoints: IDGEndpoint[]) =>
//   endpoints.reduce((found, e) => response.url.endsWith(e) || found, false);

// export const isAuthEndpoint: ResponseTest = (response) =>
//   isOneOfEndpoints(
//     response,
//     E_REFRESH,
//     E_BEGIN_SIGNUP,
//     E_CONINUE_AUTH_ATTEMPT,
//     E_CONFIGURE_MFA,
//     E_CREATE_GUEST,
//     E_REDEEM,
//     E_CREDIT_SIMULATOR
//   );

// // Some API return's 401 for cases which is not related for expired token, it can trigger infinite refresh loop
// export const isRefreshExcludedEndpoints: ResponseTest = (response) =>
//   isOneOfEndpoints(response, E_SIGNOUT, E_CREDIT_LOCK, E_DEVICE_REGISTER_V3);

// export const isPost: ResponseTest = ({ method }) => method?.toUpperCase() === 'POST';

// export const isGet: ResponseTest = ({ method }) => method?.toUpperCase() === 'GET';

// // a successful call to /refresh
// export const isSuccessfulAuthResponse = (
//   response: ResponseInfo<AuthenticationResponse>
// ): response is ResponseInfo<AuthenticationResponse> =>
//   (response.isValid &&
//     isAuthEndpoint(response) &&
//     isPost(response) &&
//     response.data &&
//     response.data.access_token &&
//     response.data.refresh_token &&
//     true) ||
//   false;

// // a successful call to /session login
// export const isSuccessfulSRPAuthResponse = (
//   response: ResponseInfo<AuthenticationStatusResponse>
// ): response is ResponseInfo<AuthenticationStatusResponse> =>
//   (response.isValid &&
//     isAuthEndpoint(response) &&
//     isPost(response) &&
//     response.data &&
//     response.data?.session?.access_token &&
//     response.data?.session?.refresh_token &&
//     true) ||
//   false;

// export const isAuthFailure: ResponseTest = ({ status }) => status === 401;

// export const isInvalidTokenFailure: ResponseTest = (response) =>
//   response.status === 400 && isEndpoint(response, E_REFRESH);

// export const isRefreshFailure: ResponseTest = (response) =>
//   !response.isValid &&
//   isPost(response) &&
//   isEndpoint(response, E_REFRESH) &&
//   isAuthFailure(response);

// export const isDataEndpoint: ResponseTest = (response) =>
//   !isAuthEndpoint(response) && !isRefreshExcludedEndpoints(response);

// export const isDataTokenFailure: ResponseTest = (response) =>
//   isAuthFailure(response) && isDataEndpoint(response);

// export const getTokensFromAuthResponse = (authResponse: AuthenticationResponse) => {
//   return {
//     accessToken: {
//       value: authResponse.access_token,
//       expiration: jwtExpires(authResponse.access_token, DEFAULT_ACCESS_TOKEN_MINS),
//     },
//     refreshToken: {
//       value: authResponse.refresh_token,
//       expiration: jwtExpires(authResponse.refresh_token, DEFAULT_REFRESH_TOKEN_MINS),
//     },
//   };
// };
