import React, { useCallback, useState } from 'react';

import { AuraStackScreen, useParams } from 'src/types/navigationTypes';
import { Screen } from 'src/components/Screen';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuraTranslation } from 'src/utils/i18n';
import { useNavigation } from '@react-navigation/native';
import { AppRoutes, ApptNavigationProp } from 'src/navigation/RootNav';
import { Header } from 'src/components/Header';
import { FlightSet } from 'src/idg/flight/FlightModel';
import { TravellerView } from '../components/TravellerView';
import { appColors } from 'src/styles/appColors';
import { Button } from 'src/components/Button';
import { Input } from 'react-native-elements';

export interface TravellerDetailProps {
  param: FlightSet;
}

export const TravellerDetail: AuraStackScreen = () => {
  const { t } = useAuraTranslation();
  // const dispatch = useThunkDispatch();
  const navigation = useNavigation<ApptNavigationProp>();
  const { param } = useParams<AppRoutes, 'Login'>();

  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');

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
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          {...(Platform.OS === 'ios' && { behavior: 'padding' })}
        >
          <ScrollView contentContainerStyle={styles.bodyContainer}>
            <Text style={styles.addTraveler}>{t('addTravellers')}</Text>
            <TravellerView isChild={false} />
            <TravellerView isChild={true} />
            <Input
              label="Email"
              placeholder="Enter email"
              defaultValue={email}
              onChangeText={setEmail}
            />
            <Input
              label="Mobile number"
              placeholder="Enter mobile number"
              defaultValue={number}
              onChangeText={setNumber}
            />
          </ScrollView>
          <View style={styles.bottonContainer}>
            <Button bgColor={appColors.pink} title={t('continue')} onPress={onPressContinue} />
          </View>
        </KeyboardAvoidingView>
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
