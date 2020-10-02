import React, { useCallback, useState } from 'react';

import { AuraStackScreen, useParams } from 'src/types/navigationTypes';
import { Screen } from 'src/components/Screen';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuraTranslation } from 'src/utils/i18n';
import { useNavigation } from '@react-navigation/native';
import { AppRoutes, ApptNavigationProp } from 'src/navigation/RootNav';
import { Header } from 'src/components/Header';
import { FlightSet } from 'src/idg/flight/FlightModel';
import { Input } from 'react-native-elements';
import { Button } from 'src/components/Button';
import { appColors } from 'src/styles/appColors';

export interface LoginScreenProps {
  param: FlightSet;
}

export const LoginScreen: AuraStackScreen = () => {
  const { t } = useAuraTranslation();
  // const dispatch = useThunkDispatch();

  const navigation = useNavigation<ApptNavigationProp>();
  const { param } = useParams<AppRoutes, 'Login'>();
  //   const { flightFare } = useSliceSelector('flight');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onPressBack = useCallback(() => navigation.canGoBack() && navigation.goBack(), [
    navigation,
  ]);
  //   useEffect(() => {}, [param]);
  const loginPress = useCallback(() => navigation.navigate('TravelerDetail', { param }), [
    navigation,
    param,
  ]);
  const continueAsGuest = useCallback(() => navigation.navigate('TravelerDetail', { param }), [
    navigation,
    param,
  ]);

  return (
    <Screen>
      <SafeAreaView style={styles.safeArea}>
        <Header onPressBack={onPressBack} title={t('login')} />
        <KeyboardAvoidingView style={styles.keyBoardView}>
          <Input
            label="Email"
            placeholder="Enter Email"
            defaultValue={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Input
            label="Password"
            placeholder="Enter Password"
            defaultValue={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <Button
            bgColor={appColors.pink}
            containerStyle={styles.buttonContainer}
            title={t('login').toUpperCase()}
            onPress={loginPress}
          />
          <Button
            bgColor={appColors.lightpink}
            title={t('continueAsGuest').toUpperCase()}
            onPress={continueAsGuest}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyBoardView: {
    flex: 1,
    padding: 24,
  },
  buttonContainer: {
    marginBottom: 24,
  },
});
