import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
// import { appColors } from '../../../styles/appColors';
import { OnBoardingContainer } from '../component/OnBoardingContainer';
import { useNavigation } from '@react-navigation/native';
// import { OnBoardingProps } from '../OnBoardingNav';
import { OnBoardingNavigationProp } from '../OnBoardingNav';
import { appColors } from '../../../styles/appColors';

export const OnBoarding3 = () => {
  const navigation = useNavigation<OnBoardingNavigationProp>();
  const nextTapped = useCallback(() => {
    navigation.navigate('Login');
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
