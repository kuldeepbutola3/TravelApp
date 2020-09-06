import React, {useCallback} from 'react';

// Components
// import {useAuraTranslation} from 'src/utils/i18n';
// import {AlertStack, AlertsRoutes} from 'src/idg/home/screens/HomeScreen';
// import {DrawerNavItem} from 'src/idg/DrawerNavItem/DrawerNavItem';
import {SafeAreaView, StyleSheet, ViewStyle} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

// eslint wants navigationTypes after components
import {
  useNavigation,
  NavigationProp,
  CompositeNavigationProp,
  // DrawerActions,
  ParamListBase,
} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import {Icon} from 'react-native-elements';
import {ApptNavigationProp} from './RootNav';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {HomeStack} from 'src/idg/home/screens/HomeScreen';
import {BookingStack} from 'src/idg/booking/screens/BookingScreen';

/*
 * Drawer stuff
 */

type CustomDrawerProp = CompositeNavigationProp<
  DrawerNavigationProp<{}>,
  ApptNavigationProp
>;

const DrawerMenu = () => {
  // const navigation = useNavigation<CustomDrawerProp>();
  // const {t} = useAuraTranslation();

  // const logoutClick = (): void => {};

  // const settingsClicked = (): void => {
  //   navigation.dispatch(DrawerActions.closeDrawer());
  //   // TODO: deal with this timeout hack
  //   setTimeout(function () {}, 100);
  // };
  // const supportClicked = (): void => {
  //   Alert.alert('Yet to be implemented');
  // };
  // const myAccountClicked = (): void => {
  //   navigation.dispatch(DrawerActions.closeDrawer());
  //   setTimeout(function () {}, 100);
  // };

  return (
    <SafeAreaView>
      <ScrollView />
    </SafeAreaView>
  );
};
// const j;

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
  overlay: {flex: 1, backgroundColor: '#00000080'} as ViewStyle,
});

// https://github.com/react-navigation/react-navigation/issues/6931
type SubNavigator<T extends ParamListBase> = {
  [K in keyof T]: {screen: K; params?: T[K]; initial?: boolean};
}[keyof T];

/**
 * Main Nav is main interface of the app.
 */

export type MainRoutes = {
  Tab: undefined;
  // Alerts: SubNavigator<AlertsRoutes> | undefined;
  // Watchlist: SubNavigator<WatchlistRoutes> | undefined;
  // Credit: SubNavigator<CreditRoutes>;
  // Transactions: undefined;
  // Family: undefined;
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
  // const insets = useSafeArea();

  // const featureStackOptions: StackNavigationOptions = {
  //   // headerShown: false,
  //   // cardOverlayEnabled: true,
  //   // cardStyle: {
  //   //   marginTop: insets.top + 10,
  //   //   flex: 1,
  //   //   borderTopLeftRadius: 20,
  //   //   borderTopRightRadius: 20,
  //   // },
  //   cardOverlay: () => <View style={styles.overlay} />,
  // };

  const drawerContent = useCallback(() => <DrawerMenu />, []);

  return (
    <Drawer.Navigator drawerContent={drawerContent} drawerPosition="right">
      <Drawer.Screen name="Drawer">
        {() => (
          // <Stack.Navigator mode="modal" initialRouteName="Home">
          // <Stack.Screen
          //   name="Tab"
          //   component={tabBar}
          // {tabBar}
          <Tab.Navigator>
            <Tab.Screen
              name="HomeScreen"
              component={HomeStack}
              // options={homeHeaderOptions}
            />
            <Tab.Screen
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
