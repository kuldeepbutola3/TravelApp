import React, { useCallback, useState } from 'react';

import { AuraStackScreen, useParams } from 'src/types/navigationTypes';
import { Screen } from 'src/components/Screen';
import { useBindAction } from 'src/redux/hooks';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
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
import { ScrollView } from 'react-native-gesture-handler';
import { DatePicker } from 'src/components/DatePicker';
import { formatDate } from 'src/utils/date-formatter';

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
  const [dob, setDob] = useState(undefined as Date | undefined);
  const [nationality, setNationality] = useState('');
  const [passportNo, setPassportNo] = useState('');
  const [expDate, setExpDate] = useState(undefined as Date | undefined);

  const onPressBack = useCallback(() => navigation.canGoBack() && navigation.goBack(), [
    navigation,
  ]);
  const onPressContinue = useCallback(() => {
    addTravelerInfo({
      isChild,
      fName,
      lName,
      dob: dob ? formatDate(dob, 'dd MMM YYYY') : '',
      nationality,
      passportNo,
      expDate: expDate ? formatDate(expDate, 'dd MMM YYYY') : '',
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

  const disabled = !!fName.length; //&& !!dob && !!expDate && !!nationality.length && !!passportNo.length;

  return (
    <Screen>
      <SafeAreaView style={styles.safeArea}>
        <Header onPressBack={onPressBack} title={t('travellerDetails')} />
        <View style={styles.bodyContainer}>
          <KeyboardAvoidingView style={styles.keyBoardView}>
            <ScrollView>
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

              {/* <Input
                  placeholder="Date of birth"
                  defaultValue={dob ? formatDate(dob, 'dd MMM YYYY') : ''}
                  disabled={true}
                /> */}
              {/* <DateSelector
                  disabled={false}
                  label="DEPARTURE"
                  date={formatDate(departureDate, 'DD MMM YYYY')}
                  day={formatDate(departureDate, 'dddd')}
                  // onPress={showDatePicker}
                  containerStyles={{ ...styles.dateSelector, ...{ width: '100%' } }}
                /> */}
              <View>
                <Input
                  placeholder="Date of birth"
                  defaultValue={dob ? formatDate(dob, 'DD MMM YYYY') : ''}
                  disabled={true}
                  containerStyle={{ position: 'absolute', left: 0, top: 0 }}
                  clearTextOnFocus
                />
                <DatePicker
                  // containerStyle={{ flex: 1, backgroundColor: 'green' }}
                  textColor={appColors.black}
                  onValueChange={setDob}
                  value={dob ?? new Date()}
                  mode="date"
                  maximumDate={new Date()}
                >
                  <View style={{ flex: 1, width: '100%', height: 60 }} />
                </DatePicker>
              </View>

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
              <View>
                <Input
                  placeholder="Exp. Date"
                  defaultValue={expDate ? formatDate(expDate, 'DD MMM YYYY') : ''}
                  disabled={true}
                  containerStyle={{ position: 'absolute', left: 0, top: 0 }}
                  clearTextOnFocus
                />
                <DatePicker
                  // containerStyle={{ flex: 1, backgroundColor: 'green' }}
                  textColor={appColors.black}
                  onValueChange={setExpDate}
                  value={expDate ?? new Date()}
                  mode="date"
                  // maximumDate={new Date()}
                >
                  <View style={{ flex: 1, width: '100%', height: 60 }} />
                </DatePicker>
              </View>

              {/* <Input placeholder="Exp. Date" defaultValue={expDate} onChangeText={setExpDate} /> */}
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
        <View style={styles.bottonContainer}>
          <Button
            bgColor={appColors.pink}
            title={t('continue')}
            onPress={onPressContinue}
            disabled={!disabled}
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
