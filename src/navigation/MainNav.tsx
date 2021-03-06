import React, { useCallback } from 'react';

import { SafeAreaView, StyleSheet, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

// eslint wants navigationTypes after components
import {
  useNavigation,
  NavigationProp,
  CompositeNavigationProp,
  // DrawerActions,
  ParamListBase,
} from '@react-navigation/native';
import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import { ApptNavigationProp } from './RootNav';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStack } from 'src/idg/home/screens/HomeScreen';
import { BookingStack } from 'src/idg/booking/screens/BookingScreen';
import { appColors } from 'src/styles/appColors';

/*
 * Drawer stuff
 */

type CustomDrawerProp = CompositeNavigationProp<DrawerNavigationProp<{}>, ApptNavigationProp>;

const DrawerMenu = () => {
  return (
    <SafeAreaView>
      <ScrollView />
    </SafeAreaView>
  );
};

const DrawerToggleButton = () => {
  const navigation = useNavigation<DrawerNavigationProp<{}>>();
  return (
    <Icon
      name="gear"
      type="font-awesome"
      size={30}
      iconStyle={StyleSheet.flatten([styles.iconStyle])}
      onPress={navigation.openDrawer}
    />
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    padding: 8,
  },
  logo: {
    marginHorizontal: 2,
    marginTop: 5,
    marginBottom: 10,
    alignSelf: 'center',
  },
  overlay: { flex: 1, backgroundColor: '#00000080' } as ViewStyle,
});

// https://github.com/react-navigation/react-navigation/issues/6931
type SubNavigator<T extends ParamListBase> = {
  [K in keyof T]: { screen: K; params?: T[K]; initial?: boolean };
}[keyof T];

/**
 * Main Nav is main interface of the app.
 */

export type MainRoutes = {
  Tab: undefined;
};

export type MainNavigationProp = NavigationProp<MainRoutes>;

export type MainTabBarProp = BottomTabBarProps<MainRoutes>;

// const Stack = createStackNavigator<MainRoutes>();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export const homeHeaderOptionsWithDrawer = {
  title: '',
  headerRight: () => <DrawerToggleButton />,
};
export const MainNav = () => {
  const drawerContent = useCallback(() => <DrawerMenu />, []);

  return (
    <Drawer.Navigator drawerContent={drawerContent} drawerPosition="right">
      <Drawer.Screen name="Drawer">
        {() => (
          <Tab.Navigator
            tabBarOptions={{
              activeTintColor: appColors.pink,
              inactiveTintColor: 'gray',
            }}
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName = '';
                if (route.name === 'HomeScreen') {
                  iconName = 'home'; //: 'ios-information-circle-outline';
                } else if (route.name === 'BookingScreen') {
                  iconName = 'briefcase';
                }
                return <Icon name={iconName} type="simple-line-icon" size={size} color={color} />;
              },
            })}
          >
            <Tab.Screen
              options={{ title: 'Home' }}
              name="HomeScreen"
              component={HomeStack}
              // options={homeHeaderOptions}
            />
            <Tab.Screen
              options={{ title: 'My Bookings' }}
              name="BookingScreen"
              component={BookingStack}
              // options={homeHeaderOptions}
            />
          </Tab.Navigator>
          // options={homeHeaderOptions}

          // </Stack.Navigator>
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};
