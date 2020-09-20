import React from 'react';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';

import { MainNav } from './MainNav';
import { navigationRef } from './NavigationService';
import { FlightListScreen } from 'src/idg/flight/screens/FlightListScreen';
import { ReviewFlightScreen } from 'src/idg/flight/screens/ReviewFlightScreen';

type AppRoutes = {
  Main: undefined;
  FlightSearch: undefined;
  ReviewFlight: undefined;
};

export type ApptNavigationProp = NavigationProp<AppRoutes>;

const Stack = createStackNavigator<AppRoutes>();
const AppNav = () => {
  const childScreenOptions: StackNavigationOptions = {
    headerBackTitleVisible: false,
  };

  return (
    <Stack.Navigator initialRouteName="Main" screenOptions={childScreenOptions}>
      <Stack.Screen name="Main" component={MainNav} options={{ headerShown: false }} />
      <Stack.Screen
        name="FlightSearch"
        component={FlightListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ReviewFlight"
        component={ReviewFlightScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export const RootNav = () => {
  return (
    <NavigationContainer
      linking={{
        prefixes: ['TravelApp://'],
      }}
      ref={navigationRef}
    >
      <AppNav />
    </NavigationContainer>
  );
};
