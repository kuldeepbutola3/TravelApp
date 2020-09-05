import React from 'react';

// import {useDispatch} from 'react-redux';
import {AuraStackScreen} from 'src/types/navigationTypes';
import {Screen} from 'src/components/Screen';
// import {useSliceSelector} from 'src/redux/hooks';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationProp} from '@react-navigation/native';
import {useStackOptions} from 'src/navigation/stackOptions';
import {Text} from 'src/components/Text';

const HomeScreen: AuraStackScreen = () => {
  return (
    <Screen>
      <Text>home</Text>
    </Screen>
  );
};

export type HomeRoutes = {
  Home: undefined;
};

export type AlertNavigationProp = NavigationProp<HomeRoutes>;

const Stack = createStackNavigator<HomeRoutes>();
export const HomeStack = () => {
  const {screenOptions, titleOption, homeScreenOptions} = useStackOptions();

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
