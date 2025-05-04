import { AxiosResponse } from 'axios';
import { AylaError } from '../../aylaError';

export type ResponseValidator = <T>(data: AxiosResponse<T>) => Promise<AxiosResponse<T>>;

export const validateIfResponseIsArray: ResponseValidator = (response) => {
  if (response.data instanceof Array) {
    return Promise.resolve(response);
  }

  const validationError: AylaError = {
    code: 422,
    message: 'Response validation failed. Response is not array',
    domain: 'CLNT',
  };

  return Promise.reject(validationError);
};
