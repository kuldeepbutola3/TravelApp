import React, { ReactNode, useCallback } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
// import { appColors } from '../../../styles/appColors';
import { imageOnBoard } from '../assets/image';
// import { Button } from '../../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { OnBoardingNavigationProp } from '../OnBoardingNav';
import { appColors } from '../../../styles/appColors';
// import { OnBoardingProps } from '../OnBoardingNav';

export const OnBoardingContainer: React.FC<{
  children: ReactNode;
  nextTapped: () => void;
}> = ({ children, nextTapped }) => {
  const navigation = useNavigation<OnBoardingNavigationProp>();

  const skipTapped = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.logoContainer}>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={imageOnBoard.logo} />
            </View>
            <Button
              title="Skip"
              // bgColor={appColors.transparent}
              onPress={skipTapped}
            />
          </View>
          {children}
        </View>
        <View style={styles.middleContainer}>
          <Text style={styles.middleContaineTitle}>Welcome!!!</Text>
        </View>
        <Button
          onPress={nextTapped}
          // containerStyle={styles.buttonNext}
          title="Next"
          // bgColor={appColors.buttonGreen}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: appColors.defaultColor },
  container: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 60,
    marginHorizontal: 24,
  },
  topContainer: { flex: 1 },
  logoContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    backgroundColor: appColors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: { width: 50, height: 63.4 },
  middleContainer: {
    height: 220,
    borderRadius: 24,
    opacity: 0.5,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: -24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleContaineTitle: { color: appColors.white, fontSize: 22 },
  buttonNext: { marginHorizontal: 34 },
});
