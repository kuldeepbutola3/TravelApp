import React from 'react';
import {TranslationKeys, useAuraTranslation} from 'src/utils/i18n';
import {
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack';
import {Icon} from 'react-native-elements';
import {StyleSheet, TextStyle} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// import {homeHeaderOptionsWithDrawer} from './MainNav';
import {DrawerNavigationProp} from '@react-navigation/drawer';

export const useScreenOptions = () => {
  return () => {
    const options: StackNavigationOptions = {
      ...TransitionPresets.SlideFromRightIOS,
      // headerStyle: {
      //   height: 50,
      // },
      // headerStatusBarHeight: 0,

      headerBackTitle: '',
    };
    return options;
  };
};

export const useTitleOption = () => {
  const {t} = useAuraTranslation();
  return (title: TranslationKeys) => {
    const options: StackNavigationOptions = {
      title: t(title),
    };
    return options;
  };
};

export const useHomeScreenOptions = () => {
  const titleOption = useTitleOption();
  // const theme = useTheme();
  // const navigation = useNavigation();
  const navigation = useNavigation<DrawerNavigationProp<{}>>();
  return (title?: TranslationKeys) => {
    const options: StackNavigationOptions = {
      ...(title && titleOption(title)),
      headerLeft: () => <></>,
      headerRight: () => (
        <Icon
          name="gear"
          type="font-awesome"
          size={30}
          iconStyle={StyleSheet.flatten([styles.iconStyle])}
          onPress={navigation.openDrawer}
        />
      ),
    };

    return options;
  };
};

const styles = StyleSheet.create({
  iconStyle: {
    padding: 8,
  },
  closeButton: {
    marginRight: 20,
  } as TextStyle,
});

export const useStackOptions = () => {
  const screenOptions = useScreenOptions();
  const titleOption = useTitleOption();
  const homeScreenOptions = useHomeScreenOptions();
  return {
    screenOptions,
    titleOption,
    homeScreenOptions,
  };
};
