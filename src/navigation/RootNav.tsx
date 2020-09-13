import React from 'react';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';

// import {useIsLoggedIn} from 'src/idg/session/sessionSlice';
// import {SettingsScreen} from '../idg/settings/screens/SettingsScreen';
// import {MyAccountScreen} from '../idg/account/screens/MyAccountScreen';
// import {AccountDetailsScreen} from '../idg/account/screens/AccountDetailsScreen';

import { MainNav } from './MainNav';
import { navigationRef } from './NavigationService';
import { FlightListScreen } from 'src/idg/flight/screens/FlightListScreen';

type AppRoutes = {
  Main: undefined;
  FlightSearch: undefined;
  // Settings: undefined;
  // MyAccount: undefined;
  // AccountDetail: undefined;
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
      {/* <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="MyAccount" component={MyAccountScreen} />
      <Stack.Screen name="AccountDetail" component={AccountDetailsScreen} /> */}
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
