import React, { useCallback, useEffect } from 'react';

import { AuraStackScreen } from 'src/types/navigationTypes';
import { Screen } from 'src/components/Screen';
import { useThunkDispatch } from 'src/redux/hooks';
import { StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuraTranslation } from 'src/utils/i18n';
import { useNavigation } from '@react-navigation/native';
import { ApptNavigationProp } from 'src/navigation/RootNav';
import { Header } from 'src/components/Header';

export const ReviewFlightScreen: AuraStackScreen = () => {
  const { t } = useAuraTranslation();
  const dispatch = useThunkDispatch();
  const navigation = useNavigation<ApptNavigationProp>();

  const onPressBack = useCallback(() => navigation.canGoBack() && navigation.goBack(), [
    navigation,
  ]);
  useEffect(() => {}, [dispatch]);

  return (
    <Screen>
      <SafeAreaView style={styles.safeArea}>
        <Header onPressBack={onPressBack} title={t('reviewTitle')} />
      </SafeAreaView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  } as ViewStyle,

  tabContainer: {
    height: 70,
    flexDirection: 'row',
  } as ViewStyle,
  tabInnerContainer: {
    flex: 1,
  } as ViewStyle,
  tabButton: {
    flex: 1,
  },
  tabBarTouch: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
