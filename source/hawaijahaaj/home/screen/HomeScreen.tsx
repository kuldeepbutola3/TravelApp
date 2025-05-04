import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { appColors } from '../../../styles/appColors';

export const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: appColors.defaultColor },
  container: { flex: 1, backgroundColor: 'blue' },
  header: {
    marginHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: { width: 50, height: 63.4 },
});
