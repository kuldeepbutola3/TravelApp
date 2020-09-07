import { Linking } from 'react-native';

export const openUrl = (urlString: string) => {
  Linking.openURL(urlString);
};
