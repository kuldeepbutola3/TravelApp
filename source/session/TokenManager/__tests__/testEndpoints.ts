jest.mock('src/idg/idgClient', () => ({
  getClient: jest.fn(),
  getIDGData: jest.fn(),
}));
import { AxiosResponse } from 'axios';
import { E_CONFIGURE_MFA } from 'src/aura/platform/auth/authTypes';
import { E_ALERTS } from 'src/idg/alerts/alertAPI';
import { E_CREDIT_SCORES } from 'src/idg/creditScore/creditScoreAPI';
import { E_DEVICE_REGISTER_V3 } from 'src/suite/suiteClient';
import { E_REFRESH, E_SIGNOUT } from '../../sessionTypes';

import {
  toResponseInfo,
  isEndpoint,
  ResponseInfo,
  isOneOfEndpoints,
  isAuthEndpoint,
  isRefreshExcludedEndpoints,
} from '../util';

describe('IDG specific endpoint validations', () => {
  it('tests for an endpoint', () => {
    const r = mockResponseInfo({ url: E_ALERTS });
    expect(isEndpoint(r, E_CONFIGURE_MFA)).toBe(false);
    expect(isEndpoint(r, E_ALERTS)).toBe(true);
  });

  it('tests for multiple endpoints', () => {
    const r = mockResponseInfo({ url: E_ALERTS });
    expect(isOneOfEndpoints(r, E_CREDIT_SCORES, E_CONFIGURE_MFA, E_ALERTS)).toBe(true);
    expect(isOneOfEndpoints(r, E_CREDIT_SCORES, E_ALERTS)).toBe(true);
    expect(isOneOfEndpoints(r, E_ALERTS)).toBe(true);
    expect(isOneOfEndpoints(r, E_CREDIT_SCORES, E_CONFIGURE_MFA, E_REFRESH)).toBe(false);
  });

  it('tests for an authorization endpoint', () => {
    const good1 = mockResponseInfo({ url: E_REFRESH });
    const good2 = mockResponseInfo({ url: E_CONFIGURE_MFA });
    const bad = mockResponseInfo({ url: 'ftm/items' });
    expect(isAuthEndpoint(good1)).toBe(true);
    expect(isAuthEndpoint(good2)).toBe(true);
    expect(isAuthEndpoint(bad)).toBe(false);
  });

  it('tests for an refresh excluded endpoints', () => {
    const good1 = mockResponseInfo({ url: E_REFRESH });
    const good2 = mockResponseInfo({ url: E_CONFIGURE_MFA });
    const bad1 = mockResponseInfo({ url: E_DEVICE_REGISTER_V3 });
    const bad2 = mockResponseInfo({ url: E_SIGNOUT });
    expect(isRefreshExcludedEndpoints(good1)).toBe(false);
    expect(isRefreshExcludedEndpoints(good2)).toBe(false);
    expect(isRefreshExcludedEndpoints(bad1)).toBe(true);
    expect(isRefreshExcludedEndpoints(bad2)).toBe(true);
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
