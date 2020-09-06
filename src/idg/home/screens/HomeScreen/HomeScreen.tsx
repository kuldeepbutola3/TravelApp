import React, {useEffect} from 'react';

// import {useDispatch} from 'react-redux';
import {AuraStackScreen} from 'src/types/navigationTypes';
import {Screen} from 'src/components/Screen';
// import {useSliceSelector} from 'src/redux/hooks';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationProp} from '@react-navigation/native';
import {useStackOptions} from 'src/navigation/stackOptions';
import {Text} from 'src/components/Text';
import {useSliceSelector, useThunkDispatch} from 'src/redux/hooks';
// import {
//   doFetchRefreshToken,
//   useRefreshToken,
// } from 'src/idg/session/sessionSlice';
import {fetchFlightPlaces} from 'src/idg/flight/flightSlice';
// import {configureClient} from 'src/idg/IDGClient';

const HomeScreen: AuraStackScreen = () => {
  const dispatch = useThunkDispatch();
  // const refreshToken = useRefreshToken();
  // const {session} = useSliceSelector('session');
  const {flightDetail, places} = useSliceSelector('flight');
  console.log('flightDetail', flightDetail);

  useEffect(() => {
    // refreshToken();
    console.log('enter useEffect');
    dispatch(fetchFlightPlaces({term: 'del'}));
  }, [dispatch]);

  return (
    <Screen>
      <Text>home--{places && JSON.stringify(places)}</Text>
    </Screen>
  );
};

export type HomeRoutes = {
  Home: undefined;
};

export type AlertNavigationProp = NavigationProp<HomeRoutes>;

const Stack = createStackNavigator<HomeRoutes>();
export const HomeStack = () => {
  const {screenOptions, homeScreenOptions} = useStackOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions()}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={homeScreenOptions('homeTitle')}
      />
    </Stack.Navigator>
  );
};
