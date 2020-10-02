import React, { useCallback, useEffect } from 'react';

import { AuraStackScreen, useParams } from 'src/types/navigationTypes';
import { Screen } from 'src/components/Screen';
import { useSliceSelector, useThunkDispatch } from 'src/redux/hooks';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuraTranslation } from 'src/utils/i18n';
import { useNavigation } from '@react-navigation/native';
import { AppRoutes, ApptNavigationProp } from 'src/navigation/RootNav';
import { Header } from 'src/components/Header';
import { FlightSet } from '../FlightModel';
import { appColors } from 'src/styles/appColors';
import { Button } from 'react-native-elements';

export interface ReviewFlightScreenProps {
  param: FlightSet;
}

export const ReviewFlightScreen: AuraStackScreen = () => {
  const { t } = useAuraTranslation();
  const dispatch = useThunkDispatch();
  const navigation = useNavigation<ApptNavigationProp>();
  const { param } = useParams<AppRoutes, 'ReviewFlight'>();
  const { flightFare } = useSliceSelector('flight');

  console.log('flightFare.......', JSON.stringify(flightFare?.results.isLCC));
  const onPressBack = useCallback(() => navigation.canGoBack() && navigation.goBack(), [
    navigation,
  ]);
  const onPressContinue = useCallback(() => navigation.navigate('Login', { param }), [
    navigation,
    param,
  ]);
  useEffect(() => {
    // if (param.resultSessionId) {
    //   console.log('api.......');
    //   dispatch(fetchFlightFare({ resultSessionId: [param.resultSessionId] }));
    // }
  }, [dispatch, param]);

  return (
    <Screen>
      <SafeAreaView style={styles.safeArea}>
        <Header onPressBack={onPressBack} title={t('reviewTitle')} />
        <View style={styles.bodyContainer}>
          <Text>{flightFare?.results.resultSessionId}</Text>
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
