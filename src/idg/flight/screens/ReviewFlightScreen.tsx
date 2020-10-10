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
import { ReviewList } from '../component/ReviewList';
import { Text } from 'src/components/Text';
import { Button } from 'src/components/Button';

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

  const fare = `${param.fare.currency === 'INR' ? '₹ ' : ''}${param.fare.publishedFare}`;

  return (
    <Screen>
      <SafeAreaView style={styles.safeArea}>
        <Header onPressBack={onPressBack} title={t('reviewTitle')} />
        <View style={styles.bodyContainer}>
          <ReviewList items={param} />
        </View>
        <View style={styles.bottonContainer}>
          <Text style={styles.textFare}>{fare}</Text>
          <Button
            bgColor={appColors.pink}
            title={t('continue')}
            onPress={onPressContinue}
            buttonStyle={{ paddingHorizontal: 20 }}
          />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: appColors.black,
  },
  textFare: {
    color: 'white',
    fontSize: 20,
  },
});
