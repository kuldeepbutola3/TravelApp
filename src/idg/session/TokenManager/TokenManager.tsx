import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import React from 'react';
import { configureDefault, configureClient, setTokens } from 'src/idg/IDGClient';
import { E_REFRESH } from '../sessionAPI';
import { IDGSession } from '../SessionModel';

export const TokenManager: React.FC = ({ children }) => {
  const responseCallback = (
    axiosResponse: AxiosResponse,
    client: AxiosInstance,
    error?: AxiosError
  ) => {
    console.log('url', axiosResponse.config.url);
    if (axiosResponse.config.url) {
    }
    const url = axiosResponse?.config?.url ?? '';
    if (url.indexOf(E_REFRESH) > -1) {
      const reponnse = axiosResponse.data as IDGSession;
      console.log('reponnse', reponnse);
      reponnse && setTokens(reponnse.tokenId);
    }
    // const response = toResponseInfo(axiosResponse);
    // /*
    // This includes a successful /session password login but also /refresh.
    // doLogin.fulfilled could potentially contain the same logic, but putting
    // the logic here ensures it happens for both login and /refresh */
    // if (isSuccessfulAuthResponse(response)) {
    //   updateTokens({
    //     accessToken: {
    //       value: response.data.accessToken,
    //       expiration: expires(response.data.accessToken, DEFAULT_ACCESS_TOKEN_MINS),
    //     },
    //     refreshToken: {
    //       value: response.data.refreshToken,
    //       expiration: expires(response.data.refreshToken, DEFAULT_REFRESH_TOKEN_MINS),
    //     },
    //   });
    // }

    // // 401 from /refresh means the session is dead
    // else if (isRefreshFailure(response)) {
    //   updateTokens(initialTokens());
    // }

    // // 401 from data services mark the session as needing a refresh
    // // by assigning the expiration to `null`
    // else if (isDataTokenFailure(response)) {
    //   const {
    //     accessToken: currentAccessToken,
    //     refreshToken: currentRefreshToken,
    //   } = store.getState().session.session.tokens;
    //   /*
    //   If the token is already null, a refresh is already being done.
    //   Although unlikely, multiple calls here (e.g. rapid autocomplete calls)
    //   would all try to refresh the token. We don't want to hammer on
    //   the /refresh endpoint so we gate it here and let additional attempts
    //   fall through as a rejection */
    //   if (currentAccessToken.expiration !== null) {
    //     updateTokens({ accessToken: { expiration: null } });
    //     /*
    //     Client code does not have to worry about retrying for
    //     every service that may return a 401, which could potentially
    //     happen quite often. This does a retry automatically once
    //     a call to refresh is successful. It is preferable to refresh
    //     on the user's behalf, rather than showing an ambiguous error
    //     message to the user possibly every 3 minutes. */
    //     return refresh(currentRefreshToken.value).then(() => client.request(axiosResponse.config));
    //   }
    // }

    /*
    The axios response interceptor essentially turns every promise result
    into a success, then forwards to this callback for various error handling.
    If the original response was an error, we reject this promise chain
    so the initial error can continue on it's original trajectory. */
    return error !== undefined ? Promise.reject(error) : Promise.resolve(axiosResponse);
  };
  configureClient({ responseCallback });
  configureDefault();
  return <>{children}</>;
};
