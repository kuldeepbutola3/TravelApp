import { AxiosInstance, AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';

export type RequestCallback = (
  requestConfig: AxiosRequestConfig,
  instance: AxiosInstance,
  error?: Error
) => void;
export type ResponseCallback = (
  response: AxiosResponse,
  instance: AxiosInstance,
  error?: AxiosError
) => Promise<AxiosResponse>;

/**
 * AylaAxiosInstance provides type safety for our Axios endpoints. The Axios GET function
 * (and others) are a string, but we want to supply our own type so we can more easily refactor,
 * autocomplete, and do comparisons.
 */
export interface AylaAxiosInstance<Endpoint extends string> extends AxiosInstance {
  get<T = unknown, R = AxiosResponse<T>>(
    url: Endpoint,
    config?: AylaAxiosRequestConfig<Endpoint>
  ): Promise<R>;
  delete<T = unknown, R = AxiosResponse<T>>(
    url: Endpoint,
    data?: unknown,
    config?: AylaAxiosRequestConfig<Endpoint>
  ): Promise<R>;
  head<T = unknown, R = AxiosResponse<T>>(
    url: Endpoint,
    config?: AylaAxiosRequestConfig<Endpoint>
  ): Promise<R>;
  options<T = unknown, R = AxiosResponse<T>>(
    url: Endpoint,
    config?: AylaAxiosRequestConfig<Endpoint>
  ): Promise<R>;
  post<T = unknown, R = AxiosResponse<T>>(
    url: Endpoint,
    data?: unknown,
    config?: AylaAxiosRequestConfig<Endpoint>
  ): Promise<R>;
  put<T = unknown, R = AxiosResponse<T>>(
    url: Endpoint,
    data?: unknown,
    config?: AylaAxiosRequestConfig<Endpoint>
  ): Promise<R>;
  patch<T = unknown, R = AxiosResponse<T>>(
    url: Endpoint,
    data?: unknown,
    config?: AylaAxiosRequestConfig<Endpoint>
  ): Promise<R>;
}
export interface AylaAxiosRequestConfig<Endpoint extends string> extends AxiosRequestConfig {
  url?: Endpoint;

  context?: {
    requestStartTime: number;
  };
}
