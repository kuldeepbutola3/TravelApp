import React from 'react';
import { Button, SafeAreaView, StyleSheet, View } from 'react-native';
import { appColors } from '../../../styles/appColors';
import { useBindAction } from '../../../redux/hooks';
import { appSlice } from '../../../appSlice';

export const LoginScreen = () => {
  const setIsloggedIn = useBindAction(appSlice.actions.setIsLoggedIn);
  const onPress = () => {
    setIsloggedIn(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Button title="loged Innn" onPress={onPress} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: appColors.defaultColor },
  container: { flex: 1, backgroundColor: appColors.defaultColor },
  header: {
    marginHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    backgroundColor: appColors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: { width: 50, height: 63.4 },
});
