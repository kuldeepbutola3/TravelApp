import React, { useCallback } from 'react';

import { AuraStackScreen, useParams } from 'src/types/navigationTypes';
import { Screen } from 'src/components/Screen';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuraTranslation } from 'src/utils/i18n';
import { useNavigation } from '@react-navigation/native';
import { AppRoutes, ApptNavigationProp } from 'src/navigation/RootNav';
import { Header } from 'src/components/Header';
import { FlightSet } from '../FlightModel';
import { appColors } from 'src/styles/appColors';
import { Button } from 'react-native-elements';
import { ReviewList } from '../component/ReviewList';

export interface ReviewFlightScreenProps {
  param: FlightSet;
}

export const ReviewFlightScreen: AuraStackScreen = () => {
  const { t } = useAuraTranslation();
  const navigation = useNavigation<ApptNavigationProp>();
  const { param } = useParams<AppRoutes, 'ReviewFlight'>();

  const onPressBack = useCallback(() => navigation.canGoBack() && navigation.goBack(), [
    navigation,
  ]);
  const onPressContinue = useCallback(() => navigation.navigate('Login', { param }), [
    navigation,
    param,
  ]);

  return (
    <Screen>
      <SafeAreaView style={styles.safeArea}>
        <Header onPressBack={onPressBack} title={t('reviewTitle')} />
        <View style={styles.bodyContainer}>
          <ReviewList items={param} />
        </View>
        <View style={styles.bottonContainer}>
          <Button title={t('continue')} onPress={onPressContinue} />
        </View>
      </SafeAreaView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  bodyContainer: {
    flex: 1,
  } as ViewStyle,
  bottonContainer: {
    padding: 30,
    backgroundColor: appColors.black,
  },
});
