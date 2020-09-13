import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';
import { IDGEndpoint } from './IDGTypes';

/**
 * The valid types of IDG endpoint environments
 */
export type IDGEnvType = 'prod' | 'staging' | 'test';

export type ClientOptions = {
  env?: IDGEnvType;
  requestCallback?: (requestConfig: AxiosRequestConfig, instance: AxiosInstance) => void;
  responseCallback?: (
    response: AxiosResponse,
    instance: AxiosInstance,
    error?: AxiosError
  ) => Promise<AxiosResponse>;
  headers?: object;
};

const client = axios.create();
/**
 * Even though false is the default, this line will be here
 * so we can document the reason it's explicitly false. Right now,
 * the PN-Authorization is being set by the server and we're being
 * instructed to explicitly not send it with the follow up requests.
 * So we're disabling cookies entirely, which is generally safer
 * as well. However, should there be a need to enable cookies in axios
 * requests in the future, set this to `true` and be sure to clear
 * out the PN-Authorization cookie manually before any request
 * (or intercept and prevent it from writing on response).
 * https://codewithhugo.com/pass-cookies-axios-fetch-requests/
 */
client.defaults.withCredentials = false;

export const configureBaseUrl = (env: IDGEnvType) => {
  console.log('configured environment to ', env);
  const BaseURL = {
    prod: '',
    staging: '',
    test: 'http://testapi.besttoursofindia.in',
  };
  client.defaults.baseURL = BaseURL[env];
  // configureDefault();
  // client.defaults.headers = {
  //   Authorization: 'Basic NDA4NjExMDAwMzI6N2I1ODYyNDYtZGEwNi00NmFhLTgwZmItNmNmZjM2YjNkOTRk',
  // };
  // client.defaults.headers = {
  //   Authorization: 'Bearer 48fd089d-2b6b-4183-9d0e-b8bb23ea7f47',
  // };
};

export const setTokens = (tokens: string) => {
  // return (tokens: string) =>
  // getClient().defaults.headers.Authorization = `Bearer ${tokens.accessToken}`;
  // (
  getClient().defaults.headers = { Authorization: `Bearer ${tokens}` };
  // );
};

export const configureDefault = () => {
  getClient().defaults.headers = {
    Authorization: 'Basic NDA4NjExMDAwMzI6N2I1ODYyNDYtZGEwNi00NmFhLTgwZmItNmNmZjM2YjNkOTRk',
  };
};

configureBaseUrl('test');

const _options = {
  responseHandlerId: undefined as number | undefined,
  requestHandlerId: undefined as number | undefined,
};

/**
 * Gets an Axios client that is configured for the current IDG environment.
 * If the client has not already been constructed, this call will construct it.
 */
export const getClient = <Endpoint extends string>(): IDGAxiosInstance<Endpoint> => {
  return client;
};

/**
 * Configures various options after initialization
 */
export const configureClient = (options: ClientOptions) => {
  const { env, responseCallback, requestCallback, headers } = options;
  if (env) {
    configureBaseUrl(env);
  }

  if (responseCallback) {
    _options.responseHandlerId && client.interceptors.response.eject(_options.responseHandlerId);
    _options.responseHandlerId = client.interceptors.response.use(
      (response) => {
        return responseCallback(response, getClient());
      },
      (error) => {
        if (error.response) {
          return responseCallback(error.response, getClient(), error);
        }
        return Promise.reject(error);
      }
    );
  }

  if (requestCallback) {
    _options.requestHandlerId && client.interceptors.response.eject(_options.requestHandlerId);
    _options.requestHandlerId = client.interceptors.request.use((config) => {
      requestCallback(config, getClient());
      return config;
    });
  }

  if (headers) {
    client.defaults.headers = {
      ...client.defaults.headers,
      ...headers,
    };
  }
};

export const logErrorAndReject = (error: AxiosError) => {
  if (!__DEV__) {
    return Promise.reject(error);
  }
  if (error.response) {
    console.log(
      'response error',
      error.response.data,
      error.response.status,
      error.response.headers
    );
  } else if (error.request) {
    console.log('request error', error.request);
  } else {
    console.log('Error', error.message);
  }
  console.log('error.config', error.config);
  return Promise.reject(error);
};

export async function getIDGData<T>(
  url: IDGEndpoint,
  params?: AxiosRequestConfig['params']
): Promise<T> {
  return getClient<IDGEndpoint>()
    .get<T>(url, { params })
    .then((response: AxiosResponse) => {
      const { data } = response;
      return data;
    })
    .catch(logErrorAndReject);
}

export interface IDGAxiosInstance<Endpoint extends string> extends AxiosInstance {
  get<T = unknown, R = AxiosResponse<T>>(
    url: Endpoint,
    config?: IDGAxiosRequestConfig<Endpoint>
  ): Promise<R>;
  delete<T = unknown, R = AxiosResponse<T>>(
    url: Endpoint,
    config?: IDGAxiosRequestConfig<Endpoint>
  ): Promise<R>;
  head<T = unknown, R = AxiosResponse<T>>(
    url: Endpoint,
    config?: IDGAxiosRequestConfig<Endpoint>
  ): Promise<R>;
  options<T = unknown, R = AxiosResponse<T>>(
    url: Endpoint,
    config?: IDGAxiosRequestConfig<Endpoint>
  ): Promise<R>;
  post<T = unknown, R = AxiosResponse<T>>(
    url: Endpoint,
    data?: unknown,
    config?: IDGAxiosRequestConfig<Endpoint>
  ): Promise<R>;
  put<T = unknown, R = AxiosResponse<T>>(
    url: Endpoint,
    data?: unknown,
    config?: IDGAxiosRequestConfig<Endpoint>
  ): Promise<R>;
  patch<T = unknown, R = AxiosResponse<T>>(
    url: Endpoint,
    data?: unknown,
    config?: IDGAxiosRequestConfig<Endpoint>
  ): Promise<R>;
}

export interface IDGAxiosRequestConfig<Endpoint extends string> extends AxiosRequestConfig {
  url?: Endpoint;
}
