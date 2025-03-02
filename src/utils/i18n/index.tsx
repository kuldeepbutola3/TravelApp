import { i18n as i18nType, TOptions } from 'i18next';
import {
  useTranslation as originalUseTranslation,
  UseTranslationOptions,
} from 'react-i18next';
import en from './locales/en';
export type Namespace = string | string[];

// The following few interfaces are recreated from the i18next types, but with
// a custom `t` function to accept only valid `TranslationKeys`. The keys that
// are valid are extraced from the default language, `en` in this case.
export interface AuraTFunction {
  (
    key: TranslationKeys | TranslationKeys[],
    options?: TOptions<any> | string,
  ): string;
}

type UseTranslationResponse = [AuraTFunction, i18nType, boolean] & {
  t: AuraTFunction;
  i18n: i18nType;
  ready: boolean;
};

type UseTranslation = (
  ns?: Namespace,
  options?: UseTranslationOptions<any>,
) => UseTranslationResponse;

export type TranslationKeys = keyof typeof en;
export const useAuraTranslation: UseTranslation = originalUseTranslation;
