import React, { useCallback, useEffect } from 'react';

import { AuraStackScreen, useParams } from 'src/types/navigationTypes';
import { Screen } from 'src/components/Screen';
import { useSliceSelector, useThunkDispatch } from 'src/redux/hooks';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuraTranslation } from 'src/utils/i18n';
import { useNavigation } from '@react-navigation/native';
import { AppRoutes, ApptNavigationProp } from 'src/navigation/RootNav';
import { Header } from 'src/components/Header';
import { FlightSet } from 'src/idg/flight/FlightModel';
import { fetchFlightFare } from 'src/idg/flight/flightSlice';

export interface SSNScreenProps {
  param: FlightSet;
}

export const SSNScreen: AuraStackScreen = () => {
  const { t } = useAuraTranslation();
  const dispatch = useThunkDispatch();
  const navigation = useNavigation<ApptNavigationProp>();
  const { param } = useParams<AppRoutes, 'ReviewFlight'>();
  const { flightFare } = useSliceSelector('flight');

  console.log('flightFare.......ss', JSON.stringify(flightFare));
  const onPressBack = useCallback(() => navigation.canGoBack() && navigation.goBack(), [
    navigation,
  ]);

  useEffect(() => {
    if (param.resultSessionId) {
      console.log('api.......');
      dispatch(fetchFlightFare({ resultSessionId: [param.resultSessionId] }));
    }
  }, [dispatch, param]);

  return (
    <Screen>
      <SafeAreaView style={styles.safeArea}>
        <Header onPressBack={onPressBack} title={t('ssrAdon')} />
        <Text>{flightFare?.results?.resultSessionId}</Text>
      </SafeAreaView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
