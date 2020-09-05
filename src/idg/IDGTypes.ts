// Declarations for types global to the IDG data model
// It is important to note that we should put absolutely no runtime code in this file.
// This is a very declarative and definitive module.

import {SessionEndpoint} from './session/sessionAPI';
import {AlertEndpoint} from './home/homeAPI';

export type IDGDateTimeString = string;

export interface IDGName {
  first: string;
  middle: string;
  last: string;
  suffix?: string;
}

export type IDGEndpoint = SessionEndpoint | AlertEndpoint;
