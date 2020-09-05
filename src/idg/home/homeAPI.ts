import {getClient} from '../IDGClient';

export const E_HOME = '';

export type AlertEndpoint = typeof E_HOME;

export type DispositonActionParams = {
  param: string;
};

export async function hitapi(params: DispositonActionParams): Promise<any> {
  const {data} = await getClient().put<any>(`${E_HOME}`, params);
  return data;
}
