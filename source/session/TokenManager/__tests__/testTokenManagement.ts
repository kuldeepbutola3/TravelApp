jest.mock('src/idg/idgClient', () => ({
  getClient: jest.fn(),
  getIDGData: jest.fn(),
}));
import { AxiosResponse } from 'axios';
import { E_CONFIGURE_MFA } from 'src/aura/platform/auth/authTypes';
import {
  toResponseInfo,
  ResponseInfo,
  isAuthFailure,
  isRefreshFailure,
  isDataEndpoint,
  isDataTokenFailure,
  isSuccessfulSRPAuthResponse,
} from 'src/aura/platform/session/TokenManager/util';
import { E_DEVICE_REGISTER_V3 } from 'src/suite/suiteClient';
import { AuthenticationStatusResponse, E_REFRESH } from 'src/aura/platform/session/sessionTypes';

describe('session refresh token tests', () => {
  it('tests for successful login response', () => {
    const r = mockResponseInfo({
      method: 'post',
      url: E_CONFIGURE_MFA,
      data: {
        session: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          access_token: 'abc',
          // eslint-disable-next-line @typescript-eslint/naming-convention
          refresh_token: 'xyz',
        },
      },
      status: 200,
    }) as ResponseInfo<AuthenticationStatusResponse>;
    expect(isSuccessfulSRPAuthResponse(r)).toBe(true);
    r.isValid = false;
    r.status = 401;
    expect(isSuccessfulSRPAuthResponse(r)).toBe(false);
  });

  it('tests for a stale authorization response', () => {
    const r = mockResponseInfo({ status: 401, isValid: false });
    expect(isAuthFailure(r)).toBe(true);
  });

  it('tests for refresh token failure', () => {
    const r = mockResponseInfo({
      status: 500,
      isValid: false,
      method: 'post',

      url: E_REFRESH,
    });
    expect(isRefreshFailure(r)).toBe(false);
    r.status = 401;
    expect(isRefreshFailure(r)).toBe(true);
  });

  it('tests for non authorization endpoint', () => {
    const r = mockResponseInfo();
    expect(isDataEndpoint(r)).toBe(true);
    r.url = E_CONFIGURE_MFA;
    expect(isDataEndpoint(r)).toBe(false);
  });

  it('tests for non authorization failure', () => {
    const r = mockResponseInfo();
    expect(isDataTokenFailure(r)).toBe(false);
    r.status = 401;
    r.isValid = false;
    expect(isDataTokenFailure(r)).toBe(true);
    r.url = E_REFRESH;
    expect(isDataTokenFailure(r)).toBe(false);
    r.url = E_DEVICE_REGISTER_V3;
    expect(isDataTokenFailure(r)).toBe(false);
  });
});

const mockAxiosResponse = () => {
  return {
    config: {
      url: '',
      method: 'get',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: {} as any,
    status: 200,
  } as AxiosResponse;
};

const mockResponseInfo = (values?: Partial<ResponseInfo>): ResponseInfo => {
  return {
    ...toResponseInfo(mockAxiosResponse()),
    ...values,
  };
};
