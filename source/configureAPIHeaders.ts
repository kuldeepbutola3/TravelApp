import base64 from 'react-native-base64';
import AppConstants from 'src/utility/AppConstants';
import Utility from 'src/utility/AppUtility';
import {
  configureAylaClientHeaders,
  configureAylaClientTextHeaders,
  configureeBayAuthClientHeaders,
  configureMLClientHeaders,
  configureStripePayoutClientHeaders,
  configureWooProductClientHeaders,
} from './aylaClient';
import { MeDataResponse } from './session/sessionTypes';
import { UserWp } from './user/UserWp';

type Config = {
  token: string;
  tokenType?: string;
};
export const configureAPIHeaders = (token?: Config) => {
  const authorization = () => {
    console.log('TOKEN', token);
    if (token) {
      return `${token.tokenType || 'Bearer'} ${token.token}`;
    }
    return (
      'Basic ' + base64.encode(AppConstants.AYLA_CLIENT_ID + ':' + AppConstants.AYLA_CLIENT_SECRET)
    );
  };
  const authorizationML = () => {
    if (token) {
      return `Bearer ${token.token}`;
    }
    return null;
  };

  configureAylaClientHeaders({
    Authorization: authorization(),
  });
  configureMLClientHeaders({
    Authorization: authorizationML(),
  });

  configureAylaClientTextHeaders({
    Authorization: authorization(),
    'Content-Type': 'text/plain',
  });
};

export const configureWooClientProductHeadersAPI = (userName: string, password: string) => {
  configureWooProductClientHeaders({
    Authorization: 'Basic ' + base64.encode(userName + ':' + password),
  });
};

export const configureStripePayoutHeadersAPI = (accountNum: string) => {
  const stripeToken = 'bearer ' + AppConstants.SECRET_KEY_STRIPE;
  configureStripePayoutClientHeaders({
    Authorization: stripeToken,
    'Stripe-Account': accountNum,
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: '*/*',
  });
};
export const configureeBayAuthClientHeadersAPI = (token: string) => {
  console.log('Token is are', token);
  const ebayAuthToken = 'Bearer ' + token;
  configureeBayAuthClientHeaders({
    Authorization: ebayAuthToken,
    // 'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Type': 'application/json',

    Accept: '*/*',
  });
};
