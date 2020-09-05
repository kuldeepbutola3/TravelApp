import {getClient} from 'src/idg/IDGClient';
import {IDGSession} from './SessionModel';

export const E_LOGIN = '/api/client/sessions/login';
export const E_PROFILES = 'api/client/users/';
export const E_REFRESH = '/api/client/sessions/refresh';
export type SessionEndpoint =
  | typeof E_LOGIN
  | typeof E_PROFILES
  | typeof E_REFRESH;
export const getSessionClient = () => getClient<SessionEndpoint>();

export interface LoginParams {
  username: string;
  password: string;
}
export type AuthenticationResponse = {
  accessToken: string;
  refreshToken: string;
};
export type ProfileResponse = IDGSession['profile'];

export function login({
  username,
  password,
}: LoginParams): Promise<AuthenticationResponse> {
  return getSessionClient()
    .post<AuthenticationResponse>(E_LOGIN, {username, password})
    .then(({data}) => data);
}

export function fetchProfile(userId: string): Promise<ProfileResponse> {
  return getClient()
    .get<ProfileResponse>(`${E_PROFILES}${userId}`)
    .then(({data}) => data);
}

export async function refresh(refreshToken: string): Promise<void> {
  await getSessionClient()
    // eslint-disable-next-line @typescript-eslint/camelcase
    .post<AuthenticationResponse>(E_REFRESH, {refresh_token: refreshToken})
    .then(({data}) => data);
}
