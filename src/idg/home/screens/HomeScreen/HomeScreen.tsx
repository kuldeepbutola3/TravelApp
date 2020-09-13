import React, { useCallback, useEffect } from 'react';

import { AuraStackScreen } from 'src/types/navigationTypes';
import { Screen } from 'src/components/Screen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useStackOptions } from 'src/navigation/stackOptions';
import { Text } from 'src/components/Text';
import { useSliceSelector, useThunkDispatch } from 'src/redux/hooks';
import { fetchFlightPlaces } from 'src/idg/flight/flightSlice';

import { Button } from 'react-native-elements';
import { ScrollView } from 'react-native';
import { ApptNavigationProp } from 'src/navigation/RootNav';

const HomeScreen: AuraStackScreen = () => {
  const navigation = useNavigation<ApptNavigationProp>();
  const dispatch = useThunkDispatch();

  const { places } = useSliceSelector('flight');

  const searchTapped = useCallback(() => navigation.navigate('FlightSearch'), [navigation]);

  useEffect(() => {
    dispatch(fetchFlightPlaces({ term: 'del' }));
  }, [dispatch]);

  return (
    <Screen>
      <ScrollView>
        <Text>home--{places && JSON.stringify(places)}</Text>
        <Button title={'Search Flight'} onPress={searchTapped} />
      </ScrollView>
    </Screen>
  );
};

export type HomeRoutes = {
  Home: undefined;
};

export type HomeNavigationProp = NavigationProp<HomeRoutes>;

const Stack = createStackNavigator<HomeRoutes>();
export const HomeStack = () => {
  const { screenOptions, homeScreenOptions } = useStackOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions()}>
      <Stack.Screen name="Home" component={HomeScreen} options={homeScreenOptions('homeTitle')} />
      {/* <Stack.Screen
        name="FlightList"
        component={FlightListScreen}
        options={titleOption('searchListTitle')}
      /> */}
    </Stack.Navigator>
  );
};
