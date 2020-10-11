import React, { useCallback, useState } from 'react';

import { AuraStackScreen, useParams } from 'src/types/navigationTypes';
import { Screen } from 'src/components/Screen';
import { useBindAction } from 'src/redux/hooks';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuraTranslation } from 'src/utils/i18n';
import { useNavigation } from '@react-navigation/native';
import { AppRoutes, ApptNavigationProp } from 'src/navigation/RootNav';
import { Header } from 'src/components/Header';
import { flightSlice } from 'src/idg/flight/flightSlice';
import { ButtonGroup, Input } from 'react-native-elements';
import { appColors } from 'src/styles/appColors';
import { Gender } from '../TravelerModel';
import { Button } from 'src/components/Button';

export interface AddTravellerProps {
  isChild: boolean;
}

export const AddTraveller: AuraStackScreen = () => {
  const { t } = useAuraTranslation();

  const addTravelerInfo = useBindAction(flightSlice.actions.addTravelerInfo);
  const navigation = useNavigation<ApptNavigationProp>();
  const { isChild } = useParams<AppRoutes, 'AddTraveller'>();

  const [gender, setGender] = useState('male' as Gender);
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [dob, setDob] = useState('');
  const [nationality, setNationality] = useState('');
  const [passportNo, setPassportNo] = useState('');
  const [expDate, setExpDate] = useState('');

  const onPressBack = useCallback(() => navigation.canGoBack() && navigation.goBack(), [
    navigation,
  ]);
  const onPressContinue = useCallback(() => {
    addTravelerInfo({
      isChild,
      fName,
      lName,
      dob,
      nationality,
      passportNo,
      expDate,
      gender,
    });
    onPressBack();
  }, [
    isChild,
    fName,
    lName,
    dob,
    nationality,
    passportNo,
    expDate,
    gender,
    addTravelerInfo,
    onPressBack,
  ]);

  const buttons = ['Male', 'Female'];

  const buttonGroupTapped = useCallback((index: number) => {
    setGender(index === 0 ? 'male' : 'female');
  }, []);

  return (
    <Screen>
      <SafeAreaView style={styles.safeArea}>
        <Header onPressBack={onPressBack} title={t('travellerDetails')} />
        <View style={styles.bodyContainer}>
          <KeyboardAvoidingView style={styles.keyBoardView}>
            <ButtonGroup
              onPress={buttonGroupTapped}
              selectedIndex={gender === 'male' ? 0 : 1}
              buttons={buttons}
              selectedButtonStyle={{ backgroundColor: appColors.pink }}
            />
            <Input
              placeholder="First Name & Middle Name"
              defaultValue={fName}
              onChangeText={setFName}
            />
            <Input placeholder="Last Name" defaultValue={lName} onChangeText={setLName} />
            <Input placeholder="Date of birth" defaultValue={dob} onChangeText={setDob} />
            <Input
              placeholder="Nationality"
              defaultValue={nationality}
              onChangeText={setNationality}
            />
            <Input
              placeholder="Passport number"
              defaultValue={passportNo}
              onChangeText={setPassportNo}
            />
            <Input placeholder="Exp. Date" defaultValue={expDate} onChangeText={setExpDate} />
          </KeyboardAvoidingView>
        </View>
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
    flex: 1,
  },
  bottonContainer: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: appColors.black,
  },
  keyBoardView: {
    flex: 1,
    padding: 24,
  },
});
