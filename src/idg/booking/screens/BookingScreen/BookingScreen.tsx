import React from 'react';

// import {useDispatch} from 'react-redux';
import { AuraStackScreen } from 'src/types/navigationTypes';
import { Screen } from 'src/components/Screen';
// import {useSliceSelector} from 'src/redux/hooks';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationProp } from '@react-navigation/native';
import { useStackOptions } from 'src/navigation/stackOptions';
import { Text } from 'src/components/Text';

const BookingScreen: AuraStackScreen = () => {
  return (
    <Screen>
      <Text>booking</Text>
    </Screen>
  );
};

export type BookingRoutes = {
  Booking: undefined;
};

export type AlertNavigationProp = NavigationProp<BookingRoutes>;

const Stack = createStackNavigator<BookingRoutes>();
export const BookingStack = () => {
  const { screenOptions, homeScreenOptions } = useStackOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions()}>
      <Stack.Screen
        name="Booking"
        component={BookingScreen}
        options={homeScreenOptions('bookingtitle')}
      />
    </Stack.Navigator>
  );
};
