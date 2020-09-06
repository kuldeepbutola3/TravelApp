import {getClient} from 'src/idg/IDGClient';
import {IDGSession} from './SessionModel';

// export const E_LOGIN = '/api/client/sessions/login';
// export const E_PROFILES = 'api/client/users/';
export const E_REFRESH = '/v1/service/oauth2/tokens';
export type SessionEndpoint =
  // | typeof E_LOGIN
  // | typeof E_PROFILES
  typeof E_REFRESH;
export const getSessionClient = () => getClient<SessionEndpoint>();

// export interface LoginParams {
//   username: string;
//   password: string;
// }
// export type AuthenticationResponse = {
//   accessToken: string;
//   refreshToken: string;
// };

// export function login({
//   username,
//   password,
// }: LoginParams): Promise<AuthenticationResponse> {
//   return getSessionClient()
//     .post<AuthenticationResponse>(E_LOGIN, {username, password})
//     .then(({data}) => data);
// }

// export function fetchProfile(userId: string): Promise<ProfileResponse> {
//   return getClient()
//     .get<ProfileResponse>(`${E_PROFILES}${userId}`)
//     .then(({data}) => data);
// }

export async function refreshToken(): Promise<IDGSession> {
  const dict = {
    role: 'REGISTERED',
    grant_type: 'password',
    username: 'flight@testapi',
    password: 'Flight@12340',
    superAdmin: '16flightapi.besttoursofindia.in',
  };
  const {data} = await getSessionClient().post<IDGSession>(E_REFRESH, dict);
  return data;
}
