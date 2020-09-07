import { Platform, Linking, Alert } from 'react-native';

export const callUs = (callingNumber: string) => {
  const phoneNumber =
    Platform.OS === 'android' ? `tel:${callingNumber}` : `telprompt:${callingNumber}`;

  Linking.canOpenURL(phoneNumber)
    .then((supported) => {
      if (supported) {
        Linking.openURL(phoneNumber);
      } else {
        Alert.alert('error');
      }
    })
    .catch(() => Alert.alert('error'));
};
