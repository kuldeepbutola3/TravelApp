import { useNavigation } from '@react-navigation/native';
import React, { ReactNode, useCallback, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'src/components/Button';
import { Header } from 'src/components/Header';
import { Screen } from 'src/components/Screen';
import { Touchable } from 'src/components/Touchable';
import { AppRoutes } from 'src/navigation/RootNav';
import { useSliceSelector } from 'src/redux/hooks';
import { appColors } from 'src/styles/appColors';
import { AuraStackScreen, useParams } from 'src/types/navigationTypes';
import { useAuraTranslation } from 'src/utils/i18n';
import App from '../components/App';
// import { TravellerCount } from '../TravelerModel';

export interface PayUScreenProps {
  //   numberOfTraveller: TravellerCount;
  //   callBack: (numberOfTraveller: TravellerCount) => void;
}
export const PayUScreenScreen: AuraStackScreen = () => {
  const navigation = useNavigation();
  const { t } = useAuraTranslation();
  const {} = useParams<AppRoutes, 'Payment'>();

  const { userData } = useSliceSelector('session');
  //   const [paymentIndex, setPaymentIndex] = useState(-1);
  //   console.log('userData......', JSON.stringify(userData));

  const onPressBack = useCallback(() => navigation.canGoBack() && navigation.goBack(), [
    navigation,
  ]);

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
