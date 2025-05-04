// import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { OnBoarding1, OnBoarding1Props } from './screens/OnBoarding1';
import { OnBoarding3 } from './screens/OnBoarding3';
import { OnBoarding2 } from './screens/OnBoarding2';
import type { RouteProp } from '@react-navigation/native';
import { LoginScreen } from './screens/LoginScreen';

type OnBoardingRoutes = {
  OnBoarding1: OnBoarding1Props;
  OnBoarding2: undefined;
  OnBoarding3: undefined;
  Login: undefined;
};

// export type OnBoardingProps = NavigationContainerProp<OnBoardingRoutes>;

const Stack = createNativeStackNavigator<OnBoardingRoutes>();

export const OnBoardingNav = () => {
  const childScreenOptions: NativeStackNavigationOptions = {
    headerShown: false,
  };

  return (
    <Stack.Navigator
      initialRouteName="OnBoarding1"
      screenOptions={childScreenOptions}>
      <Stack.Screen name="OnBoarding1" component={OnBoarding1} />
      <Stack.Screen name="OnBoarding2" component={OnBoarding2} />
      <Stack.Screen name="OnBoarding3" component={OnBoarding3} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export type OnBoardingNavigationProp = NativeStackNavigationProp<
  OnBoardingRoutes,
  keyof OnBoardingRoutes
>;
export type OnBoardingRouteProp = RouteProp<
  OnBoardingRoutes,
  keyof OnBoardingRoutes
>;
