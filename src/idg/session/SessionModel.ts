import { IDGName } from '../IDGTypes';

/**
 * This module exports the data model for the IDG Session
 */

export type Token = {
  value: string;
  expiration: number | null;
};

export type Tokens = {
  refreshToken: Token;
  accessToken: Token;
};

export interface IDGSession {
  tokens: Tokens;
  profile?: {
    id: string;
    locale: string;
    name: IDGName;
    address: IDGSessionAddress;
    emailAddress: string;
    phoneNumber: string;
    birthdate: string;
    verification?: {
      eidVerified: boolean;
    };
  };
}
export interface IDGSessionAddress {
  id: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}
export interface SessionState {
  session: IDGSession;
  loading: 'idle' | 'pending';
  error: string | null;
}
