import { useNavigation } from '@react-navigation/native';
import React, { ReactNode, useCallback, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'src/components/Button';
import { Header } from 'src/components/Header';
import { Screen } from 'src/components/Screen';
import { Touchable } from 'src/components/Touchable';
import { FlightSet } from 'src/idg/flight/FlightModel';
import { SelectionState } from 'src/idg/SSR/SsrModel';
import { AppRoutes } from 'src/navigation/RootNav';
import { useSliceSelector, useThunkDispatch } from 'src/redux/hooks';
import { appColors } from 'src/styles/appColors';
import { AuraStackScreen, useParams } from 'src/types/navigationTypes';
import { useAuraTranslation } from 'src/utils/i18n';
import App from '../components/App';
import { PaymentRequest } from '../PaymentRequestModel';
import { doFetchPaymentParam } from '../paymentSlice';
// import { TravellerCount } from '../TravelerModel';

export interface PayUScreenProps {
  data: SelectionState;
  totalPrice: number;
  flight: FlightSet;
  //   numberOfTraveller: TravellerCount;
  //   callBack: (numberOfTraveller: TravellerCount) => void;
}
export const PayUScreenScreen: AuraStackScreen = () => {
  const navigation = useNavigation();
  const { t } = useAuraTranslation();
  const { data, totalPrice, flight } = useParams<AppRoutes, 'Payment'>();

  const { userData } = useSliceSelector('session');
  const { flightFare, flightDetail, bookingInfo, travellerCount } = useSliceSelector('flight');

  //   const [paymentIndex, setPaymentIndex] = useState(-1);
  console.log('userData............', userData, data, flightDetail);

  const onPressBack = useCallback(() => navigation.canGoBack() && navigation.goBack(), [
    navigation,
  ]);

  const param = (index: number): PaymentRequest => {
    const passenger: PaymentRequest['passengers'][0] =
      // [
      {
        //index of pasanger
        paxId: 0,
        ssr: [],
        panrequired: false,
        //check if it is entered
        passportRequired: false,
        title: 'Mr',
        firstName: 'Gaurav',
        lastName: 'Yadav',
        // same as pax id
        passengerNumber: 0,
        docTypeCode: null,
        docNumber: null,
        expirationDate: null,
        // 1: Adult , 2: child , 3 infant
        paxType: 1,
        // 1: Male 2: Female
        gender: 1,
        // YYYY-MM-DDT:00:00:00
        dateOfBirth: '',
        // entered data
        passportNo: '',
        // YYYY-MM-DDT:00:00:00
        passportExpiry: '',
        //passport issue date
        issuedDate: '',
        addressLine1: userData?.address ?? '',
        addressLine2: '',
        totalCost: null,
        balanceDue: null,
        //addlogic to divide by numer of pasanger
        // fare: flightData.flightFare?.results.fareBreakdown
        // Fare: {
        //   BaseFare: 3250,
        //   Tax: 546,
        //   YQTax: 0,
        //   AdditionalTxnFeeOfrd: 0,
        //   AdditionalTxnFeePub: 0,
        //   PGCharge: 0,
        // },
        city: userData?.city ?? '',
        countryCode: userData?.countryCode ?? '',
        countryName: userData?.countryName ?? '',
        nationality: userData?.countryCode ?? '',
        //ennter contact number
        // contactNo,
        // email,
        // adult first pasanger
        // isLeadPax : true,
        fFAirlineCode: null,
        fFNumber: null,
        gSTCompanyAddress: null,
        gSTCompanyContactNumber: null,
        gSTCompanyName: null,
        gSTNumber: null,
        gSTCompanyEmail: null,
        ticket: null,
        SegmentAdditionalInfo: null,
        items: null,
        IsPANRequired: false,
        IsPassportRequired: false,
        PAN: null,

        //main
        seatDynamic: [],
        baggage: [],
        mealDynamic: [],
      };
    const passengers = [passenger];
    // ];
    const responseData: PaymentRequest = {
      agency: userData?.agency ?? '',
      resultIndex: '',
      resultSessionId: flight.resultSessionId,

      // enter by user
      contactNo: bookingInfo?.contactNumber ?? '',
      email: bookingInfo?.email ?? '',

      gSTCompanyAddress: null,
      gSTCompanyContactNumber: null,
      gSTCompanyName: null,
      gSTNumber: null,
      gSTCompanyEmail: null,

      gSTDetailsRequired: false,
      fareMismatch: false,

      passangerCount: travellerCount.adult + travellerCount.children + travellerCount.infant,

      publishedFare: totalPrice,
      offeredFare: totalPrice,

      pf: 0,
      lcc: flight.isLCC,

      dobAirAshiya: flightFare?.results.airlineCode === 'I5',

      pGUserMappingId: userData?.pGUserMappingModelList[index].paymentOption ?? '',
      pGUserId: userData?.pGUserMappingModelList[index].id,

      passengers,
    };
    return responseData;
  };
  // useThunkDispatch(doFetchPaymentParam(param))

  //   const doneTapped = (index: number) => {
  //     return useCallback(() => {
  //       setPaymentIndex(userData.pGUserMappingModelList[index]);
  //     }, [index, setPaymentIndex, userData]);
  //   };

  return (
    <Screen style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Header onPressBack={onPressBack} title={t('payment')} />
        <View style={{ flex: 1, padding: 24 }}>
          {/* <Button bgColor={appColors.pink} title={t('done')} onPress={doneTapped} /> */}
          {/* <ScrollView contentContainerStyle={{ flexGrow: 1 }}> */}
          <App paymentMode={userData} />
          {/* </ScrollView> */}
        </View>
      </SafeAreaView>
    </Screen>
  );
};
interface AddingViewProps {
  newCount: (count: number) => void;
  maxNumber: number;
  count: number;
}
