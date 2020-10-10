import React from 'react';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';

import { MainNav } from './MainNav';
import { navigationRef } from './NavigationService';
import { FlightListScreen, FlightListScreenProps } from 'src/idg/flight/screens/FlightListScreen';
import {
  ReviewFlightScreen,
  ReviewFlightScreenProps,
} from 'src/idg/flight/screens/ReviewFlightScreen';
import { LoginScreen, LoginScreenProps } from 'src/idg/login/screens/LoginScreen';
import {
  TravellerDetail,
  TravellerDetailProps,
} from 'src/idg/traveller/screens/TravellerDetailScreen';
import { SSNScreen, SSNScreenProps } from 'src/idg/SSN/screen/SSNScreen';
import { AddTraveller, AddTravellerProps } from 'src/idg/traveller/screens/AddTraveller';
import {
  FlightFilterScreen,
  FlightFilterScreenProps,
} from 'src/idg/flight/screens/FlightFilterScreen';

export type AppRoutes = {
  Main: undefined;
  FlightSearch: FlightListScreenProps;
  FlightFilter: FlightFilterScreenProps;
  ReviewFlight: ReviewFlightScreenProps;
  Login: LoginScreenProps;
  TravelerDetail: TravellerDetailProps;
  AddTraveller: AddTravellerProps;
  SSN: SSNScreenProps;
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
        name="FlightFilter"
        component={FlightFilterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ReviewFlight"
        component={ReviewFlightScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="TravelerDetail"
        component={TravellerDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="AddTraveller" component={AddTraveller} options={{ headerShown: false }} />
      <Stack.Screen name="SSN" component={SSNScreen} options={{ headerShown: false }} />
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
