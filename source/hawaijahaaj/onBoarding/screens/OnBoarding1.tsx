import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
// import { appColors } from '../../../styles/appColors';
import { OnBoardingContainer } from '../component/OnBoardingContainer';
import { useNavigation } from '@react-navigation/native';
import { OnBoardingNavigationProp } from '../OnBoardingNav';
import { appColors } from '../../../styles/appColors';

export type OnBoarding1Props = {
  // username: string;
};

export const OnBoarding1 = () => {
  // const route = useRoute<OnBoardingRouteProp>();
  // route.params.username
  // route.params.route.params.username

  const navigation = useNavigation<OnBoardingNavigationProp>();
  const nextTapped = useCallback(() => {
    navigation.navigate('OnBoarding2');
  }, [navigation]);

  return (
    <OnBoardingContainer nextTapped={nextTapped}>
      <View style={styles.container}></View>
    </OnBoardingContainer>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: appColors.black },
});
