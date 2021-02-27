import { getClient } from '../IDGClient';
import { PaymentReponse } from './PaymentReponseModel';
import { PaymentRequest } from './PaymentRequestModel';

export const E_PAYMENT = '/v1/service/payment-gateway/payu';

export type PaymentEndpoint = typeof E_PAYMENT;
export const getSessionClient = () => getClient<PaymentEndpoint>();

export async function paymentRequest(params: PaymentRequest): Promise<PaymentReponse> {
  const { data } = await getSessionClient().post<PaymentReponse>(E_PAYMENT, params);
  return data;
}
