/**
 * This module exports the data model for the IDG Session
 */

export interface IDGSession {
  tokenId: string;
  expiryDate: string;
}

export interface SessionState {
  session?: IDGSession;
  loading: 'idle' | 'pending';
  error: string | null;
}
