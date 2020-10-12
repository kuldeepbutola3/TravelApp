import React, { useCallback } from 'react';

import { AuraStackScreen, useParams } from 'src/types/navigationTypes';
import { Screen } from 'src/components/Screen';
import { ScrollView, StyleSheet, Text, TextStyle, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuraTranslation } from 'src/utils/i18n';
import { useNavigation } from '@react-navigation/native';
import { AppRoutes, ApptNavigationProp } from 'src/navigation/RootNav';
import { Header } from 'src/components/Header';
import { FlightSet } from 'src/idg/flight/FlightModel';
import { TravellerView } from '../components/TravellerView';
import { appColors } from 'src/styles/appColors';
import { Button } from 'src/components/Button';

export interface TravellerDetailProps {
  param: FlightSet;
}

export const TravellerDetail: AuraStackScreen = () => {
  const { t } = useAuraTranslation();
  // const dispatch = useThunkDispatch();
  const navigation = useNavigation<ApptNavigationProp>();
  const { param } = useParams<AppRoutes, 'Login'>();

  const onPressBack = useCallback(() => navigation.canGoBack() && navigation.goBack(), [
    navigation,
  ]);

  const onPressContinue = useCallback(() => navigation.navigate('SSN', { param }), [
    navigation,
    param,
  ]);

  return (
    <Screen>
      <SafeAreaView style={styles.safeArea}>
        <Header onPressBack={onPressBack} title={t('travellerDetails')} />
        <ScrollView contentContainerStyle={styles.bodyContainer}>
          <Text style={styles.addTraveler}>{t('addTravellers')}</Text>
          <TravellerView isChild={false} />
          <TravellerView isChild={true} />
        </ScrollView>
        <View style={styles.bottonContainer}>
          <Button bgColor={appColors.pink} title={t('continue')} onPress={onPressContinue} />
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
    flexGrow: 1,
    padding: 24,
  },
  bottonContainer: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: appColors.black,
  },

  addTraveler: {
    fontSize: 15,
    marginBottom: 24,
  } as TextStyle,
});
