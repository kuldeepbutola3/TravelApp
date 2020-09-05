import React, {useEffect} from 'react';
import {StyleSheet, ViewStyle, View, TextStyle, Platform} from 'react-native';
// import {useDispatch} from 'react-redux';
// import {appSlice} from 'src/appSlice';
import {Text} from 'src/components/Text';
// import DeviceInfo from 'react-native-device-info';
import {useAuraTranslation} from 'src/utils/i18n';
// import {useSliceSelector} from 'src/redux/hooks';

// import {Switch} from 'src/components/Switch';

import {Screen} from '../../../components/Screen';

export const SettingsScreen = () => {
  // const {username} = useSliceSelector('app');
  // const dispatch = useDispatch();
  // const {actions} = appSlice;

  const {t} = useAuraTranslation();

  // const [modalVisible, setModalVisible] = useState(false);
  // const [auth, setAuth] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');
  const textTouchId = Platform.OS === 'ios' ? 'Touch Id' : 'Fingerprint';
  useEffect(() => {}, [t, textTouchId]);

  // const toggleTouchID = useCallback(() => {}, [auth, dispatch, errorMessage]);

  const sectionHeader = (headerTitle: string) => {
    return (
      <>
        <View style={styles.containerSubHeader}>
          <Text>{headerTitle}</Text>
        </View>
      </>
    );
  };

  // const sectionItemWithIcon = (itemTitle: string, comp: Element) => {
  //   return (
  //     <View>
  //       <View style={[styles.navigationButtonContainer]}>{comp}</View>
  //     </View>
  //   );
  // };

  // const accountListItemPress = useCallback(() => Alert.alert('TODO'), []);
  // const dismissLoginModal = useCallback(() => setModalVisible(false), []);
  // const loginSuccess = useCallback((password: string) => {}, [
  //   dispatch,
  //   username,
  // ]);

  return (
    <Screen>
      <Text style={styles.container}>{t('settings')}</Text>

      {sectionHeader(t('appInformation'))}

      {/* {sectionItemWithIcon(
        t('version'),
        <Text>{DeviceInfo.getReadableVersion()}</Text>
      )} */}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  } as ViewStyle,
  containerSubHeader: {
    padding: 16,
  } as ViewStyle,
  paragraph: {
    paddingVertical: 16,
  } as TextStyle,
  navigationButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  } as ViewStyle,
});
