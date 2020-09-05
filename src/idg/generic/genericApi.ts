import {getClient} from '../IDGClient';

export const E_PLANS = '/api/client/plans';
export const E_DASHBOARD_SUMMARY = '/api/client/dashboard/summary';

export async function getPlans(): Promise<any> {
  const {data} = await getClient().get<any>(E_PLANS);
  return data;
}
