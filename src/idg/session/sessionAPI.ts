import { getClient } from 'src/idg/IDGClient';
import { UserData } from '../user/UserModel';
import { IDGSession } from './SessionModel';

export const E_REFRESH = '/v1/service/oauth2/tokens';
export const E_USER_DATA = '/v1/service/users/user-by-domain';
export type SessionEndpoint = typeof E_USER_DATA | typeof E_REFRESH;
export const getSessionClient = () => getClient<SessionEndpoint>();

export async function refreshToken(): Promise<IDGSession> {
  const dict = {
    role: 'REGISTERED',
    grant_type: 'password',
    username: 'flight@testapi',
    password: 'Flight@12340',
    superAdmin: '16flightapi.besttoursofindia.in',
  };
  const { data } = await getSessionClient().post<IDGSession>(E_REFRESH, dict);
  return data;
}

export async function userData(): Promise<UserData> {
  const dict = {
    agency: 'test.besttoursofindia.in',
    mobileAppFlag: 'Y',
  };
  console.log('dict............', dict);
  const { data } = await getSessionClient().put<UserData>(E_USER_DATA, dict);
  // .catch((error) => {
  //   console.log('wwwwwwwwwww', error);
  // });
  // });
  return data;
}
