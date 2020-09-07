import i18n, { Resource, LanguageDetectorModule, ResourceLanguage } from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import en from '../locales/en';
import fr from '../locales/fr';

const lang = (translations: ResourceLanguage) => ({
  translation: translations,
});

const resources: Resource = {
  en: lang(en),
  fr: lang(fr),
};

const nativeLanguageCode = () => {
  const languageInfo = RNLocalize.findBestAvailableLanguage(Object.keys(resources));
  return (languageInfo && languageInfo.languageTag) || 'en';
};

const languageDetector: LanguageDetectorModule = {
  type: 'languageDetector',
  detect: nativeLanguageCode,
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(languageDetector)
  .init({
    resources,
    keySeparator: false,
  });

export default i18n;
