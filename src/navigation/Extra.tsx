import React, {useCallback} from 'react';
import {ViewStyle, StyleSheet, ScrollView, TextStyle} from 'react-native';
import {AuraStackScreen} from 'src/types/navigationTypes';
import {useNavigation} from '@react-navigation/native';

import {Screen} from 'src/components/Screen';

import {Text} from 'src/components/Text';

import {MainNavigationProp, MainRoutes} from './MainNav';

export const Extra: AuraStackScreen = () => {
  const useNavRoute = (route: keyof MainRoutes) => {
    const navigation = useNavigation<MainNavigationProp>();
    return useCallback(() => navigation.navigate(route), [navigation, route]);
  };

  return (
    <Screen>
      <ScrollView contentInset={{bottom: 30}} style={styles.container}>
        <Text style={styles.title}>Travel App</Text>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {} as ViewStyle,
  title: {
    margin: 20,
  } as TextStyle,
  featureCard: {
    marginHorizontal: 20,
    marginVertical: 15,
  } as ViewStyle,
  tempButton: {
    margin: 10,
  } as ViewStyle,
});
