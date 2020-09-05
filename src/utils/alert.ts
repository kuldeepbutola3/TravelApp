import {Alert, AlertButton} from 'react-native';
import {useAuraTranslation} from './i18n';

export const useTranslatedAlert = () => {
  const {t} = useAuraTranslation();
  type TParams = Parameters<typeof t>;
  type AlertInfo = {
    title?: TParams;
    body?: TParams;
    buttons: AlertButton[];
  };
  const alert = () => {
    const OK: AlertButton = {
      text: t('okButtonTitle'),
      style: 'default',
    };
    const CANCEL: AlertButton = {
      text: t('cancelButtonTitle'),
      style: 'cancel',
    };
    const info: AlertInfo = {
      buttons: [],
    };
    const builder = {
      title: (...params: TParams) => {
        info.title = params;
        return builder;
      },
      body: (...params: TParams) => {
        info.body = params;
        return builder;
      },
      okButton: (callback?: () => void) => {
        info.buttons.push({...OK, onPress: callback});
        return builder;
      },
      cancelButton: (callback?: () => void) => {
        info.buttons.push({...CANCEL, onPress: callback});
        return builder;
      },
      button: (callback?: () => void, ...text: TParams) => {
        info.buttons.push({onPress: callback, text: t(...text)});
        return builder;
      },
      buttonWithStyle: (
        style: AlertButton['style'],
        callback?: () => void,
        ...text: TParams
      ) => {
        info.buttons.push({onPress: callback, style, text: t(...text)});
        return builder;
      },
      show: () => {
        const alertTitle = info.title ? t(...info.title) : '';
        const alertBody = info.body ? t(...info.body) : '';
        if (info.buttons.length === 0) {
          info.buttons = [{...OK}];
        }
        Alert.alert(alertTitle, alertBody, info.buttons);
      },
    };
    return builder;
  };
  return alert;
};
